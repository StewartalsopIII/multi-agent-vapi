'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Agent {
  name: string;
  assistantId: string;
  createdAt: string;
}

export default function AdminPanel() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newAgent, setNewAgent] = useState({ name: '', assistantId: '' });
  const [editingAgent, setEditingAgent] = useState<Agent | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    try {
      const response = await fetch('/api/agents');
      if (response.ok) {
        const data = await response.json();
        setAgents(data);
      } else {
        setError('Failed to fetch agents');
      }
    } catch {
      setError('Error loading agents');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const agent = editingAgent || newAgent;
      const response = await fetch('/api/agents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(agent),
      });

      if (response.ok) {
        await fetchAgents();
        setNewAgent({ name: '', assistantId: '' });
        setEditingAgent(null);
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to save agent');
      }
    } catch {
      setError('Error saving agent');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (name: string) => {
    if (!confirm(`Are you sure you want to delete agent "${name}"?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/agents?name=${encodeURIComponent(name)}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchAgents();
      } else {
        setError('Failed to delete agent');
      }
    } catch {
      setError('Error deleting agent');
    }
  };

  const handleEdit = (agent: Agent) => {
    setEditingAgent(agent);
    setNewAgent({ name: agent.name, assistantId: agent.assistantId });
  };

  const cancelEdit = () => {
    setEditingAgent(null);
    setNewAgent({ name: '', assistantId: '' });
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/');
    } catch {
      console.error('Logout error');
    }
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    // You could add a toast notification here
  };

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-800">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Multi-Agent VAPI Admin</h1>
              <p className="text-gray-800">Manage your voice AI agents</p>
            </div>
            <div className="flex space-x-4">
              <Link
                href="/"
                className="text-gray-800 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Home
              </Link>
              <button
                onClick={handleLogout}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Add/Edit Agent Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">
                {editingAgent ? 'Edit Agent' : 'Add New Agent'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Agent Name
                  </label>
                  <input
                    type="text"
                    value={newAgent.name}
                    onChange={(e) => setNewAgent({ ...newAgent, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., john, mary-smith"
                    pattern="^[a-z0-9\-]+$"
                    title="Only lowercase letters, numbers, and hyphens allowed"
                    required
                    disabled={!!editingAgent}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Only lowercase letters, numbers, and hyphens
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Assistant ID
                  </label>
                  <input
                    type="text"
                    value={newAgent.assistantId}
                    onChange={(e) => setNewAgent({ ...newAgent, assistantId: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., b8591aed-b31e-479c-9c17-7230ba98d38b"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Get this from your VAPI dashboard
                  </p>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 px-3 py-2 rounded-md text-sm">
                    {error}
                  </div>
                )}

                <div className="flex space-x-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`flex-1 py-2 px-4 rounded-md font-medium ${
                      isSubmitting
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-blue-500 hover:bg-blue-600'
                    } text-white`}
                  >
                    {isSubmitting ? 'Saving...' : editingAgent ? 'Update Agent' : 'Add Agent'}
                  </button>

                  {editingAgent && (
                    <button
                      type="button"
                      onClick={cancelEdit}
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Agents List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold">
                  Agents ({agents.length})
                </h2>
              </div>

              {agents.length === 0 ? (
                <div className="px-6 py-8 text-center text-gray-800">
                  <div className="text-4xl mb-4">🤖</div>
                  <p>No agents created yet.</p>
                  <p className="text-sm">Add your first agent using the form on the left.</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {agents.map((agent) => {
                    const agentUrl = `${baseUrl}/agent/${agent.name}`;
                    return (
                      <div key={agent.name} className="px-6 py-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-3">
                              <h3 className="text-lg font-medium text-gray-900 capitalize">
                                {agent.name}
                              </h3>
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Active
                              </span>
                            </div>

                            <div className="mt-2 space-y-1">
                              <p className="text-sm text-gray-800">
                                <span className="font-medium">Assistant ID:</span>{' '}
                                <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">
                                  {agent.assistantId}
                                </code>
                              </p>

                              <div className="flex items-center space-x-2">
                                <span className="text-sm font-medium text-gray-800">URL:</span>
                                <code className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-sm">
                                  {agentUrl}
                                </code>
                                <button
                                  onClick={() => copyToClipboard(agentUrl)}
                                  className="text-blue-600 hover:text-blue-800 text-sm"
                                  title="Copy URL"
                                >
                                  📋
                                </button>
                              </div>

                              <p className="text-xs text-gray-500">
                                Created: {new Date(agent.createdAt).toLocaleString()}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2 ml-4">
                            <a
                              href={agentUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                            >
                              Test
                            </a>
                            <button
                              onClick={() => handleEdit(agent)}
                              className="text-gray-800 hover:text-gray-900 text-sm font-medium"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(agent.name)}
                              className="text-red-600 hover:text-red-800 text-sm font-medium"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}