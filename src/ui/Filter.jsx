import { useSearchParams } from "react-router-dom";
import styles from "./Filter.module.css";
import { useEffect, useRef, useState } from "react";

export default function Filter({ filterFields, options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterFields) || options.at(0).value;

  function handleClick(value) {
    searchParams.set(filterFields, value);
    setSearchParams(searchParams);
  }

  return (
    <div className={styles.filter}>
      {options.map((option) => (
        <button
          className={`${styles.filterButton} ${
            currentFilter === option.value ? styles.active : ""
          }`}
          key={option.value}
          onClick={() => handleClick(option.value)}
          disabled={option.value === currentFilter}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export function FilterRound({ filterFields, options }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const [first, second] = filterFields.split("-");
  const currentFilter1 = searchParams.get(first);
  const currentFilter2 = Number(searchParams.get(second));

  function handleClick({ experience, salaryExpectationRange }) {
    const [first, second] = filterFields.split("-");
    searchParams.set(first, experience);
    const arr = Object.values(salaryExpectationRange);
    searchParams.set(
      second,
      arr.length === 1 ? `${arr.join("")}plus` : arr.join("-")
    );
    setSearchParams(searchParams);
  }

  return (
    <div className={styles.round}>
      <h2
        style={{
          textTransform: "capitalize",
          fontSize: "1.7rem",
          fontWeight: "400",
        }}
      >
        {filterFields}
      </h2>
      <div className={styles.roundOptions}>
        {options.map((option) => (
          <button
            key={option.salaryExpectationRange.min}
            className={`${styles.roundButton} ${
              currentFilter1 === option.experience &&
              currentFilter2 === option.salaryExpectationRange
                ? styles.active
                : ""
            }`}
            onClick={() =>
              handleClick({
                experience: option.experience,
                salaryExpectationRange: option.salaryExpectationRange,
              })
            }
          >
            {option.experience}({option.salaryExpectationRange.min}
            {option.salaryExpectationRange.max
              ? `-${option.salaryExpectationRange.max}`
              : "+"}
            )
          </button>
        ))}
      </div>
    </div>
  );
}

export function FilterBox({ filterFields, options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilters =
    searchParams.get(filterFields) &&
    searchParams.get(filterFields)?.split(",");
  console.log(currentFilters);

  function handleClick(value) {
    const existingValues = searchParams.get(filterFields);
    console.log(existingValues);

    const arr = existingValues?.split(",");
    console.log(arr);

    if (arr?.includes(value)) {
      const fill = arr.filter((el) => el !== value);
      console.log(fill);

      if (fill.length === 0) {
        searchParams.delete(filterFields);
        setSearchParams(searchParams);
        return;
      }

      searchParams.set(filterFields, fill);
      setSearchParams(searchParams);
      return;
    }

    if (existingValues) {
      searchParams.set(filterFields, [existingValues, value]);
      setSearchParams(searchParams);
    } else {
      searchParams.set(filterFields, value);
      setSearchParams(searchParams);
    }
  }

  return (
    <div className={styles.boxOptions}>
      {options.map((option) => (
        <button
          className={`${styles.boxBtn} ${
            currentFilters?.includes(option.value) ? styles.active : ""
          }`}
          onClick={() => handleClick(option.value)}
          key={option.value}
        >
          <span>{option.icon}</span>
          <span>{option.value}</span>
        </button>
      ))}
    </div>
  );
}

export function FilterCheck({ filterFields, options }) {
  // const [isChecked, setIsChecked] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  // const currentChecked = searchParams.get(filterFields) || false;

  function isChecked(option) {
    const existingValues = searchParams.get(filterFields);
    return existingValues?.split(",").includes(option.value);
  }

  function handleClick(value) {
    console.log("called");
    const existingValues = searchParams.get(filterFields); // NOT an array
    console.log(existingValues);
    const arr = existingValues?.split(",");
    console.log(arr);

    if (arr?.includes(value.value)) {
      const fill = arr.filter((el) => el !== value.value);
      if (fill.length === 0) {
        searchParams.delete(filterFields);
        setSearchParams(searchParams);
        return;
      }
      searchParams.set(filterFields, fill);
      setSearchParams(searchParams);
      return;
    }

    if (existingValues) {
      searchParams.set(filterFields, [existingValues, value.value]);
      setSearchParams(searchParams);
    } else {
      searchParams.set(filterFields, value.value);
      setSearchParams(searchParams);
    }
  }

  return (
    <div className={styles.checkboxContainer}>
      <h2>{filterFields}</h2>
      <div className={styles.checkboxOptions}>
        {options.map((option) => (
          <div
            key={option.value}
            className={styles.checkbox}
          >
            <input
              type="checkbox"
              name={option.value}
              // checked={searchParams.get(filterFields)?.includes(option.value)}
              checked={isChecked(option)}
              onChange={() => {
                handleClick(option);
                console.log(2);
              }}
              id={option.value}
            />
            <label htmlFor={option.value}>{option.label}</label>
          </div>
        ))}
      </div>
    </div>
  );
}
