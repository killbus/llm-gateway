export interface User {
  id: string;
  username: string;
}

export interface Provider {
  id: string;
  name: string;
  baseUrl: string;
  apiKey?: string;
  modelMapping?: Record<string, string> | null;
  enabled: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface Model {
  id: string;
  name: string;
  providerId: string;
  providerName?: string;
  modelIdentifier: string;
  isVirtual?: boolean;
  routingConfigId?: string | null;
  enabled: boolean;
  virtualKeyCount?: number;
  createdAt: number;
  updatedAt: number;
}

export interface VirtualKey {
  id: string;
  keyValue: string;
  name: string;
  providerId?: string | null;
  modelId?: string | null;
  routingStrategy?: string;
  modelIds?: string[] | null;
  routingConfig?: RoutingConfig | null;
  enabled: boolean;
  rateLimit?: number | null;
  cacheEnabled: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface RoutingConfig {
  algorithm?: 'round-robin' | 'random' | 'weighted';
  weights?: Record<string, number>;
  failoverPriority?: string[];
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface CreateProviderRequest {
  id: string;
  name: string;
  baseUrl: string;
  apiKey: string;
  modelMapping?: Record<string, string>;
  enabled?: boolean;
}

export interface UpdateProviderRequest {
  name?: string;
  baseUrl?: string;
  apiKey?: string;
  modelMapping?: Record<string, string>;
  enabled?: boolean;
}

export interface CreateModelRequest {
  name: string;
  providerId: string;
  modelIdentifier: string;
  isVirtual?: boolean;
  routingConfigId?: string;
  enabled?: boolean;
}

export interface UpdateModelRequest {
  name?: string;
  modelIdentifier?: string;
  enabled?: boolean;
}

export interface CreateVirtualKeyRequest {
  name: string;
  providerId?: string;
  modelId?: string;
  routingStrategy?: 'single' | 'load-balance' | 'failover';
  modelIds?: string[];
  routingConfig?: RoutingConfig;
  keyType: 'auto' | 'custom';
  customKey?: string;
  rateLimit?: number;
  enabled?: boolean;
  cacheEnabled?: boolean;
}

export interface UpdateVirtualKeyRequest {
  name?: string;
  providerId?: string;
  modelId?: string;
  routingStrategy?: string;
  modelIds?: string[];
  routingConfig?: RoutingConfig;
  enabled?: boolean;
  rateLimit?: number;
  cacheEnabled?: boolean;
}

