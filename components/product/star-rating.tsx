import React from 'react';
import StarFull from '../icons/star-full';
import StarEmpty from '../icons/star-empty';
import StarHalf from '../icons/star-half';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, maxRating = 5 }) => {
  return [...Array(maxRating)].map((_, index) => {
    const currentRating = index + 1;

    if (rating < currentRating - 0.75) {
      return <StarEmpty key={index} />;
    }

    if (rating < currentRating - 0.25) {
      return <StarHalf key={index} />;
    }

    return <StarFull key={index} />;
  });
};

export default StarRating;
