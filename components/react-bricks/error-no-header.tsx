const ErrorNoHeader = () => {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20 text-gray-600">
      <h2 className="mb-8 text-2xl font-semibold text-red-600">Warning: there is no header.</h2>
      <p className="mb-6">React Bricks cannot find an entity for the header.</p>
    </div>
  );
};

export default ErrorNoHeader;
