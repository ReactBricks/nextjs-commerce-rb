const ErrorNoKeys = () => {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20 text-gray-600">
      <h1 className="mb-8 text-2xl font-semibold text-red-600">Warning: missing App credentials</h1>
      <p className="mb-6">
        <code className="rounded bg-gray-100 px-1 py-1 text-sm text-black">NEXT_PUBLIC_APP_ID</code>{' '}
        and <code className="rounded bg-gray-100 px-1 py-1 text-sm text-black">API_KEY</code> are
        not configured in your{' '}
        <code className="rounded bg-gray-100 px-1 py-1 text-sm text-black">.env.local</code> file.
      </p>
      <p className="mb-2">
        Please create a{' '}
        <code className="rounded bg-gray-100 px-1 py-1 text-sm text-black">.env.local</code> file
        with:
      </p>
      <pre className="rounded bg-gray-900 px-4 py-3 text-white">
        {`NEXT_PUBLIC_APP_ID=...
API_KEY=...`}
      </pre>
    </div>
  );
};

export default ErrorNoKeys;
