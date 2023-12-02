import styled from "styled-components";
import JobRow from "./JobRow";
import { useJobs } from "./useJobs";
import Spinner from "../../ui/Spinner";
import {
  HiArrowDown,
  HiArrowUp,
  HiChevronUpDown,
  HiXMark,
} from "react-icons/hi2";
import Menus from "../../ui/Menus";
import Table from "../../ui/Table";
import ColumnMenus from "../../ui/ColumnMenus";
import { useSearchParams } from "react-router-dom";

const HeaderColumnName = styled.span`
  font-size: 1.6rem;
  letter-spacing: 0.75px;
  font-weight: 500;
  text-transform: uppercase;
`;

export default function JobTable() {
  const { isLoading, jobs, error } = useJobs();
  const [searchParams] = useSearchParams();

  //   1) Sort

  let sortedJobs = jobs;
  const [field, direction] = searchParams.get("sortBy")?.split("-") || [];
  const modifier = direction === "asc" ? 1 : -1;

  if (field || direction)
    sortedJobs = jobs?.slice().sort((a, b) => {
      if (typeof a[field] === "number" && typeof b[field] === "number") {
        return (a[field] - b[field]) * modifier;
      }
      return direction === "asc"
        ? a[field]?.toLowerCase() < b[field]?.toLowerCase()
          ? -1
          : 1
        : a[field]?.toLowerCase() < b[field]?.toLowerCase()
        ? 1
        : -1;
      // return direction === "asc"
      //   ? a[field]?.toLowerCase().localeCompare(b[field]?.toLowerCase())
      //   : b[field]?.toLowerCase().localeCompare(a[field]?.toLowerCase());
    });

  //   console.log(sortedJobs);

  // const headerColumns =
  //   jobs?.length > 0 &&
  //   Object.keys(jobs?.[0])?.filter((el) =>
  //     el === "id" ||
  //     el === "created_at" ||
  //     el === "startDate" ||
  //     el === "endDate"
  //       ? false
  //       : true
  //   );

  const headerColumns = [
    "title",
    "type",
    "salary",
    "experience",
    "status",
    "benefit",
  ];
  console.log(headerColumns);

  if (isLoading) return <Spinner />;
  return (
    <Menus>
      <Table columns="1.8fr 1fr 1fr 1.2fr 1fr 1.4fr .4fr">
        <Table.Header>
          <ColumnMenus>
            {headerColumns.map((column) => (
              <ColumnMenus.Menu key={column}>
                <ColumnMenus.Toggle opens={column}>
                  <HeaderColumnName>{column}</HeaderColumnName>
                  <span>
                    {field === column ? (
                      direction === "asc" ? (
                        <HiArrowUp />
                      ) : (
                        <HiArrowDown />
                      )
                    ) : (
                      <HiChevronUpDown />
                    )}
                  </span>
                </ColumnMenus.Toggle>

                <ColumnMenus.List windowName={column}>
                  <ColumnMenus.Button
                    icon={<HiArrowDown />}
                    sortBy={{ label: column, direction: "asc" }}
                  >
                    Asc
                  </ColumnMenus.Button>
                  <ColumnMenus.Button
                    icon={<HiArrowUp />}
                    sortBy={{ label: column, direction: "desc" }}
                  >
                    Desc
                  </ColumnMenus.Button>
                  <ColumnMenus.Button
                    icon={<HiXMark />}
                    sortBy={{ label: column, direction: "clear" }}
                  >
                    Clear
                  </ColumnMenus.Button>
                </ColumnMenus.List>
              </ColumnMenus.Menu>
            ))}

            <div></div>
          </ColumnMenus>
        </Table.Header>

        <Table.Body
          data={sortedJobs}
          render={(job) => <JobRow key={job.id} job={job} />}
        />
      </Table>
    </Menus>
  );
}
