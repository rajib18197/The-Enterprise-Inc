import { useState } from "react";

const makeRating = function (number) {
  return Array.from({ length: number }, (_, i) => ({
    half: i + 1 - 0.5,
    full: i + 1,
  }));
};

export default function StarRating({
  initialRating = 0,
  onSetRate,
  maxRatingNumber,
}) {
  const rates = makeRating(maxRatingNumber);

  console.log(rates);
  const [rating, setRating] = useState(initialRating);
  const [tempRating, setTempRating] = useState(0);

  return (
    <StarContainer>
      <StarList
        rates={rates}
        rating={rating}
        onRating={setRating}
        tempRating={tempRating}
        onTempRating={setTempRating}
        onSetRateOutside={onSetRate}
      />
      <Text>{tempRating || rating || ""}</Text>
    </StarContainer>
  );
}

const starContainerStyle = {
  width: "100%",
  height: "6rem",
  background: "var(--color-grey-800)",
  color: "white",
  borderRadius: "3px",
  display: "flex",
  gap: "1rem",
  alignItems: "center",
  padding: "3rem",
  //   justifyContent: "center",
};

function StarContainer({ children }) {
  return <div style={starContainerStyle}>{children}</div>;
}

const starListStyle = {
  display: "flex",
  alignItems: "center",
  gap: ".6rem",
  width: "80%",
};

function StarList({
  rates,
  rating,
  onRating,
  tempRating,
  onTempRating,
  onSetRateOutside,
}) {
  return (
    <div style={starListStyle}>
      {rates.map((rate) => (
        <Star
          key={rate.half}
          rate={rate}
          rating={rating}
          onRating={(r) => onRating(r)}
          onSetRateOutside={onSetRateOutside}
          tempRating={tempRating}
          onTempRating={(r) => onTempRating(r)}
          isFull={tempRating ? tempRating >= rate.full : rating >= rate.full}
        />
      ))}
    </div>
  );
}

const starStyle = {
  display: "block",
  cursor: "pointer",
};

const iconStyle = {
  width: "3.2rem",
  height: "3.2rem",
  color: "var(--color-brand-600)",
};

function Star({
  rate,
  rating,
  onRating,
  tempRating,
  onTempRating,
  isFull,
  onSetRateOutside,
}) {
  const isHalf = tempRating === rate.half || rating === rate.half;

  function handleRate(e) {
    const coords = e.target.getBoundingClientRect();
    const leftCoords = coords.x;
    const clickedCoords = e.clientX;
    console.log(clickedCoords - leftCoords, coords);

    if (clickedCoords - leftCoords < Math.floor(coords.width / 2)) {
      onRating(rate.half);
      onSetRateOutside(rate.half);
      return;
    }

    onRating(rate.full);
    onSetRateOutside(rate.full);
  }

  function handleEnter(e) {
    const coords = e.target.getBoundingClientRect();
    const leftCoords = coords.x;
    const clickedCoords = e.clientX;

    if (clickedCoords - leftCoords <= Math.floor(coords.width / 2)) {
      onTempRating(rate.half);
      return;
    }

    onTempRating(rate.full);
  }

  return (
    <span
      role="button"
      style={starStyle}
      onClick={handleRate}
      onMouseMove={handleEnter}
      onMouseOut={() => onTempRating(0)}
    >
      {!isFull && !isHalf && (
        <ion-icon name="star-outline" style={iconStyle}></ion-icon>
      )}

      {isFull && <ion-icon name="star" style={iconStyle}></ion-icon>}

      {isHalf && (
        <ion-icon name="star-half-outline" style={iconStyle}></ion-icon>
      )}
    </span>
  );
}

const textStyle = {
  fontSize: "1.6rem",
  fontWeight: "600",
  textTransform: "uppercase",
};

function Text({ children }) {
  return <p style={textStyle}>{children}</p>;
}
