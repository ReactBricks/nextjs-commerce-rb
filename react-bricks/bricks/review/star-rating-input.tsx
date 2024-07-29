'use client';

import React, { useState } from 'react';

const TOTAL_STARS = 5;

interface StarRatingInputProps {
  value: number;
  onChange: (value: number) => void;
}

const StarRatingInput: React.FC<StarRatingInputProps> = ({ value, onChange }) => {
  const [hover, setHover] = useState<number>(0);
  return (
    <div>
      {[...Array(TOTAL_STARS)].map((_, index) => {
        const currentRating = index + 1;

        return (
          <label key={index}>
            <input
              type="radio"
              className="hidden"
              name="rating"
              value={currentRating}
              onChange={() => onChange(currentRating)}
            />
            <span
              className="m-2 cursor-pointer text-xl"
              style={{
                color: currentRating <= (hover || value) ? '#ffc107' : '#e4e5e9'
              }}
              onMouseEnter={() => setHover(currentRating)}
              onMouseLeave={() => setHover(0)}
            >
              &#9733;
            </span>
          </label>
        );
      })}
    </div>
  );
};

export default StarRatingInput;
