import styled from "styled-components";
import AddJob from "../features/jobs/AddJob";
import JobTable from "../features/jobs/JobTable";
import JobTableOperations from "../features/jobs/JobTableOperations";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import SearchBox from "../ui/SearchBox";
import { useState } from "react";

const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1rem 2rem;
  box-shadow: var(--shadow-xl);
  border-radius: 0.3rem;
`;

export default function Jobs() {
  const [searchValue, setSearchValue] = useState("");

  function handleSearch(value) {
    setSearchValue(value);
    console.log(value);
  }

  return (
    <>
      <Box>
        <Row type="horizontal">
          <Heading as={"h1"}>Jobs List</Heading>
          <SearchBox value={searchValue} onChange={handleSearch} />
          <AddJob />
        </Row>
        {/* <Row type="horizontal"> */}
        <JobTableOperations />
        {/* </Row> */}
      </Box>
      <Row>
        <JobTable searchValue={searchValue} />
      </Row>
    </>
  );
}

// 1. Build complex features in your large projects like
// - API polling
// - Debouncing
// - Chunking/Lazy Loading
// - Responsive Interface

// - Live chat
// - Multi Language support
// - Config-driven UI
// - Unit Testing
// - SEO optimization
