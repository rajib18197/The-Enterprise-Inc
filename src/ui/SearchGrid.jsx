import { createPortal } from "react-dom";
import styles from "./SearchBox.module.css";
import { useState } from "react";
import SelectRegion from "./SelectRegion";
import DatePicker from "./DatePicker";
import AddGuest from "./AddGuest";
import Button from "./Button";

export default function SearchGrid({ tabs, initialTab }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  console.log(activeTab);

  return createPortal(
    <div className={styles.searchGrid}>
      <div className={styles.btnGroups}>
        {tabs.map((tab, i) => (
          <SearchButtonBox
            key={tab.title}
            name={tab.title}
            placeholder={tab.label}
            readOnly={tab.readOnly}
            onClick={() => setActiveTab(i)}
            isLastIndex={i === tabs.length - 1}
            active={activeTab === i}
          />
        ))}
      </div>

      <div className={`${styles.content} ${styles[`content--${activeTab}`]}`}>
        {/* {tabs[activeTab].title.toLowerCase() === "where" && <SelectRegion />}
        {(tabs[activeTab].title.toLowerCase() === "check in" ||
        tabs[activeTab].title.toLowerCase() === "check out") && (
          <DatePicker />
        )} */}
        {tabs[activeTab].title.toLowerCase() === "who" && <AddGuest />}
      </div>
    </div>,
    document.body
  );
}

function SearchButtonBox({
  name,
  placeholder,
  readOnly,
  isLastIndex,
  onClick,
  active,
  children,
}) {
  return (
    <div className={styles.searchDestination} onClick={onClick}>
      <button
        className={`${styles.btnGrid} ${active ? styles.searchDestActive : ""}`}
      >
        <span>{name}</span>

        {readOnly ? (
          <p>{placeholder}</p>
        ) : (
          <input type="text" placeholder={placeholder} />
        )}
      </button>

      {children}

      {isLastIndex && (
        <div className={styles.submitBtn}>
          <Button variation={"secondary"}>Search</Button>
        </div>
      )}
    </div>
  );
}
