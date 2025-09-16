import { createClient } from '@vercel/kv';
import { fileKV } from './file-kv';

// Get Redis configuration from environment variables
const getRedisConfig = () => {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

  // Only return valid URLs (not placeholder values)
  if (url && token && url.startsWith('https') && !url.includes('your_kv_url_here')) {
    return { url, token };
  }
  return null;
};

// Create KV client only if we have valid configuration
const redisConfig = getRedisConfig();
const kv = redisConfig ? createClient(redisConfig) : null;

// Use Redis if configured, otherwise fall back to file storage
const storage = kv || fileKV;

export interface Agent {
  name: string;
  assistantId: string;
  createdAt: string;
}

// Get agent by name
export async function getAgent(name: string): Promise<Agent | null> {
  try {
    const result = await storage.get(`agent:${name.toLowerCase()}`);
    return result as Agent | null;
  } catch (error) {
    console.error('Error getting agent:', error);
    return null;
  }
}

// Get all agents
export async function getAllAgents(): Promise<Agent[]> {
  try {
    const keys = await storage.keys('agent:*');
    if (keys.length === 0) return [];

    const agents = await storage.mget(...keys);
    return agents.filter(Boolean) as Agent[];
  } catch (error) {
    console.error('Error getting all agents:', error);
    return [];
  }
}

// Create or update agent
export async function setAgent(name: string, assistantId: string): Promise<Agent> {
  const agent: Agent = {
    name: name.toLowerCase(),
    assistantId,
    createdAt: new Date().toISOString(),
  };

  try {
    await storage.set(`agent:${name.toLowerCase()}`, agent);
    return agent;
  } catch (error) {
    console.error('Error setting agent:', error);
    throw error;
  }
}

// Delete agent
export async function deleteAgent(name: string): Promise<boolean> {
  try {
    await storage.del(`agent:${name.toLowerCase()}`);
    return true;
  } catch (error) {
    console.error('Error deleting agent:', error);
    return false;
  }
}