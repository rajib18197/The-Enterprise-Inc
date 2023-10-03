import { useRef, useState } from "react";
import styles from "./Slider.module.css";
import { useEffect } from "react";

export default function Slider({ currentHome }) {
  const ref = useRef();
  const [curSlide, setCurSlide] = useState(0);

  useEffect(
    function () {
      // console.log(ref.current.querySelectorAll(".slide"));
      ref.current
        .querySelectorAll(".slide")
        .forEach(
          (slide, i) =>
            (slide.style.transform = `translateX(${(i - curSlide) * 100}%)`)
        );
    },
    [curSlide]
  );

  return (
    <div className={styles.slider} ref={ref}>
      {Array.from({ length: 6 }, (_, i) => (
        <div key={i} className={`${styles.slide} slide`}>
          <div className={styles.content}>Home Image {i + 1}</div>
        </div>
      ))}

      <button
        className={`${styles["slider__btn"]} ${styles["slider__btn--left"]}`}
        onClick={() => setCurSlide((s) => (s === 0 ? 5 : s - 1))}
      >
        &larr;
      </button>
      <button
        className={`${styles["slider__btn"]} ${styles["slider__btn--right"]}`}
        onClick={() => setCurSlide((s) => (s === 5 ? 0 : s + 1))}
      >
        &rarr;
      </button>
      <div className={styles.dots}></div>
    </div>
  );
}
