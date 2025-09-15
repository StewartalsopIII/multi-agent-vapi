import { getAgent } from '@/lib/kv';
import VapiAgent from '@/components/VapiAgent';
import { notFound } from 'next/navigation';

interface AgentPageProps {
  params: {
    name: string;
  };
}

export default async function AgentPage({ params }: AgentPageProps) {
  const { name } = await params;
  const publicKey = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY || '';

  if (!publicKey) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Configuration Error</h1>
            <p className="text-gray-600">
              VAPI public key is not configured. Please check your environment variables.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Get agent from KV store
  const agent = await getAgent(name);

  if (!agent) {
    notFound();
  }

  return (
    <VapiAgent
      assistantId={agent.assistantId}
      agentName={agent.name}
      publicKey={publicKey}
    />
  );
}

// Generate metadata for SEO
export async function generateMetadata({ params }: AgentPageProps) {
  const { name } = await params;
  const agent = await getAgent(name);

  if (!agent) {
    return {
      title: 'Agent Not Found',
    };
  }

  return {
    title: `${agent.name.charAt(0).toUpperCase() + agent.name.slice(1)} Agent - Multi-Agent VAPI`,
    description: `Talk to ${agent.name}, your personalized AI voice assistant powered by VAPI.`,
  };
}