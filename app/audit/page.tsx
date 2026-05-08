import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Are you overpaying for AI tools?
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Get a free audit of your AI tool spend in 2 minutes.
          See exactly where you're wasting money and how much you can save.
        </p>
        <Link
          href="/audit"
          className="bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 inline-block"
        >
          Start Free Audit →
        </Link>
        <p className="text-sm text-gray-400 mt-4">No login required. Free forever.</p>
      </div>
    </div>
  );
}