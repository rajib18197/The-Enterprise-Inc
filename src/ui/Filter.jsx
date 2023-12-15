import { useSearchParams } from "react-router-dom";
import styles from "./Filter.module.css";
import styled, { css } from "styled-components";
import Heading from "./Heading";

const StyledFilter = styled.div`
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.8rem;
`;

const FilterButton = styled.button`
  background: none;
  border: none;

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  padding: 1rem 2rem;
  transition: all 0.3s;

  ${(props) =>
    props.active === "true" &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

export default function Filter({ filterFields, options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterFields) || options.at(0).value;

  function handleClick(value) {
    searchParams.set(filterFields, value);
    setSearchParams(searchParams);
  }

  return (
    <StyledFilter>
      {options.map((option) => (
        <FilterButton
          active={currentFilter === option.value ? "true" : "false"}
          key={option.value}
          onClick={() => handleClick(option.value)}
          disabled={option.value === currentFilter}
        >
          {option.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
}

const StyledFilterCombined = styled.div`
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButtonCombined = styled.button`
  background-color: var(--color-grey-0);
  border: none;

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.4rem 0.8rem;
  transition: all 0.3s;

  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

const urlFilterSting = function (obj) {
  // Check if the value is an object or Not.
  // If typeof yourVariable === 'object', it's an object or null.
  // If you want null, arrays or functions to be excluded, just make it:

  const str =
    typeof obj === "object" && !Array.isArray(obj) && obj !== null
      ? `${obj.field}-${obj.range.min}to${obj.range.max}`
      : obj;

  return str;
};

export function FilterCombined({ filterFields, options }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentFilterValue =
    searchParams.get(filterFields) || options.at(0).value;

  function handleClick({ field, range }) {
    // If value is all then we remove the url string of this filter
    if (!field && !range) {
      searchParams.delete(filterFields);
      setSearchParams(searchParams);
      return;
    }

    searchParams.set(filterFields, `${field}-${range.min}to${range.max}`);
    setSearchParams(searchParams);
  }

  return (
    <StyledFilterCombined>
      {options.map((option) => (
        <FilterButtonCombined
          key={option.value?.field || option.value}
          active={
            currentFilterValue === urlFilterSting(option.value)
              ? "true"
              : undefined
          }
          onClick={() =>
            handleClick({
              field: option.value?.field,
              range: option.value?.range,
            })
          }
        >
          {option.label}
        </FilterButtonCombined>
      ))}
    </StyledFilterCombined>
  );
}

const StyledFilterRound = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const RoundOptionsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, max-content);
  gap: 2rem;
`;

const ButtonRound = styled.button`
  border: 2px solid var(--color-yellow-700);
  outline: none;
  padding: 0.8rem 3.5rem;
  font-size: 1.7rem;
  border-radius: 3rem;
  cursor: pointer;
  color: #444;
  text-transform: uppercase;

  ${(props) =>
    props.active === "true" &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-grey-100);
      border-color: transparent;
    `}
`;

export function FilterRound({ filterFields, options }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const [first, second] = filterFields.split("-");
  const currentFilter1 = searchParams.get(first);
  const currentFilter2 = searchParams.get(second);
  console.log(currentFilter1, currentFilter2);

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
    <StyledFilterRound>
      <Heading as="h3">{filterFields}</Heading>

      <RoundOptionsContainer>
        {options.map((option) => (
          <ButtonRound
            key={option.salaryExpectationRange.min}
            active={
              currentFilter1 === option.experience &&
              currentFilter2 ===
                (Object.values(option.salaryExpectationRange).length === 1
                  ? Object.values(option.salaryExpectationRange).join("") +
                    "plus"
                  : Object.values(option.salaryExpectationRange).join("-"))
                ? "true"
                : "false"
            }
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
          </ButtonRound>
        ))}
      </RoundOptionsContainer>
    </StyledFilterRound>
  );
}

const StyledFilterBox = styled.div`
  display: flex;
  gap: 2rem;
`;

const ButtonBox = styled.button`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border: 2px solid var(--color-brand-200);
  border-radius: 4px;
  outline: none;
  padding: 1rem;
  cursor: pointer;
  width: 100%;
  background: var(--color-grey-50);
  color: rgb(37, 27, 27);
  transition: all 0.3s ease-in;
  text-transform: uppercase;
  font-weight: 700;

  ${(props) =>
    props.active === "true" &&
    css`
      border-color: transparent;
      background-color: var(--color-brand-600);
      color: white;
    `}
`;

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
    <StyledFilterBox>
      {options.map((option) => (
        <ButtonBox
          active={currentFilters?.includes(option.value) ? "true" : "false"}
          onClick={() => handleClick(option.value)}
          key={option.value}
        >
          <span>{option.icon}</span>
          <span>{option.value}</span>
        </ButtonBox>
      ))}
    </StyledFilterBox>
  );
}

const StyledFilterCheckBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CheckboxOptions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, max-content));
  gap: 2rem;
  cursor: pointer;
`;

const Option = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const Input = styled.input`
  width: 2.4rem;
  height: 2.4rem;
  border: 1px solid #222;
  cursor: pointer;
`;

const Label = styled.label`
  font-size: 1.6rem;
  font-weight: 600;
  text-transform: uppercase;
  cursor: pointer;
`;

export function FilterCheck({ filterFields, options }) {
  const [searchParams, setSearchParams] = useSearchParams();

  function isChecked(option) {
    const existingValues = searchParams.get(filterFields);
    console.log(existingValues?.split(",").includes(option.value));
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

  options.map((option) => {
    console.log(isChecked(option));
  });
  return (
    <StyledFilterCheckBox>
      <Heading as={"h3"}>{filterFields}</Heading>

      <CheckboxOptions>
        {options.map((option) => (
          <Option key={option.value}>
            <Input
              type="checkbox"
              name={option.value}
              checked={isChecked(option) || false}
              onChange={() => {
                handleClick(option);
              }}
              id={option.value}
            />
            <Label htmlFor={option.value}>{option.label}</Label>
          </Option>
        ))}
      </CheckboxOptions>
    </StyledFilterCheckBox>
  );
}
