import { useState } from "react";

const rates = [
  { half: 0.5, full: 1 },
  { half: 1.5, full: 2 },
  { half: 2.5, full: 3 },
  { half: 3.5, full: 4 },
  { half: 4.5, full: 5 },
];

export default function StarRating() {
  const [rating, setRating] = useState(0);
  const [tempRating, setTempRating] = useState(0);

  return (
    <StarContainer>
      <StarList
        rating={rating}
        onRating={setRating}
        tempRating={tempRating}
        onTempRating={setTempRating}
      />
      <Text>{tempRating || rating || ""}</Text>
    </StarContainer>
  );
}

const starContainerStyle = {
  width: "50rem",
  height: "20rem",
  background: "#101d28",
  color: "white",
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

function StarList({ rating, onRating, tempRating, onTempRating }) {
  return (
    <div style={starListStyle}>
      {rates.map((rate) => (
        <Star
          key={rate.half}
          rate={rate}
          rating={rating}
          onRating={(r) => onRating(r)}
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
  width: "4.8rem",
  height: "4.8rem",
};

function Star({ rate, rating, onRating, tempRating, onTempRating, isFull }) {
  const isHalf = tempRating === rate.half || rating === rate.half;

  function handleRate(e) {
    const coords = e.target.getBoundingClientRect();
    const leftCoords = coords.x;
    const clickedCoords = e.clientX;
    console.log(clickedCoords - leftCoords, coords);

    if (clickedCoords - leftCoords < Math.floor(coords.width / 2)) {
      onRating(rate.half);
      return;
    }

    onRating(rate.full);
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
