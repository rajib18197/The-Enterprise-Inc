import styled from "styled-components";
import Filter from "../../ui/Filter";
import Modal from "../../ui/Modal";
import AdvancedFilters from "./AdvancedFilters";

const StyledApplicationTableOperations = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  padding: 0.8rem 0;
  border-radius: 5px;

  @media (max-width: 44em) {
    flex-direction: column;
    align-items: end;
  }
`;

const Box = styled.div`
  flex: 1;
  padding: 0.4rem;
  background-color: var(--color-grey-0);
  /* box-shadow: var(--shadow-sm); */
  border-radius: 3px;
`;

const Button = styled.button`
  border: none;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  height: 100%;
  width: 100%;
  padding: 1rem 2.5rem;
  display: block;

  font-size: 1.4rem;
  /* padding: 1rem 3.6rem; */
  font-weight: 500;
  color: var(--color-grey-100);
  /* background: none; */
  background-color: var(--color-brand-600);

  &:hover {
    background-color: var(--color-brand-700);
  }
`;

const options = [
  { value: "all", label: "All" },
  { value: "awards-recognitions", label: "Awards and Recognitions" },
  { value: "open-source", label: "Open Source" },
  { value: "published-research", label: "Published Research" },
  { value: "leadership-experience", label: "Leadership Experience" },
  // { value: "design", label: "Start-up Experience" },
  // { value: "mansions", label: "Innovative Projects" },
  // { value: "creative spaces", label: "Coding Competitions" },
  // { value: "treehouses", label: "Community Involvement" },
  // { value: "treehouse", label: "Certifications" },
];

export default function ApplicationTableOperations() {
  return (
    <StyledApplicationTableOperations>
      <Filter filterFields="specialAttribute" options={options} />

      <Modal>
        <Modal.Open opens="complex-filter">
          <Box>
            <Button>Advanced Filters</Button>
          </Box>
        </Modal.Open>
        <Modal.Window windowName="complex-filter">
          <AdvancedFilters />
        </Modal.Window>
      </Modal>
    </StyledApplicationTableOperations>
  );
}
