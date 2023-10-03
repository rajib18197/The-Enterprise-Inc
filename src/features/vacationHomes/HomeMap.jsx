import { useDispatch, useSelector } from "react-redux";
import styles from "./HomeMap.module.css";
import { focusedHome, getHomesState, removeFocused } from "./homesSlice";
import Button from "../../ui/Button";
import Slider from "../../ui/Slider";
import { useState } from "react";

export default function HomeMap() {
  const { homes, currentFocusedHome } = useSelector(getHomesState);
  const [currentSlidesHome, setCurrentSlidesHome] = useState({});

  const dispatch = useDispatch();

  function handleClick(home) {
    setCurrentSlidesHome((prev) => (prev?.id === home.id ? {} : home));
  }

  return (
    <div className={styles.map}>
      <div>
        {currentFocusedHome.id || currentSlidesHome.id ? (
          <Slider
            currentHome={
              currentSlidesHome.id ? currentSlidesHome : currentFocusedHome
            }
            key={currentSlidesHome.id || currentFocusedHome.id}
          />
        ) : (
          ""
        )}
      </div>
      <div className={styles.mapHomes}>
        {homes.map((home) => (
          <Button
            key={home.id}
            variation={
              home.name === currentFocusedHome?.name ? "primary" : "secondary"
            }
            onClick={() => handleClick(home)}
          >
            {home.price}
            <p>{home.address}</p>
          </Button>
        ))}
      </div>
    </div>
  );
}
