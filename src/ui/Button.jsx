import styles from "./Button.module.css";

export default function Button({ onClick, variation, size, children }) {
  return (
    <button
      className={`${styles.btn} ${styles[variation]} ${styles[size]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  variation: "primary",
  size: "medium",
};
