import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center">
        <div className="text-6xl mb-4">🤖</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Agent Not Found</h1>
        <p className="text-gray-600 mb-6">
          The agent you&apos;re looking for doesn&apos;t exist or may have been removed.
        </p>
        <div className="space-y-3">
          <Link
            href="/"
            className="block bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Go Home
          </Link>
          <p className="text-sm text-gray-500">
            If you believe this is an error, please contact the administrator.
          </p>
        </div>
      </div>
    </div>
  );
}