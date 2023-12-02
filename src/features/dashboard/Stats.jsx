import { HiOutlineBriefcase } from "react-icons/hi2";
import Stat from "./Stat";
import styled from "styled-components";

const statsData = [{}];

const StyledStats = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  & > *:last-child {
    grid-column: 1 / -1;
  }
`;

export default function Stats({ jobs, applications }) {
  const numJobPost = jobs?.length;
  const numSubmission = applications?.length;
  const numSelected = applications?.reduce((acc, cur) => {
    if (cur.status === "selected") return acc + 1;
    return acc;
  }, 0);

  return (
    <StyledStats>
      <Stat
        stat={{
          icon: <HiOutlineBriefcase />,
          color: "blue",
          title: "Total Job Post",
          value: numJobPost,
        }}
      />

      <Stat
        stat={{
          icon: <HiOutlineBriefcase />,
          color: "green",
          title: "Total Submission",
          value: numSubmission,
        }}
      />

      <Stat
        stat={{
          icon: <HiOutlineBriefcase />,
          color: "indigo",
          title: "Total Selected",
          value: numSelected,
        }}
      />
    </StyledStats>
  );
}
