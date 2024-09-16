export default async function CheckoutPage() {
  return (
    <div>
      <div className="mx-8 max-w-2xl py-10 sm:mx-auto">
        <h1 className="m-0 text-5xl font-bold dark:text-white">Checkout</h1>
      </div>

      <div className="mx-8 max-w-2xl py-10 sm:mx-auto">
        <p className="prose mx-auto mb-0 mt-8 max-w-6xl dark:prose-invert first:mt-0">
          Checkout is not implemented yet in this template.{' '}
        </p>
        <p className="prose mx-auto mb-0 mt-8 max-w-6xl dark:prose-invert first:mt-0">
          Check out{' '}
          <a href="https://docs.medusajs.com/modules/carts-and-checkout/storefront/implement-checkout-flow">
            our guide on implementing a checkout flow
          </a>{' '}
          to learn more.
        </p>
      </div>
    </div>
  );
}
