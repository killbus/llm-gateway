// Portkey 官方支持的提供商列表
// 基于 https://portkey.ai/docs/api-reference/inference-api/supported-providers

export interface ProviderPreset {
  id: string;
  name: string;
  baseUrl: string;
  description: string;
  category: string;
  features: {
    chat: boolean;
    vision: boolean;
    tools: boolean;
    embeddings: boolean;
    images: boolean;
    audio: boolean;
    finetuning: boolean;
    batch: boolean;
    files: boolean;
    moderations: boolean;
    assistants: boolean;
    completions: boolean;
  };
  modelExamples?: string[];
}

export const PROVIDER_PRESETS: ProviderPreset[] = [
  {
    id: 'openai',
    name: 'OpenAI',
    baseUrl: 'https://api.openai.com',
    description: 'GPT 系列模型',
    category: '主流提供商',
    features: {
      chat: true,
      vision: true,
      tools: true,
      embeddings: true,
      images: true,
      audio: true,
      finetuning: true,
      batch: true,
      files: true,
      moderations: true,
      assistants: true,
      completions: true,
    },
  },
  {
    id: 'anthropic',
    name: 'Anthropic',
    baseUrl: 'https://api.anthropic.com',
    description: 'Claude 系列模型',
    category: '主流提供商',
    features: {
      chat: true,
      vision: true,
      tools: true,
      embeddings: false,
      images: false,
      audio: false,
      finetuning: false,
      batch: false,
      files: false,
      moderations: false,
      assistants: false,
      completions: true,
    },
  },
  {
    id: 'deepseek',
    name: 'DeepSeek',
    baseUrl: 'https://api.deepseek.com',
    description: '高性价比中文模型',
    category: '中文模型',
    features: {
      chat: true,
      vision: false,
      tools: false,
      embeddings: false,
      images: false,
      audio: false,
      finetuning: false,
      batch: false,
      files: false,
      moderations: false,
      assistants: false,
      completions: false,
    },
  },
  {
    id: 'azure-openai',
    name: 'Azure OpenAI',
    baseUrl: 'https://your-resource.openai.azure.com',
    description: 'Azure 平台 OpenAI',
    category: '企业服务',
    features: {
      chat: true,
      vision: true,
      tools: true,
      embeddings: false,
      images: false,
      audio: false,
      finetuning: false,
      batch: false,
      files: false,
      moderations: false,
      assistants: false,
      completions: true,
    },
  },
  {
    id: 'google-gemini',
    name: 'Google Gemini',
    baseUrl: 'https://generativelanguage.googleapis.com',
    description: 'Gemini 模型系列',
    category: '主流提供商',
    features: {
      chat: true,
      vision: true,
      tools: true,
      embeddings: false,
      images: false,
      audio: false,
      finetuning: false,
      batch: false,
      files: false,
      moderations: false,
      assistants: false,
      completions: true,
    },
  },
  {
    id: 'cohere',
    name: 'Cohere',
    baseUrl: 'https://api.cohere.ai',
    description: '企业级 AI 模型',
    category: '企业服务',
    features: {
      chat: true,
      vision: false,
      tools: true,
      embeddings: false,
      images: false,
      audio: false,
      finetuning: false,
      batch: false,
      files: false,
      moderations: false,
      assistants: false,
      completions: false,
    },
  },
  {
    id: 'mistral',
    name: 'Mistral AI',
    baseUrl: 'https://api.mistral.ai',
    description: '开源 AI 模型',
    category: '开源模型',
    features: {
      chat: true,
      vision: false,
      tools: true,
      embeddings: false,
      images: false,
      audio: false,
      finetuning: false,
      batch: false,
      files: false,
      moderations: false,
      assistants: false,
      completions: false,
    },
  },
  {
    id: 'groq',
    name: 'Groq',
    baseUrl: 'https://api.groq.com',
    description: '超快推理速度',
    category: '高性能',
    features: {
      chat: true,
      vision: false,
      tools: false,
      embeddings: false,
      images: false,
      audio: true,
      finetuning: false,
      batch: false,
      files: false,
      moderations: false,
      assistants: false,
      completions: true,
    },
  },
  {
    id: 'together',
    name: 'Together AI',
    baseUrl: 'https://api.together.xyz',
    description: '开源模型托管',
    category: '开源模型',
    features: {
      chat: true,
      vision: false,
      tools: true,
      embeddings: false,
      images: false,
      audio: false,
      finetuning: false,
      batch: false,
      files: false,
      moderations: false,
      assistants: false,
      completions: true,
    },
  },
  {
    id: 'perplexity',
    name: 'Perplexity AI',
    baseUrl: 'https://api.perplexity.ai',
    description: '搜索和推理模型',
    category: '专业服务',
    features: {
      chat: true,
      vision: false,
      tools: false,
      embeddings: false,
      images: false,
      audio: false,
      finetuning: false,
      batch: false,
      files: false,
      moderations: false,
      assistants: false,
      completions: true,
    },
  },
  {
    id: 'zhipu',
    name: 'Zhipu AI',
    baseUrl: 'https://open.bigmodel.cn',
    description: 'GLM 系列模型',
    category: '中文模型',
    features: {
      chat: true,
      vision: false,
      tools: true,
      embeddings: false,
      images: false,
      audio: false,
      finetuning: false,
      batch: false,
      files: false,
      moderations: false,
      assistants: false,
      completions: false,
    },
  },
  {
    id: 'moonshot',
    name: 'Moonshot AI',
    baseUrl: 'https://api.moonshot.cn',
    description: 'Kimi 长文本模型',
    category: '中文模型',
    features: {
      chat: true,
      vision: false,
      tools: false,
      embeddings: false,
      images: false,
      audio: false,
      finetuning: false,
      batch: false,
      files: false,
      moderations: false,
      assistants: false,
      completions: false,
    },
  },
  {
    id: 'lingyi',
    name: 'Lingyi (01.ai)',
    baseUrl: 'https://api.lingyiwanwu.com',
    description: 'Yi 系列模型',
    category: '中文模型',
    features: {
      chat: true,
      vision: false,
      tools: false,
      embeddings: false,
      images: false,
      audio: false,
      finetuning: false,
      batch: false,
      files: false,
      moderations: false,
      assistants: false,
      completions: false,
    },
  },
];

export const PROVIDER_CATEGORIES = [
  '主流提供商',
  '中文模型',
  '企业服务',
  '开源模型',
  '高性能',
  '专业服务',
];

export function getProvidersByCategory(category: string): ProviderPreset[] {
  return PROVIDER_PRESETS.filter(provider => provider.category === category);
}

export function getProviderById(id: string): ProviderPreset | undefined {
  return PROVIDER_PRESETS.find(provider => provider.id === id);
}
