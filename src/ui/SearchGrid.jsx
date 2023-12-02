import { createPortal } from "react-dom";
import styles from "./SearchBox.module.css";
import { useState } from "react";
import SelectRegion from "./SelectRegion";
import DatePicker from "./DatePicker";
import AddGuest from "./AddGuest";
import Button from "./Button";

export default function SearchGrid({ tabs, initialTab }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [position,setPosition] = useState({x: 0, y: 0});

  function handleClick(e,index){
    // console.log(e.target.closest('.box-search'));
    const coords = e.target.closest('.box-search').getBoundingClientRect();
    console.log(coords);
    setPosition({x: coords.x, y: coords.y + coords.height + 8})
    setActiveTab(index)
  }

  return createPortal(
    <div className={styles.searchGrid}>
      <div className={styles.btnGroups}>
        {tabs.map((tab, i) => (
          <SearchButtonBox
            key={tab.title}
            name={tab.title}
            placeholder={tab.label}
            readOnly={tab.readOnly}
            onClick={(e) => handleClick(e,i)}
            isLastIndex={i === tabs.length - 1}
            active={activeTab === i}
          />
        ))}
      </div>

      {/* <div className={`${styles.content} ${styles[`content--${activeTab}`]}`}> */}
        {tabs[activeTab].title.toLowerCase() === "where" && <SelectRegion position={position} />}
        {(tabs[activeTab].title.toLowerCase() === "check in" ||
        tabs[activeTab].title.toLowerCase() === "check out") && (
          <DatePicker position={position} />
        )}
        {tabs[activeTab].title.toLowerCase() === "who" && <AddGuest position={position} />}
      {/* </div> */}
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
    <div className={`${styles.searchDestination} box-search`} onClick={onClick}>
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
