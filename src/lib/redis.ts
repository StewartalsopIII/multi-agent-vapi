import { kv } from '@vercel/kv';

export const redis = kv;

// Helper functions for common operations
export async function setCache(key: string, value: unknown, ttl?: number) {
  if (ttl) {
    return await redis.setex(key, ttl, JSON.stringify(value));
  }
  return await redis.set(key, JSON.stringify(value));
}

export async function getCache(key: string) {
  const value = await redis.get(key);
  return value ? JSON.parse(value as string) : null;
}

export async function deleteCache(key: string) {
  return await redis.del(key);
}

// Example usage for your VAPI project
export async function saveCallData(callId: string, data: unknown) {
  return await setCache(`call:${callId}`, data, 3600); // 1 hour TTL
}

export async function getCallData(callId: string) {
  return await getCache(`call:${callId}`);
}