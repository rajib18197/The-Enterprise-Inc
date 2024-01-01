import styled from "styled-components";
import Filter, { FilterCombined } from "../../ui/Filter";

const StyledJobTableOperations = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1.6rem;
  padding: 0.8rem 0;
  border-radius: 5px;

  @media (max-width: 44em) {
    flex-direction: column;
    align-items: end;
  }
`;

const expSalaryoptions = [
  { label: "All", value: "all" },
  {
    label: "exp(Junior) - salary(2000 to 4000)",
    value: {
      field: "junior",
      range: { min: 2000, max: 4000 },
    },
  },

  {
    label: "exp(Mid-level) - salary(4500 to 7500)",
    value: {
      field: "midlevel",
      range: { min: 4500, max: 7500 },
    },
  },

  {
    label: "exp(Senior) - salary(8000 to 10000)",
    value: {
      field: "senior",
      range: { min: 8000, max: 10000 },
    },
  },
];

export default function JobTableOperations() {
  return (
    <StyledJobTableOperations>
      <Filter
        filterFields={"status"}
        options={[
          { label: "All", value: "all" },
          { label: "Active", value: "active" },
          { label: "Done", value: "done" },
        ]}
      />

      <FilterCombined
        filterFields="experience-salaryrange"
        options={expSalaryoptions}
      />
    </StyledJobTableOperations>
  );
}
