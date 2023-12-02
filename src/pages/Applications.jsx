import styled from "styled-components";

import ApplicationTable from "../features/applications/ApplicationTable";
import ApplicationTableOperations from "../features/applications/ApplicationTableOperations";
import SearchBox from "../ui/SearchBox";
import AddApplication from "../features/applications/AddApplication";
import Heading from "../ui/Heading";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1rem 2rem;
  box-shadow: 0 0 0 transparent, 0 0 0 transparent,
    0 0 3rem rgba(76, 103, 150, 0.3);
  border-radius: 0.3rem;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export default function Applications() {
  return (
    <Container>
      <Box>
        <Row>
          <Heading as='h1'>All Applications</Heading>
          {/* <SearchBox /> */}
          <AddApplication />
        </Row>
        <ApplicationTableOperations />
      </Box>
      <main>
        <ApplicationTable />
      </main>
    </Container>
  );
}
