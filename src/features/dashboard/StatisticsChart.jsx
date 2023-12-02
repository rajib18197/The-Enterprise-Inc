import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import styled from "styled-components";
import Filter from "../../ui/Filter";
import Select from "../../ui/Select";
import SelectedFilter from "../../ui/SelectedFilter";
import { useSearchParams } from "react-router-dom";
import { useJobs } from "../jobs/useJobs";
import Spinner from "../../ui/Spinner";
import { useApplications } from "../applications/useApplications";
import { useRecentJobs } from "./useRecentJobs";
import { useRecentApplications } from "./useRecentApplications";

const ChartBox = styled.div`
  /* Box */
  background-color: var(--color-grey-200);
  background-color: #ffe4e6;
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 2.4rem 3.2rem;
  grid-column: 2 / -1;
  grid-row: 1 / span 1;

  & > *:first-child {
    margin-bottom: 1.6rem;
  }

  & .recharts-pie-label-text {
    font-weight: 600;
  }
`;

const FilterBox = styled.div`
  background-color: orange;
`;

const startDataLight = [
  {
    statName: "Job Post",
    value: 12,
    color: "#ef4444",
  },
  {
    statName: "Total Application",
    value: 23,
    color: "#f97316",
  },
  {
    statName: "Selected",
    value: 6,
    color: "#eab308",
  },
  {
    statName: "Under-review",
    value: 10,
    color: "#84cc16",
  },
  {
    statName: "Interviewing",
    value: 7,
    color: "#22c55e",
  },
];

// const stats = [{
//     jobPost: 12,
//     totalApplication: 23,
//     selected:
// }]

const JobList = [
  { value: "frontend-engineer", label: "Frontend Engineer" },
  { value: "solution-architect", label: "Solution Architect" },
  { value: "backend-engineer", label: "Backend Engineer" },
  { value: "lead-software-architect", label: "Lead Software Architect" },
  { value: "uiux-engineer", label: "UI/UX Engineer" },
  { value: "software-engineer", label: "Software Engineer" },
  { value: "devops-engineer", label: "DevOps Engineer" },
];

export default function StatisticsChart({ jobs, applications }) {
  const [searchParams] = useSearchParams();
  // const { data: jobs, isLoading } = useRecentJobs();
  // const { data: applications, isPending } = useRecentApplications();

  // if (isLoading || isPending) return <Spinner />;

  console.log(applications);
  const jobType = searchParams.get("jobtype") || JobList.at(0).value;

  const allJobTitles = jobs.reduce((acc, cur) => {
    const jobs = acc.map((el) => el);
    // if (jobs.includes(cur.title.split(" ").join("-").toLowerCase())) {
    if (jobs.includes(cur.id)) {
    } else {
      //   acc.push(cur.title.split(" ").join("-").toLowerCase());
      acc.push(cur.id);
    }

    return acc;
  }, []);

  const totalApplications = applications?.reduce(
    (acc, cur) => {
      if (cur.jobs.title.split(" ").join("-").toLowerCase() === jobType) {
        acc.statName = "Total Application";
        acc.value += 1;
        acc.color = "#f97316";
      }

      return acc;
    },
    { statName: "Total Application", value: 0, color: "#f97316" }
  );

  console.log(allJobTitles);
  console.log(totalApplications);

  const selectedApplication = applications?.reduce(
    (acc, cur) => {
      if (
        cur.jobs.title.split(" ").join("-").toLowerCase() === jobType &&
        cur.status === "selected"
      ) {
        acc.statName = "Selected";
        acc.value += 1;
        acc.color = "#eab308";
      }

      return acc;
    },
    { statName: "Selected", value: 0, color: "#eab308" }
  );

  const underReviewApplication = applications?.reduce(
    (acc, cur) => {
      if (
        cur.jobs.title.split(" ").join("-").toLowerCase() === jobType &&
        cur.status === "under-review"
      ) {
        acc.statName = "Under-review";
        acc.value += 1;
        acc.color = "#84cc16";
      }

      return acc;
    },
    { statName: "Under-review", value: 0, color: "#84cc16" }
  );

  const interviewingApplication = applications?.reduce(
    (acc, cur) => {
      if (
        cur.jobs.title.split(" ").join("-").toLowerCase() === jobType &&
        cur.status === "interviewing"
      ) {
        acc.statName = "Interviewing";
        acc.value += 1;
        acc.color = "#22c55e";
      }

      return acc;
    },
    { statName: "Interviewing", value: 0, color: "#22c55e" }
  );

  console.log(selectedApplication);
  console.log(underReviewApplication);
  console.log(interviewingApplication);

  const totalJobPost = jobs?.reduce(
    (acc, cur) => {
      if (jobType === cur.title.split(" ").join("-").toLowerCase()) {
        acc.statName = "Job Post";
        acc.value += 1;
        acc.color = "#ef4444";
      }

      return acc;
    },
    { statName: "Job Post", value: 0, color: "#ef4444" }
  );

  console.log(totalJobPost);

  const data = [
    { ...totalJobPost },
    { ...totalApplications },
    { ...selectedApplication },
    { ...underReviewApplication },
    { ...interviewingApplication },
  ];

  const selectedValue = searchParams.get("jobtype") || JobList.at(0).value;
  //   const data = startDataLight;
  console.log(data);

  return (
    <ChartBox>
      {/* <Filter options={JobList} /> */}
      <SelectedFilter field={"jobtype"} options={JobList} />
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={data}
            nameKey={"statName"}
            dataKey={"value"}
            innerRadius={85}
            outerRadius={110}
            cx="40%"
            cy="50%"
            paddingAngle={3}
          >
            {data.map((entry) => (
              <Cell
                fill={entry.color}
                stroke={entry.color}
                key={entry.statName}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            verticalAlign="middle"
            align="right"
            width={"30%"}
            layout="vertical"
            iconSize={15}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartBox>
  );
}
