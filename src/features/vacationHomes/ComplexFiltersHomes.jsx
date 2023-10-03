import { useSearchParams } from "react-router-dom";
import {
  FilterBox,
  FilterCheck,
  FilterRound,
  FilterSwitch,
} from "../../ui/Filter";
import styles from "./ComplexFiltersHomes.module.css";
import { useSelector } from "react-redux";
import { getHomesState } from "./homesSlice";
import { useFilterHomes } from "../../hooks/useFilterHomes";

export default function ComplexFiltersHomes() {
  const options = Array.from({ length: 8 }, (_, i) => ({ value: i + 1 }));
  const optionsTypes = [
    { icon: "h", value: "house" },
    { icon: "h", value: "apartment" },
    { icon: "h", value: "guesthouse" },
    { icon: "h", value: "hotel" },
  ];

  const optionsEssentials = [
    "wifi",
    "tv",
    "air-conditioning",
    "kitchen",
    "dedicated workspace",
  ];
  const optionsFeatures = [
    "pool",
    "gym",
    "breakfast",
    "EV charger",
    "free parking",
    "indoor fireplace",
  ];
  const optionsLoctions = ["beachfront", "waterfront"];
  const optionsSafety = ["smoke alarm", "carbon monoxide alarm"];

  const optionsTopStays = [
    { textHeading: "superhost", text: "Add this to homes" },
  ];
  const { homes } = useSelector(getHomesState);

  const filterHomes = useFilterHomes(homes);
  return (
    <div className={styles.filters}>
      <div className={styles.filtersHeader}>
        <h3>Filters</h3>
      </div>
      <div className={styles.filtersContainer}>
        <div className={styles.filterThings}>
          <h2>Rooms and Beds</h2>
          <FilterRound filterFields="beds" options={options} />
          <FilterRound filterFields="bathrooms" options={options} />
          <FilterRound filterFields="bedrooms" options={options} />
        </div>

        <div className={styles.types}>
          <h2>Property Types</h2>
          <FilterBox filterFields={"types"} options={optionsTypes} />
        </div>

        <div className={styles.amenities}>
          <h2>Amenities</h2>
          <FilterCheck
            filterFields={"essentials"}
            options={optionsEssentials}
          />
          <FilterCheck filterFields={"features"} options={optionsFeatures} />
          <FilterCheck filterFields={"location"} options={optionsLoctions} />
          <FilterCheck filterFields={"safety"} options={optionsSafety} />
        </div>

        <div className={styles.topStays}>
          <h2>Top Tier stays</h2>
          <FilterSwitch options={optionsTopStays} filterFields={"top-stays"} />
        </div>
      </div>
      <div className={styles.btnActions}>
        <button className={styles.btnShow}>clear Filters</button>
        <button className={styles.btnShow}>
          Show {filterHomes.length} places
        </button>
      </div>
    </div>
  );
}
