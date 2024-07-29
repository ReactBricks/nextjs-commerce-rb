/* eslint-disable react/no-unescaped-entities */
const ErrorNoHomePage = () => {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20 text-gray-600">
      <h1 className="mb-8 text-2xl font-semibold text-red-600">
        Warning: there is no page with a "/" slug.
      </h1>
      <p className="mb-6">
        Please, create a page in the editor with a slug "/" that will be your home page.
      </p>
    </div>
  );
};

export default ErrorNoHomePage;
