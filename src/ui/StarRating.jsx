import { useState } from "react";
import { IoStarHalfSharp, IoStarOutline, IoStarSharp } from "react-icons/io5";
import styled, { css } from "styled-components";
import Error from "./Error";

const StyledStarRating = styled.div`
  display: flex;
  gap: 3rem;
  align-items: center;
`;

const StarsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
const Text = styled.p`
  font-size: 1.6rem;
  font-weight: 600;
`;

const StyledStar = styled.div`
  cursor: pointer;

  transition: all 2s;
  & svg {
    ${(props) =>
      props.color
        ? css`
            fill: ${props.color};
          `
        : css`
            fill: #40fa40;
          `}
    width: 3rem;
    height: 3rem;
    transition: all 2s;
  }
`;

const createStars = function (size) {
  const stars = Array.from({ length: size }, (_, i) => {
    return { id: i + 1, half: i + 0.5, full: i + 1 };
  });

  return stars;
};

const createLabelsObj = function (labels = [], maxRating = 5) {
  const arr = Array.from({ length: maxRating }, (_, i) => i + 1);

  const obj = arr.reduce((acc, cur, i) => {
    acc[cur - 0.5] = labels[cur - 1 + i];
    acc[cur] = labels[cur + i];
    return acc;
  }, {});

  console.log(obj);

  return obj;
};

export default function StarRating({
  initialRating = 0,
  maxRating = 5,
  color = "",
  labels = [],
  onSetRating = () => {},
}) {
  const [rating, setRating] = useState(initialRating);
  const [tempRating, setTempRating] = useState(0);

  if (labels.length && labels.length !== maxRating * 2) {
    return <Error msg={"Max Rating must be half of labels length."} />;
  }

  function handleRateClick(rate) {
    setRating(rate);
    onSetRating(rate);
  }

  const stars = createStars(maxRating);

  const labelsObj = labels.length
    ? createLabelsObj(labels, maxRating)
    : undefined;

  return (
    <StyledStarRating>
      <StarsContainer>
        {stars.map((star) => (
          <Star
            key={star.id}
            color={color}
            star={star}
            rating={rating}
            onRate={handleRateClick}
            tempRating={tempRating}
            onTempRating={setTempRating}
          />
        ))}
      </StarsContainer>
      <Text>
        {labelsObj
          ? labelsObj[tempRating] || labelsObj[rating] || ""
          : tempRating || rating || ""}
      </Text>
    </StyledStarRating>
  );
}

const isClicked = function (targetElement, clickedPosition) {
  const coords = targetElement.getBoundingClientRect();
  const distance = clickedPosition - coords.left;
  const starHalfWidth = coords.width / 2;
  // console.log(distance, starHalfWidth);
  return distance <= starHalfWidth;
};

function Star({ star, rating, onRate, tempRating, onTempRating, color }) {
  function handleClick(e) {
    const distance = isClicked(e.target, e.clientX);

    distance ? onRate(star.half) : onRate(star.full);
  }

  function handleMouseMove(e) {
    const distance = isClicked(e.target, e.clientX);

    distance ? onTempRating(star.half) : onTempRating(star.full);
  }

  function handleMouseOut() {
    onTempRating(0);
  }

  return (
    <StyledStar
      color={color}
      role="button"
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseOut={handleMouseOut}
    >
      {tempRating
        ? tempRating !== star.half &&
          tempRating < star.full && <IoStarOutline />
        : rating !== star.half && rating < star.full && <IoStarOutline />}

      {tempRating
        ? tempRating === star.half && <IoStarHalfSharp />
        : rating === star.half && <IoStarHalfSharp />}

      {tempRating
        ? tempRating !== star.half && tempRating >= star.full && <IoStarSharp />
        : rating !== star.half && rating >= star.full && <IoStarSharp />}
    </StyledStar>
  );
}
