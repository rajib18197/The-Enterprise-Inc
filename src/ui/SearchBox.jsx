import { useRef, useState } from "react";
import styles from "./SearchBox.module.css";
import { createPortal } from "react-dom";
import SearchGrid from "./searchGrid";

const tabs = [
  {
    title: "Where",
    label: "Search destination",
    readOnly: false,
    text: "Any where",
  },
  { title: "Check in", label: "Add Dates", readOnly: true, text: "Any week" },
  { title: "Check out", label: "Add Dates", readOnly: true },
  { title: "Who", label: "Add Guests", readOnly: true, text: "Add guests" },
];

export default function SearchBox() {
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const [initialActiveTab, setInitialActiveTab] = useState(null);

  function handleOpen(e) {
    console.log(e.target);
    const index = tabs.findIndex(
      (t) =>
        t.text?.trim().toLowerCase() ===
        e.target.textContent.trim().toLowerCase()
    );
    console.log(index);
    setIsOpenSearch((open) => !open);
    setInitialActiveTab(index);
  }

  return (
    <div className={styles.search}>
      {!isOpenSearch ? (
        <div className={styles.searchControllers} onClick={handleOpen}>
          {tabs
            .filter((t) => t.text)
            .map((tab) => (
              <button key={tab.text}>{tab.text}</button>
            ))} 
          <button>Search</button>
        </div>
      ) : (
        <>
          <div className={styles.searchTab}>
            <button>Stays</button>
          </div>
          <SearchGrid tabs={tabs} initialTab={initialActiveTab} />
        </>
      )}
    </div>
  );
}
