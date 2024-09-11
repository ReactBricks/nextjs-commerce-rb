'use client';

// // MEDUSA
// import { PlusIcon } from '@heroicons/react/24/outline';
// import clsx from 'clsx';
// import { addItem } from 'components/cart/actions';
// import LoadingDots from 'components/loading-dots';
// import type { Product, ProductVariant } from 'lib/medusa/types';
// import { useRouter, useSearchParams } from 'next/navigation';
// import { useTransition } from 'react';

// export function AddToCart({ product }: { product: Product }) {
//   const { variants, availableForSale } = product;
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const [isPending, startTransition] = useTransition();
//   const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;
//   const variant = variants.find((variant: ProductVariant) =>
//     variant.selectedOptions.every(
//       (option) => option.value === searchParams.get(option.name.toLowerCase())
//     )
//   );
//   const selectedVariantId = variant?.id || defaultVariantId;
//   const title = !availableForSale
//     ? 'Out of stock'
//     : !selectedVariantId
//       ? 'Please select options'
//       : undefined;

//   return (
//     <button
//       aria-label="Add item to cart"
//       disabled={isPending || !availableForSale || !selectedVariantId}
//       title={title}
//       onClick={() => {
//         // Safeguard in case someone messes with `disabled` in devtools.
//         if (!availableForSale || !selectedVariantId) return;

//         startTransition(async () => {
//           const error = await addItem(selectedVariantId);

//           if (error) {
//             // Trigger the error boundary in the root error.js
//             throw new Error(error.toString());
//           }

//           router.refresh();
//         });
//       }}
//       className={clsx(
//         'relative flex w-full items-center justify-center rounded-full bg-blue-600 p-4 tracking-wide text-white hover:opacity-90',
//         {
//           'cursor-not-allowed opacity-60 hover:opacity-60': !availableForSale || !selectedVariantId,
//           'cursor-not-allowed': isPending
//         }
//       )}
//     >
//       <div className="absolute left-0 ml-4">
//         {!isPending ? <PlusIcon className="h-5" /> : <LoadingDots className="mb-3 bg-white" />}
//       </div>
//       <span>{availableForSale ? 'Add To Cart' : 'Out Of Stock'}</span>
//     </button>
//   );
// }


// OLD, OK WITH SHOPIFY
import { PlusIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { addItem } from 'components/cart/actions';
import { useProduct } from 'components/product/product-context';
import type { Product, ProductVariant } from 'lib/medusa/types';
import { useFormState } from 'react-dom';
import { useCart } from './cart-context';

function SubmitButton({
  availableForSale,
  selectedVariantId
}: {
  availableForSale: boolean;
  selectedVariantId: string | undefined;
}) {
  const buttonClasses =
    'relative flex w-full items-center justify-center rounded-full bg-blue-600 p-4 tracking-wide text-white';
  const disabledClasses = 'cursor-not-allowed opacity-60 hover:opacity-60';

  if (!availableForSale) {
    return (
      <button aria-disabled className={clsx(buttonClasses, disabledClasses)}>
        Out Of Stock
      </button>
    );
  }

  if (!selectedVariantId) {
    return (
      <button
        aria-label="Please select an option"
        aria-disabled
        className={clsx(buttonClasses, disabledClasses)}
      >
        <div className="absolute left-0 ml-4">
          <PlusIcon className="h-5" />
        </div>
        Add To Cart
      </button>
    );
  }

  return (
    <button
      aria-label="Add to cart"
      className={clsx(buttonClasses, {
        'hover:opacity-90': true
      })}
    >
      <div className="absolute left-0 ml-4">
        <PlusIcon className="h-5" />
      </div>
      Add To Cart
    </button>
  );
}

export function AddToCart({ product }: { product: Product }) {
  const { variants, availableForSale } = product;
  const { addCartItem } = useCart();
  const { state } = useProduct();
  const [message, formAction] = useFormState(addItem, null);

  const variant = variants.find((variant: ProductVariant) =>
    variant.selectedOptions.every((option) => option.value === state[option.name.toLowerCase()])
  );
  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;
  const selectedVariantId = variant?.id || defaultVariantId;
  const actionWithVariant = formAction.bind(null, selectedVariantId);
  const finalVariant = variants.find((variant) => variant.id === selectedVariantId)!;

  return (
    <form
      action={async () => {
        addCartItem(finalVariant, product);
        await actionWithVariant();
      }}
    >
      <SubmitButton availableForSale={availableForSale} selectedVariantId={selectedVariantId} />
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}
