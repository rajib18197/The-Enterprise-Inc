import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import { useJobs } from "../jobs/useJobs";
import AllJobInfoChart from "./AllJobInfoChart";
import StatisticsChart from "./StatisticsChart";
import Stats from "./Stats";
import { useApplications } from "../applications/useApplications";
import { useRecentJobs } from "./useRecentJobs";
import { useRecentApplications } from "./useRecentApplications";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;

  @media (max-width: 60em) {
    grid-template-columns: 1fr;
  }
`;

export default function DashboardLayout() {
  const { data: jobs, isLoading } = useRecentJobs();
  const { data: applications, isPending } = useRecentApplications();

  if (isLoading || isPending) return <Spinner />;

  console.log(jobs);
  console.log(applications);

  return (
    <StyledDashboardLayout>
      <StatisticsChart jobs={jobs} applications={applications} />
      <Stats jobs={jobs} applications={applications} />
      <AllJobInfoChart />
    </StyledDashboardLayout>
  );
}
