import { types, Text } from 'react-bricks/rsc';
import StarRatingInput from './star-rating-input';
import dayjs from 'dayjs';
import StarRating from '@/components/product/star-rating';
interface ReviewProps {
  title: types.TextValue;
  rating: number;
  userName: string;
  publishDate: Date;
  reviewText: types.TextValue;
}

const Review: types.Brick<ReviewProps> = ({ title, rating, userName, publishDate, reviewText }) => {
  return (
    <div className="py-4 px-2">
      <Text
        propName="title"
        value={title}
        renderBlock={({ children }) => (
          <h1 className="mb-2 font-semibold text-black dark:text-white">{children}</h1>
        )}
      />
      <div className="mb-4 flex items-center justify-between">
        <div className="flex min-w-24 items-center">
          <StarRating rating={rating} />
        </div>
        <div className="flex items-center gap-x-2 text-neutral-500 dark:text-neutral-400">
          <Text
            propName="userName"
            value={userName}
            renderBlock={({ children }) => <div className="min-w-5">{children}</div>}
            renderPlaceholder={() => <div className="">username</div>}
          />
          <div>•</div>
          <div>{dayjs(publishDate).format('MMMM D, YYYY')}</div>
        </div>
      </div>
      <Text
        propName="reviewText"
        value={reviewText}
        placeholder="Type a review..."
        renderBlock={({ children }) => (
          <p className="text-neutral-500 dark:text-neutral-400">{children}</p>
        )}
      />
    </div>
  );
};

Review.schema = {
  name: 'review',
  label: 'Review',
  hideFromAddMenu: true,
  getDefaultProps: () => ({
    title: 'Review Title',
    userName: 'Name',
    rating: 0,
    publishDate: new Date(),
    reviewText: 'Good product!'
  }),
  sideEditProps: [
    {
      name: 'rating',
      label: 'Rating',
      type: types.SideEditPropType.Custom,
      component: ({ value, onChange }) => <StarRatingInput value={value} onChange={onChange} />
    },
    {
      name: 'publishDate',
      label: 'Publish date',
      type: types.SideEditPropType.Date
    }
  ]
};

export default Review;
