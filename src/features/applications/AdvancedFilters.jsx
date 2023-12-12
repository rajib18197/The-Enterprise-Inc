import styled from "styled-components";
import { FilterBox, FilterCheck, FilterRound } from "../../ui/Filter";
import Heading from "../../ui/Heading";
import { useSearchParams } from "react-router-dom";

const StyledAdvancedFilters = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  padding: 1rem;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  border-top: 2px solid rgb(108, 118, 252);
  border-bottom: 2px solid rgb(123, 147, 255);
  /* border: 2px solid rgb(108, 252, 139); */
  padding: 1.5rem;
  overflow-y: scroll;
  height: 70vh;

  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-track {
    border-radius: 4px;
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--color-brand-700);
    border-radius: 4px;
  }

  & > *:not(:last-child) {
    border-bottom: 2px solid rgb(95, 6, 51);
  }
`;

const Row = styled.div`
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
`;

const Button = styled.button`
  background-color: var(--color-brand-700);
  border: none;
  color: white;

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 1rem 2.5rem;
  transition: all 0.3s;
`;

export default function AdvancedFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const combined = [
    { experience: "junior", salaryExpectationRange: { min: 1000, max: 1999 } },
    { experience: "junior", salaryExpectationRange: { min: 2000, max: 2999 } },
    { experience: "junior", salaryExpectationRange: { min: 3000 } },
    {
      experience: "mid-level",
      salaryExpectationRange: { min: 3500, max: 4999 },
    },
    {
      experience: "mid-level",
      salaryExpectationRange: { min: 5000, max: 5999 },
    },
    { experience: "mid-level", salaryExpectationRange: { min: 6000 } },
    { experience: "senior", salaryExpectationRange: { min: 7000, max: 7900 } },
    { experience: "senior", salaryExpectationRange: { min: 8000, max: 9999 } },
    { experience: "senior", salaryExpectationRange: { min: 10000 } },
  ];

  const optionsTypes = [
    { icon: "h", value: "full-time" },
    { icon: "h", value: "internship" },
    { icon: "h", value: "remote" },
    { icon: "h", value: "contract" },
  ];

  const optionsEssentials = [
    { value: "edTechExperience", label: "Ed-Tech Experience" },
    { value: "extra-round", label: "Extra Round" },
  ];

  const status = [
    { value: "interviewing", label: "Interviewing" },
    { value: "selected", label: "Selected" },
    { value: "under-review", label: "Under review" },
  ];

  return (
    <StyledAdvancedFilters>
      <Header>
        <Heading as="h3">Filters</Heading>
      </Header>

      <Main>
        <Row>
          <Heading>Candidate Experience and Salary Expectation Range</Heading>
          <FilterRound
            filterFields="experience-salaryExpectationRange"
            options={combined}
          />
        </Row>

        <Row>
          <Heading>Job Types</Heading>
          <FilterBox filterFields={"type"} options={optionsTypes} />
        </Row>

        <Row>
          <Heading>Miscellineous and Status</Heading>
          <FilterCheck
            filterFields={"essentials"}
            options={optionsEssentials}
          />
          <FilterCheck filterFields={"status"} options={status} />
        </Row>
      </Main>

      <Footer>
        <Button
          onClick={() => {
            searchParams.delete("experience");
            searchParams.delete("salaryExpectationRange");
            searchParams.delete("essentials");
            searchParams.delete("type");
            searchParams.delete("status");

            setSearchParams(searchParams);
          }}
        >
          clear Filters
        </Button>
      </Footer>
    </StyledAdvancedFilters>
  );
}
