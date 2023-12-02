import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import styled from "styled-components";
import { useRecentApplications } from "./useRecentApplications";
import Spinner from "../../ui/Spinner";
import { useSearchParams } from "react-router-dom";
import { useRecentJobs } from "./useRecentJobs";

const StyledAllJobInfoChart = styled.div`
  grid-column: 1 / -1;

  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 3.2rem;

  display: flex;
  flex-direction: column;
  gap: 2.4rem;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

const jobInfo = [
  { label: "May 24", totalApplication: 4, totalJobPost: 8, totalSelected: 2 },
  { label: "May 25", totalApplication: 6, totalJobPost: 6, totalSelected: 3 },
  { label: "May 26", totalApplication: 3, totalJobPost: 2, totalSelected: 0 },
  { label: "May 27", totalApplication: 0, totalJobPost: 0, totalSelected: 0 },
  { label: "May 28", totalApplication: 7, totalJobPost: 9, totalSelected: 1 },
  { label: "May 29", totalApplication: 2, totalJobPost: 2, totalSelected: 0 },
  { label: "May 30", totalApplication: 1, totalJobPost: 1, totalSelected: 1 },
];

const colors = {
  totalJobPost: { stroke: "#4f46e5", fill: "#4f46e5" },
  totalSubmission: { stroke: "#22c55e", fill: "#22c55e" },
  totalSubmissionWithSpecial: { stroke: "#e93da7", fill: "#e911ba" },
  text: "#273146",
  background: "#fefff7",
};

export default function AllJobInfoChart() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: applications, isLoading } = useRecentApplications();
  const { data: jobs, isLoading: isJobLoading } = useRecentJobs();

  if (isLoading || isJobLoading) return <Spinner />;

  console.log(applications);
  const numDays = searchParams.get("last")
    ? Number(searchParams.get("last"))
    : 7;

  const startDate = new Date();
  startDate.setDate(startDate.getDate() - (numDays - 1));
  const endDate = new Date();

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const date = new Date();
  date.setDate(date.getDate() - numDays);

  const allDates = Array.from({ length: numDays }, (_, i) => i).map((el) => {
    date.setDate(date.getDate() + 1);
    const day = date.getDate();
    console.log(date);
    const month = months[date.getMonth()];
    const str = `${month} ${day}`;
    return str;
  });

  console.log(allDates);

  const isSameDay = function (date1, date2) {
    const r1 = new Date(date1);
    const d1 = `${months[r1.getMonth()]} ${r1.getDate()}`;
    const same = d1 === date2;
    return same;
  };

  const data = allDates.map((date) => {
    const applicationsByDate = applications.filter((app) =>
      isSameDay(app.submittedDate, date)
    );
    const applicationsBySpecialAttr = applicationsByDate.filter(
      (app) => app.specialAttribute !== ""
    );

    const jobsByDate = jobs.filter((job) => isSameDay(job.startDate, date));
    console.log(jobsByDate);
    return {
      label: date,
      totalSubmission: applicationsByDate.length,
      totalSubmissionWithSpecial: applicationsBySpecialAttr.length,
      totalJobPost: jobsByDate.length,
    };
  });

  console.log(data);
  return (
    <StyledAllJobInfoChart>
      <ResponsiveContainer height={300} width="100%">
        <AreaChart data={data}>
          <XAxis
            dataKey="label"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            unit={"#"}
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <CartesianGrid strokeDasharray={4} />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />

          <Area
            dataKey="totalJobPost"
            type="monotone"
            stroke={colors.totalJobPost.stroke}
            fill={colors.totalJobPost.fill}
            strokeWidth={2}
            name="Total Jobpost"
            unit={"#"}
          />

          <Area
            dataKey="totalSubmission"
            type="monotone"
            stroke={colors.totalSubmission.stroke}
            fill={colors.totalSubmission.fill}
            strokeWidth={2}
            name="Total Submission"
            unit="#"
          />

          <Area
            dataKey="totalSubmissionWithSpecial"
            type="monotone"
            stroke={colors.totalSubmissionWithSpecial.stroke}
            fill={colors.totalSubmissionWithSpecial.fill}
            strokeWidth={2}
            name="Total Submission (Special)"
            unit={"#"}
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledAllJobInfoChart>
  );
}
