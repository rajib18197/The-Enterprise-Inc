import Pagination from "../../ui/Pagination";
import { useApplications } from "./useApplications";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import ApplicationRow from "./ApplicationRow";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import Error from "../../ui/Error";

export default function ApplicationList() {
  const { isPending, applications, isError, count } = useApplications();

  if (isPending) return <Spinner />;

  if (!applications?.length) return <Empty resource={"Applications"} />;

  if (isError)
    return (
      <Error msg="There is an error occurred while fetching candidates applications. Please try again :)" />
    );

  return (
    <Menus>
      <Table columns="1.2fr 1.2fr 2.4fr 1.8fr .6fr 3.2rem">
        <Table.Header>
          <div>Job</div>
          <div>Candidate</div>
          <div>Submitted Date</div>
          <div>Status / Special Mention</div>
          <div>Resume</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={applications}
          render={(application) => (
            <ApplicationRow key={application.id} application={application} />
          )}
        />
        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

// Features don’t make money! Products make money!

// So, it is time you market yourself not as a developer but as a money-making specialist.

// Where is the best place to do that?

// In your CV & LinkedIn profile.

// How?

// By directly relating the stuff you do with the revenue. Either by generating more sales (better website, better conversion, more money) or by reducing cost (automating processes that were in the past done by humans, expensive humans).

// That’s it
