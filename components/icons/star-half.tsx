import clsx from 'clsx';

export default function StarHalf(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      {...props}
      className={clsx('h-4 w-4 stroke-black stroke-2 dark:stroke-white', props.className)}
    >
      <path
        d="M5.122 20.692l10.236 7.389-3.909 11.955c-.449 1.377 1.137 2.523 2.315 1.672L24 34.318l10.238 7.39c1.175.85 2.764-.295 2.313-1.672l-3.91-11.955 10.237-7.389c1.177-.85.572-2.704-.884-2.704H29.34L25.43 6.033c-.45-1.377-2.41-1.377-2.86 0l-3.91 11.955H6.005c-1.456 0-2.061 1.853-.884 2.704z"
        className="fill-white dark:fill-black"
      />
      <path
        d="M15.358 28.08L5.122 20.693c-1.177-.85-.572-2.704.884-2.704H18.66l3.91-11.956C22.795 5.344 23.397 5 24 5v29.318l-10.236 7.39c-1.178.85-2.764-.295-2.315-1.672l3.91-11.955z"
        className="fill-black dark:fill-white"
      />
    </svg>
  );
}
