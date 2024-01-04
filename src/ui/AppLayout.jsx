import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import styled from "styled-components";
import Logo from "./Logo";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 8rem 1fr;
  grid-template-rows: auto 1fr;
  gap: 0.8rem;

  @media (max-width: 60em) {
    gap: 0;
  }
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 2.8rem 3.4rem;
  grid-column: 2 / -1;
  grid-row: 2 / -1;
  box-shadow: var(--shadow-xl);
  border-radius: var(--border-radius-lm);
  height: calc(100vh - 11vh - 3rem);
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    border-radius: 4px;
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--color-silver-700);
    border-radius: 4px;
  }

  @media (max-width: 60em) {
    grid-row: 3 / span 1;
    grid-column: 1 / -1;
    height: auto;
    border-radius: 0;
    padding: 4rem 1rem 3.4rem;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

function AppLayout() {
  return (
    <StyledAppLayout>
      <Logo />
      <Header />
      <Sidebar />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
/* 

 

*/
