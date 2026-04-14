import { dlopen, ptr, FFIType } from "bun:ffi";

/**
 * Industrial-grade process management for LLM Gateway Services.
 * - Windows: Uses Kernel Job Objects (JobObjectExtendedLimitInformation) for atomic cleanup.
 * - Unix: Uses standard AbortSignal lifecycle contracts.
 */

const controller = new AbortController();
const { signal } = controller;

// 1. Windows Native Binding (Only loaded on win32)
let kernel32 = null;
let jobHandle = null;

if (process.platform === "win32") {
  kernel32 = dlopen("kernel32.dll", {
    CreateJobObjectW: { args: [FFIType.ptr, FFIType.ptr], returns: FFIType.ptr },
    SetInformationJobObject: { args: [FFIType.ptr, FFIType.i32, FFIType.ptr, FFIType.i32], returns: FFIType.i32 },
    AssignProcessToJobObject: { args: [FFIType.ptr, FFIType.ptr], returns: FFIType.i32 },
    OpenProcess: { args: [FFIType.i32, FFIType.i32, FFIType.i32], returns: FFIType.ptr },
    CloseHandle: { args: [FFIType.ptr], returns: FFIType.i32 },
  });

  const JOB_OBJECT_LIMIT_KILL_ON_JOB_CLOSE = 0x2000;
  const JobObjectExtendedLimitInformation = 9;

  jobHandle = kernel32.symbols.CreateJobObjectW(null, null);
  if (jobHandle) {
    const info = new Uint8Array(144); // JOBOBJECT_EXTENDED_LIMIT_INFORMATION
    const dv = new DataView(info.buffer);
    dv.setUint32(16, JOB_OBJECT_LIMIT_KILL_ON_JOB_CLOSE, true); // BasicLimitInformation.LimitFlags
    kernel32.symbols.SetInformationJobObject(jobHandle, JobObjectExtendedLimitInformation, ptr(info), info.length);
  }
} else {
  // 2. Unix Native Signal Handling (Not intercepted on Windows to let Kernel/Console handle it)
  process.on("SIGINT", () => controller.abort());
  process.on("SIGTERM", () => controller.abort());
}

const specs = [
  {
    name: "backend",
    cmd: ["bun", "run", "--elide-lines=0", "--filter", "@llm-gateway/backend", "dev"],
  },
  {
    name: "web",
    cmd: ["bun", "run", "--elide-lines=0", "--filter", "@llm-gateway/web", "dev"],
  },
];

const children = specs.map((s) => {
  const child = Bun.spawn({
    cmd: s.cmd,
    stdout: "inherit",
    stderr: "inherit",
    stdin: "inherit",
    env: process.env,
    signal, // Standard lifecycle contract
  });

  // Assign to Job Object for kernel-level protection on Windows
  if (jobHandle && child.pid) {
    const PROCESS_SET_QUOTA = 0x0100;
    const PROCESS_TERMINATE = 0x0001;
    const procHandle = kernel32.symbols.OpenProcess(PROCESS_SET_QUOTA | PROCESS_TERMINATE, 0, child.pid);
    if (procHandle) {
      kernel32.symbols.AssignProcessToJobObject(jobHandle, procHandle);
      kernel32.symbols.CloseHandle(procHandle);
    }
  }

  return { ...s, child };
});

console.log("[dev:all] Starting services...");

// Wait for all processes to finish normally or be aborted
await Promise.allSettled(children.map((c) => c.child.exited));

if (jobHandle) {
  kernel32.symbols.CloseHandle(jobHandle);
}
