import styled from "styled-components";

import MainNav from "./MainNav";
import DarkModeToggle from "./DarkModeToggle";

const StyledSidebar = styled.aside`
  background-color: #f5f5f5;
  background-color: var(--color-grey-100);
  /* height: 95vh; */
  height: calc(100vh - 11vh - 3rem);

  border-radius: var(--border-radius-lm);
  grid-row: 2 / -1;
  grid-column: 1 / span 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: 60em) {
    grid-row: 2 / span 1;
    grid-column: 1 / -1;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: auto;
    border-radius: 0;
  }

  @media (max-width: 45em) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

function Sidebar() {
  return (
    <StyledSidebar>
      <MainNav />
      <DarkModeToggle />
    </StyledSidebar>
  );
}

export default Sidebar;
