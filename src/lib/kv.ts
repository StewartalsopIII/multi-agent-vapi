import { kv } from '@vercel/kv';
import { fileKV } from './file-kv';

// Use file-based storage if KV is not configured properly
const isKVConfigured = process.env.KV_REST_API_URL &&
  process.env.KV_REST_API_URL !== 'your_kv_url_here' &&
  process.env.KV_REST_API_TOKEN &&
  process.env.KV_REST_API_TOKEN !== 'your_kv_token_here';

const storage = isKVConfigured ? kv : fileKV;

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