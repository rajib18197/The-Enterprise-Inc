import { createContext, useContext } from "react";
import styled from "styled-components";

export const TableContainer = styled.div`
  @media (max-width: 44em) {
    overflow-x: auto;
    /* max-width: 60rem; */
  }
`;

const StyledTable = styled.div`
  box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 12px;
  box-shadow: var(--shadow-xl);
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
  margin-bottom: 10rem;

  @media (max-width: 44em) {
    width: 100rem;
  }
  @media (max-width: 34em) {
    width: 120rem;
  }
`;

const CommonRow = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  column-gap: 1rem;
  align-items: center;
  transition: none;
`;

const StyledHeader = styled(CommonRow)`
  padding: 1.8rem 2.4rem;

  background-color: var(--color-grey-50);
  /* border-bottom: 1px solid var(--color-grey-100); */
  text-transform: uppercase;
  letter-spacing: 0.4px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;

  font-weight: 500;
  color: var(--color-grey-600);
`;

const StyledBody = styled.section`
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
`;

const StyledRow = styled(CommonRow)`
  padding: 1.2rem 2.4rem;

  &:nth-child(odd) {
    background-color: var(--color-red-100);
    /* background-color: #fee2e2; */
    /* color: #4b5563; */
    /* color: #f6f9ff; */
  }

  &:nth-child(odd) :first-child {
    /* color: #4b5563; */
  }
`;

const Footer = styled.footer`
  // background-color: var(--color-grey-100);

  // display: flex;
  width: 100%;
  // justify-content: center;
  padding: 1.4rem;

  &:not(:has(*)) {
    display: none;
  }
`;

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;

const TableContext = createContext();

export default function Table({ columns, children }) {
  return (
    <TableContext.Provider value={{ columns }}>
      <StyledTable role="table">{children}</StyledTable>
    </TableContext.Provider>
  );
}

function Header({ children }) {
  const { columns } = useContext(TableContext);
  return (
    <StyledHeader role="row" columns={columns}>
      {children}
    </StyledHeader>
  );
}

function Body({ data, render }) {
  return <StyledBody>{data.map(render)}</StyledBody>;
}

function Row({ children }) {
  const { columns } = useContext(TableContext);

  return (
    <StyledRow role="row" columns={columns}>
      {children}
    </StyledRow>
  );
}

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Footer = Footer;
