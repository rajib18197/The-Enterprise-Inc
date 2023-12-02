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
    searchParams.set(second, arr.length === 1 ? `${arr.join('')}plus` : arr.join("-"));
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

  function handleClick(value) {
    console.log("called");
    const existingValues = searchParams.get(filterFields);
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
            onClick={() => {
              handleClick(option);
              console.log(2);
            }}
          >
            <input
              type="checkbox"
              name={option.value}
              checked={searchParams.get(filterFields)?.includes(option.value)}
              // onChange={() => setIsChecked((check) => !check)}
              id={option.value}
            />
            {/* TODO: problems occured when there is html for attr in onClick handler  */}
            <label
              htmlFor={option.value}
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export function FilterSwitch({ filterFields, options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const btnRef = useRef(null);
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const currentFilter = searchParams.get(filterFields) || "";

  useEffect(
    function () {
      if (currentFilter === "true") {
        btnRef.current.classList.add(`${styles.toggle}`);
        console.log(currentFilter);
        setIsSwitchOn(true);
      } else {
        btnRef.current.classList.remove(`${styles.toggle}`);
      }
    },
    [isSwitchOn]
  );

  function handleToggle() {
    // console.log(btnRef.current);
    setIsSwitchOn((switchOn) => !switchOn);
    // btnRef.current.classList.toggle(`${styles.toggle}`);
    searchParams.set(filterFields, !isSwitchOn);
    setSearchParams(searchParams);
  }

  return (
    <div className={styles.switchOptions}>
      {options.map((option) => (
        <div key={option.textHeading} className={styles.toggleContainer}>
          <div className={styles.description}>
            <h3>{option.textHeading}</h3>
            <p>{option.text}</p>
          </div>
          <button
            className={styles.toggleBtn}
            onClick={handleToggle}
            ref={btnRef}
          ></button>
        </div>
      ))}
    </div>
  );
}

// Archived
// export function FilterRound({ filterFields, options }) {
//   const [searchParams, setSearchParams] = useSearchParams();

//   const currentFilter = Number(searchParams.get(filterFields)) || "any";

//   function handleClick(filter) {
//     // console.log(value, searchParams.get(filterFields));
//     if (filter.value === Number(searchParams.get(filterFields))) {
//       console.log("true");
//       searchParams.delete(filterFields);
//       setSearchParams(searchParams);
//       return;
//     }
//     searchParams.set(
//       filterFields,
//       `${filter.method === "gte" ? `${filter.value}plus` : filter.value}`
//     );
//     setSearchParams(searchParams);
//     console.log(options[0].value, currentFilter);
//   }

//   return (
//     <div className={styles.round}>
//       <h2
//         style={{
//           textTransform: "capitalize",
//           fontSize: "1.7rem",
//           fontWeight: "400",
//         }}
//       >
//         {filterFields}
//       </h2>
//       <div className={styles.roundOptions}>
//         {/* <button
//           className={`${styles.roundButton} ${
//             currentFilter === "any" ? styles.active : ""
//           }`}
//           onClick={() => {
//             searchParams.delete(filterFields);
//             setSearchParams(searchParams);
//           }}
//         >
//           Any
//         </button> */}
//         {options.map((option, i, arr) => (
//           <button
//             className={`${styles.roundButton} ${
//               currentFilter === option ? styles.active : ""
//             }`}
//             key={option}
//             onClick={() =>
//               handleClick({
//                 method: i === arr.length - 1 ? "gte" : "eq",
//                 value: option,
//               })
//             }
//           >
//             {i === arr.length - 1 ? `${option}+` : `${option}`}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }
