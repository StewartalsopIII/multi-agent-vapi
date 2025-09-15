import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), '.dev-agents.json');

// Simple file-based storage for development that persists across restarts
let fileStore: Map<string, unknown> = new Map();

// Load data from file on startup
function loadData() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
      fileStore = new Map(Object.entries(data));
    }
  } catch (error) {
    // No existing dev data file, starting fresh
  }
}

// Save data to file
function saveData() {
  try {
    const data = Object.fromEntries(fileStore);
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error saving dev data:', error);
  }
}

// Initialize data on first load
loadData();

export const fileKV = {
  async get(key: string) {
    return fileStore.get(key) || null;
  },

  async set(key: string, value: unknown) {
    fileStore.set(key, value);
    saveData();
  },

  async del(key: string) {
    fileStore.delete(key);
    saveData();
  },

  async keys(pattern: string) {
    const regex = new RegExp(pattern.replace('*', '.*'));
    return Array.from(fileStore.keys()).filter(key => regex.test(key));
  },

  async mget(...keys: string[]) {
    return keys.map(key => fileStore.get(key) || null);
  }
};