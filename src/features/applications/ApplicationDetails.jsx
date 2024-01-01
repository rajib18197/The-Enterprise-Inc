import {
  HiAcademicCap,
  HiAdjustmentsHorizontal,
  HiCurrencyEuro,
  HiExclamationTriangle,
  HiFlag,
  HiOutlineCheckCircle,
} from "react-icons/hi2";
import styled, { css } from "styled-components";
import DataItem from "../../ui/DataItem";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import DetailsHeader from "./DetailsHeader";
import { useApplicationDetails } from "./useApplicationDetails";
import Spinner from "../../ui/Spinner";
import { formatDate } from "../../utils/helpers";
import { Flag } from "../../ui/Flag";
import { useNavigate } from "react-router-dom";
import ObservationBox from "../../ui/ObservationBox";
import { Fragment } from "react";

const StyledApplicationDetails = styled.div`
  //   margin-top: -1.5rem;
  padding: 3rem 2rem;
  box-shadow: 0 0 0 transparent, 0 0 0 transparent,
    0 0 3rem rgba(76, 103, 150, 0.3);
  border: 4px solid orangered;
  border-radius: 0.6rem;
`;

const DetailsBox = styled.div`
  display: grid;
  place-content: center;
  grid-template-columns: repeat(2, 1fr);
  //   grid-template-columns: 1.2fr 1.2fr;
  background-color: var(--color-grey-200);
  /* background-color: #e2e8f0; */
  padding: 2rem;
  row-gap: 6rem;
  column-gap: 2rem;
  border-radius: 0.8rem;
  /******************
 Responsiveness
******************/
  //932px
  @media screen and (max-width: 58.25em) {
    grid-template-columns: 1fr;
    row-gap: 4rem;
  }
`;

const JobDescription = styled.div`
  display: flex;
  gap: 1.5rem;
  //   grid-template-columns: repeat(3, 1fr);
  align-items: center;
  grid-row: 1 / span 1;
  grid-column: 1 / -1;
  //   gap: 2rem;
  /******************
 Responsiveness
******************/
  //550px
  @media screen and (max-width: 34.37em) {
    // grid-template-columns: 1fr;
  }
`;

const CandidateDescription = styled.div`
  display: grid;
  //   grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  align-items: center;
  grid-row: 2 / span 1;
  grid-column: 2 / -1;
`;

const Heading = styled.h2`
  font-size: 2rem;
  ${(props) =>
    props.size === "small" &&
    css`
      font-size: 1.6rem;
    `}
  font-weight: 600;
  text-transform: uppercase;
  background-image: linear-gradient(
    to right,
    #4ade80,
    #3b86f6,
    rgba(74, 212, 128, 0)
  );
  width: max-content;
  padding: 0 1rem;
  border-radius: 0.2rem;
`;

const Type = styled.p`
  display: inline-block;
  border-radius: 0.2rem;
  font-weight: 600;
  color: #f5f5f5;
  width: max-content;
  font-size: 1.3rem;
  ${(props) =>
    props.bgColor !== "none" &&
    css`
      font-size: 1.2rem;
      text-transform: uppercase;
      padding: 0.4rem 0.8rem;
      background-color: #51cf66;
      color: #333;
    `}
`;

const Salary = styled.p`
  display: inline-block;
  font-size: 1.2rem;
  border-radius: 10rem;
  text-transform: uppercase;
  font-weight: 600;
  color: #333;
  width: max-content;
  padding: 0.4rem 0.8rem;
  background-color: #51cf66;
  //   justify-self: end;
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.3rem;
  padding: 1rem;
  background-color: var(--color-silver-700);
  background-color: var(--color-brand-600);
  color: white;
  border-radius: 4px;
`;

const PDFView = styled.embed`
  width: 110rem;
  height: 80vh;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-track {
    border-radius: 4px;
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--color-brand-700);
    border-radius: 4px;
  }
`;
const Resume = styled.div`
  justify-self: end;
`;

export default function ApplicationDetails() {
  const { applicationDetails, isLoading, isError } = useApplicationDetails();
  console.log(applicationDetails);

  const {
    id: applicationId,
    hasEdTechExperience,
    experience,
    observations,
    resume,
    salaryExpectation,
    specialAttribute,
    hasExtraRound,
    status,
    submittedDate,
    jobs: { title, type, salary, startDate, endDate } = {},
    candidates: { countryFlag, fullName, email, nationality, nationalId } = {},
  } = applicationDetails || {};

  console.log(applicationDetails);

  console.log(observations);
  const TransformObservations = observations?.split("<br />").map((el, i) => (
    <Fragment key={i}>
      {el}
      <br />
    </Fragment>
  ));
  const naviagate = useNavigate();

  if (isLoading) return <Spinner />;
  if (!isLoading && isError)
    return <h2>Error Occured while fetching the details.</h2>;

  return (
    <>
      <DetailsHeader id={applicationId} status={status} />
      <StyledApplicationDetails>
        <DetailsBox>
          <JobDescription>
            <Heading as="h2">{title}</Heading>
            <span>&bull;</span>
            <Type>{type}</Type>
            <span>&bull;</span>
            <p>
              {formatDate(new Date(startDate), "short")} —{" "}
              {formatDate(new Date(endDate), "short")} (
              {formatDate(new Date(submittedDate), "short")})
            </p>
            <span>&bull;</span>
            <Salary>{salary} Euro</Salary>
            <span>&bull;</span>
            <Resume>
              <Modal>
                <Modal.Open opens="resume">
                  <Button size="small">Resume</Button>
                </Modal.Open>
                <Modal.Window windowName="resume">
                  <PDFView src={resume} />
                </Modal.Window>
              </Modal>
            </Resume>
          </JobDescription>

          <CandidateDescription>
            <Box>
              <Heading size="small">{fullName}</Heading>
              <Type bgColor="none">{email}</Type>
              <DataItem>NID {nationalId}</DataItem>
            </Box>
            <Box>
              <DataItem>
                <Flag src={countryFlag} alt={`Flag of ${nationality}`} />
                {nationality}
              </DataItem>

              <DataItem icon={<HiOutlineCheckCircle />} label={"Extra round"}>
                {hasExtraRound ? "Yes" : "No"}
              </DataItem>

              <DataItem icon={<HiCurrencyEuro />} label="Aim">
                {salaryExpectation}
              </DataItem>
            </Box>
            <Box>
              <DataItem icon={<HiAcademicCap />} label={specialAttribute} />
              <DataItem
                icon={<HiOutlineCheckCircle />}
                label="EdTech Experience?"
              >
                {hasEdTechExperience ? "Yes" : "No"}
              </DataItem>
              <DataItem icon={<HiAdjustmentsHorizontal />} label={experience} />
            </Box>
          </CandidateDescription>

          <ObservationBox text={TransformObservations} />
        </DetailsBox>
      </StyledApplicationDetails>
    </>
  );
}
