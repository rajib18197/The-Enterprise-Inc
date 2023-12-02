import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";
import Uploader from "../data/Uploader";
import DarkModeToggle from "./DarkModeToggle";

const StyledSidebar = styled.aside`
  background-color: #f5f5f5;
  background-color: var(--color-grey-100);
  // padding: 1rem 0;
  border-right: 1px solid var(--color-grey-100);

  // grid-row: 1 / -1;
  grid-row: 1 / -1;
  grid-column: 1 / span 1;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;
const Box = styled.div`
  margin-top: auto;
  // margin-bottom: 1rem;
`;

function Sidebar() {
  return (
    <StyledSidebar>
      <Logo />
      <MainNav />
      <Box>
        <DarkModeToggle />
      </Box>
    </StyledSidebar>
  );
}

export default Sidebar;
