import { createPortal } from "react-dom";
import Counter from "./Counter";
import styles from "./AddGuest.module.css";

export default function AddGuest() {
  const data = [
    { label: "Adults", labelRange: "Ages 13 or above" },
    { label: "Children", labelRange: "Ages 2-12" },
    { label: "Infants", labelRange: "Under 2" },
    { label: "pets", labelRange: "Animal" },
  ];

  return (
    <div className={styles.addGuest}>
      {data.map((d) => (
        <div className={styles.container}>
          <Counter key={d.label}>
            <Counter.Label label={d.label} labelRange={d.labelRange} />
            <div className={styles.controllers}>
              <Counter.Increment icon={"+"} />
              <Counter.Count />
              <Counter.Decrement icon={"-"} />
            </div>
          </Counter>
        </div>
      ))}
    </div>
    // document.body
  );
}
