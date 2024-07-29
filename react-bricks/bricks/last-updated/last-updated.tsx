import { getPageValues, types } from 'react-bricks/rsc';
import dayjs from 'dayjs';

const LastUpdated: types.Brick = () => {
  const pageValues = getPageValues();

  const publishDate = dayjs(pageValues?.publishedAt).format('MMMM D, YYYY');

  return (
    <div className="prose mx-8 max-w-2xl py-10 text-sm italic dark:prose-invert sm:mx-auto">{`This document was last updated on ${publishDate}.`}</div>
  );
};

LastUpdated.schema = {
  name: 'last-updated',
  label: 'Last Updated'
};

export default LastUpdated;
