// Simple in-memory storage for development when KV is not configured
const devStore: Map<string, unknown> = new Map();

export const devKV = {
  async get(key: string) {
    return devStore.get(key) || null;
  },

  async set(key: string, value: unknown) {
    devStore.set(key, value);
  },

  async del(key: string) {
    devStore.delete(key);
  },

  async keys(pattern: string) {
    const regex = new RegExp(pattern.replace('*', '.*'));
    return Array.from(devStore.keys()).filter(key => regex.test(key));
  },

  async mget(...keys: string[]) {
    return keys.map(key => devStore.get(key) || null);
  }
};