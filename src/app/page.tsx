import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Multi-Agent VAPI Platform
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Create and manage multiple personalized AI voice assistants. Each agent gets its own unique URL
            and can be customized with different VAPI assistant configurations.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 mb-12">
          {/* Features */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <div className="text-3xl mb-4">🎙️</div>
            <h2 className="text-2xl font-semibold mb-4">Voice AI Agents</h2>
            <ul className="space-y-3 text-gray-600 dark:text-gray-300">
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Multiple agents with unique URLs
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Custom VAPI assistant configurations
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Easy management through admin panel
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Secure password-protected admin access
              </li>
            </ul>
          </div>

          {/* How it works */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <div className="text-3xl mb-4">⚙️</div>
            <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
            <ol className="space-y-3 text-gray-600 dark:text-gray-300">
              <li className="flex">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">1</span>
                Create agents in the admin panel
              </li>
              <li className="flex">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">2</span>
                Each agent gets a unique URL
              </li>
              <li className="flex">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">3</span>
                Share URLs with specific users
              </li>
              <li className="flex">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">4</span>
                Users talk to their personalized agent
              </li>
            </ol>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="text-center space-y-6">
          <div className="space-x-4">
            <Link
              href="/admin"
              className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 hover:scale-105 shadow-lg"
            >
              Admin Panel
            </Link>
          </div>

          <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <h3 className="text-lg font-semibold mb-3">Example Agent URLs:</h3>
            <div className="space-y-2 text-sm font-mono">
              <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded">
                <span className="text-gray-600">yoursite.com/agent/</span>
                <span className="text-blue-600">john</span>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded">
                <span className="text-gray-600">yoursite.com/agent/</span>
                <span className="text-blue-600">mary-smith</span>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded">
                <span className="text-gray-600">yoursite.com/agent/</span>
                <span className="text-blue-600">support-bot</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Powered by VAPI.ai</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span>Built with Next.js</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span>Deployed on Vercel</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
