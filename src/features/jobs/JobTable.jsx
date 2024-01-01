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
import Table, { TableContainer } from "../../ui/Table";
import ColumnMenus from "../../ui/ColumnMenus";
import { useSearchParams } from "react-router-dom";
import Error from "../../ui/Error";

const HeaderColumnName = styled.span`
  font-size: 1.6rem;
  letter-spacing: 0.75px;
  font-weight: 500;
  text-transform: uppercase;
`;

export default function JobTable({ searchValue = "" }) {
  const { isPending, jobs, error } = useJobs({ searchValue });

  const [searchParams] = useSearchParams();

  if (isPending) return <Spinner />;

  if (error)
    return <Error msg={"Jobs Could not be loaded! Try again later."} />;

  // 1) Filters

  // Filter - 1.1
  const filterValue = searchParams.get("status") || "all";
  let filteredJobs = jobs;
  if (filterValue === "all") filteredJobs = jobs;
  if (filterValue === "active")
    filteredJobs = jobs.filter((job) => job.status === "active");
  if (filterValue === "done")
    filteredJobs = jobs.filter((job) => job.status === "done");

  // Filter - 1.2
  let filteredJobsExtend = filteredJobs;

  const filterValueRaw = searchParams.get("experience-salaryrange")
    ? searchParams.get("experience-salaryrange").split("-")
    : "all";

  const filterValueExpSalary =
    filterValueRaw !== "all"
      ? {
          experience: filterValueRaw[0],
          salaryRange: {
            min: Number(filterValueRaw[1].split("to")[0]),
            max: Number(filterValueRaw[1].split("to")[1]),
          },
        }
      : filterValueRaw;

  if (filterValueExpSalary === "all") filteredJobsExtend = filteredJobs;

  if (filterValueExpSalary !== "all")
    filteredJobsExtend = filteredJobs.filter((job) => {
      return (
        job.experience === filterValueExpSalary.experience &&
        (job.salary >= filterValueExpSalary.salaryRange.min ||
          job.salary <= filterValueExpSalary.salaryRange.max)
      );
    });

  // 2) Sorting
  let sortedJobs = filteredJobsExtend;
  const [field, direction] = searchParams.get("sortBy")?.split("-") || [];
  const modifier = direction === "asc" ? 1 : -1;

  if (field || direction)
    sortedJobs = filteredJobsExtend?.slice().sort((a, b) => {
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

  const headerColumns = [
    "title",
    "type",
    "salary",
    "experience",
    "status",
    "benefit",
  ];

  return (
    <Menus>
      <TableContainer>
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
            render={(job, i) => <JobRow key={job.id} job={job} />}
          />
        </Table>
      </TableContainer>
    </Menus>
  );
}
