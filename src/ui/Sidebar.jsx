import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";
import Uploader from "../data/Uploader";
import DarkModeToggle from "./DarkModeToggle";

const StyledSidebar = styled.aside`
  background-color: #f5f5f5;
  background-color: var(--color-grey-100);
  /* height: 95vh; */
  border-radius: var(--border-radius-lm);
  grid-row: 2 / -1;
  grid-column: 1 / span 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const Box = styled.div`
  /* margin-top: auto; */
  // margin-bottom: 1rem;
`;

function Sidebar() {
  return (
    <StyledSidebar>
      {/* <Logo /> */}
      <MainNav />
      <Box>
        <DarkModeToggle />
      </Box>
    </StyledSidebar>
  );
}

export default Sidebar;
