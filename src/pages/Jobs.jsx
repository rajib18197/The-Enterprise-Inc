import AddJob from "../features/jobs/AddJob";
import JobTable from "../features/jobs/JobTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

export default function Jobs() {
  return (
    <>
      <Row type="horizontal">
        <Heading>All Jobs</Heading>
      </Row>
      <Row>
        <JobTable />
        <AddJob />
      </Row>
    </>
  );
}
