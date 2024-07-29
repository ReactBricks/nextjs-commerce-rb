const ErrorNoPage = () => {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20 text-gray-600">
      <h1 className="mb-8 text-2xl font-semibold text-red-600">Page not found</h1>
      <p className="mb-6">React Bricks cannot find a page for the specified slug.</p>
    </div>
  );
};

export default ErrorNoPage;
