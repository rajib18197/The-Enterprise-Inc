import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import styled from "styled-components";
import Logo from "./Logo";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 8rem 1fr;
  grid-template-rows: auto 1fr;
  /* height: 100vh; */
  /* background-color: #e7b24f;
  padding: 2rem 0 0 0; */
  /* border-radius: 4px; */
  gap: 0.8rem;
  // padding: 2rem;
  // width: 120rem;
  // margin: 0 auto;
  // box-shadow: 6.2px 12.5px 12.5px hsl(0deg 0% 0% / 0.31);
  // box-shadow: rgba(0, 0, 0, 0.15) 0px 15px 25px, rgba(0, 0, 0, 0.05) 0px 5px 10px;
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 2.8rem 3.4rem;
  grid-column: 2 / -1;
  grid-row: 2 / -1;
  overflow-y: scroll;
  box-shadow: var(--shadow-xl);
  border-radius: var(--border-radius-lm);

  overflow-y: scroll;
  height: calc(100vh - 11vh - 3rem);

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
`;

const Container = styled.div`
  // max-width: 120rem;
  // margin: 0 auto;
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
