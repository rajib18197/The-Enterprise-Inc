import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import styled from "styled-components";
import SelectedFilter from "../../ui/SelectedFilter";
import { useSearchParams } from "react-router-dom";

const ChartBox = styled.div`
  box-shadow: var(--shadow-xl);
  border-radius: var(--border-radius-md);

  padding: 2.4rem 3.2rem;

  & > *:first-child {
    margin-bottom: 1.6rem;
  }

  & .recharts-pie-label-text {
    font-weight: 600;
  }
`;

const JobList = [
  { value: "backend-engineer", label: "Backend Engineer" },
  { value: "frontend-engineer", label: "Frontend Engineer" },
  { value: "solution-architect", label: "Solution Architect" },
  { value: "lead-software-architect", label: "Lead Software Architect" },
  { value: "uiux-engineer", label: "UI/UX Engineer" },
  { value: "software-engineer", label: "Software Engineer" },
  { value: "devops-engineer", label: "DevOps Engineer" },
];

export default function StatisticsChart({ jobs, applications }) {
  const [searchParams] = useSearchParams();
  const jobType = searchParams.get("jobtype") || JobList.at(0).value;

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

  // console.log(totalJobPost);

  const data = [
    { ...totalJobPost },
    { ...totalApplications },
    { ...selectedApplication },
    { ...underReviewApplication },
    { ...interviewingApplication },
  ];

  // const selectedValue = searchParams.get("jobtype") || JobList.at(0).value;

  return (
    <ChartBox>
      <SelectedFilter
        field={"jobtype"}
        options={JobList}
        includeHiddenElement={false}
      />

      <ResponsiveContainer height={300} width="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="4" />
          <XAxis dataKey="statName" />
          <YAxis unit="#" />
          <Tooltip />
          <Bar dataKey="value" fill="#FF5722" />
        </BarChart>
      </ResponsiveContainer>
    </ChartBox>
  );
}
