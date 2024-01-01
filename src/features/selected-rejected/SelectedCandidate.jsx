import styled, { css } from "styled-components";
import Button from "../../ui/Button";
import Checkbox from "../../ui/Checkbox";
import Heading from "../../ui/Heading";

import DetailsHeader from "../applications/DetailsHeader";
import { useEffect, useState } from "react";
import { useApplicationDetails } from "../applications/useApplicationDetails";
import Spinner from "../../ui/Spinner";
import useSelected from "./useSelected";
import useSetting from "../settings/useSetting";
import StarRating from "../../ui/StarRating";
import Modal from "../../ui/Modal";
import { useParams } from "react-router-dom";
import Observation from "../../ui/Observation";

const StyledRemarks = styled.div`
  display: grid;
  gap: 1rem;
`;

const Stacked = styled.div`
  grid-column: ${(props) => (props.type === "full" ? "1 / -1" : "")};
  grid-column: ${(props) => (props.type === "last" ? "2 / -1" : "")};
  display: flex;
  flex-direction: ${(props) =>
    props.variation === "vertical" ? "column" : "row"};
  gap: 2.8rem;
  box-shadow: 0 0 0 transparent, 0 0 0 transparent,
    0 0 3rem rgba(76, 103, 150, 0.3);
  //   background-color: var(--color-yellow-700);
  //   background-color: ${(props) => props.color};
  padding: 2rem;
  border-radius: 4px;

  //   & span:first-child {
  //     font-weight: 500;
  //   }

  //   & span:last-child {
  //     color: var(--color-grey-500);
  //     font-size: 1.2rem;
  //   }
`;

const InfoText = styled.h2`
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
export default function SelectedCandidate() {
  const { id } = useParams();

  const [hasExtraRound, setHasExtraRound] = useState(false);

  const [hasSelected, setHasSelected] = useState(false);
  const [rating, setRating] = useState(0);
  const [observations, setObservations] = useState("");

  const { applicationDetails, isLoading } = useApplicationDetails();
  const { setting, isLoading: isLoadingSetting } = useSetting();
  const { selected, isSelecting } = useSelected();
  console.log(isSelecting);

  useEffect(
    function () {
      if (applicationDetails?.status === "selected") {
        setHasSelected(true);
      }
    },
    [applicationDetails]
  );
  if (isLoading || isLoadingSetting) return <Spinner />;

  function handleSelected() {
    if (!hasSelected) return;
    console.log(rating);
    console.log(observations);
    if (hasExtraRound) {
      selected({
        id: applicationDetails.id,
        rating,
        observations,
        addExtraRound: {
          hasExtraRound: true,
        },
      });
    } else {
      selected({
        id: applicationDetails.id,
        addExtraRound: {},
        rating,
        observations,
      });
    }
  }
  const {
    maxRounds,
    extraRound,
    maxDuration,
    totalRounds,
    performanceRatings,
  } = setting[0];

  return (
    <StyledRemarks>
      <DetailsHeader id={id} status={applicationDetails.status} />

      <Stacked>
        <InfoText size="small">
          {applicationDetails.candidates.fullName}
        </InfoText>
        <InfoText size="small">{applicationDetails.jobs.title}</InfoText>
        <Modal>
          <Modal.Open opens="resume">
            <Button size="small">Resume</Button>
          </Modal.Open>
          <Modal.Window windowName="resume">
            <PDFView src={applicationDetails.resume} />
          </Modal.Window>
        </Modal>
      </Stacked>

      <Stacked variation="vertical" type="full">
        <Heading as={"h3"}>
          Write some observations about this candidate (at max 4 sentences or
          less) &mdash; For a line break, add two blank spaces at the end of the
          line.
        </Heading>
        <Observation onSetObservations={setObservations} />
      </Stacked>

      <Stacked>
        <StarRating
          initialRating={4}
          color={"var(--color-brand-600)"}
          onSetRate={setRating}
          maxRating={performanceRatings}
          labels={[
            "Useless",
            "Useless+",
            "Poor",
            "Poor+",
            "Ok",
            "Ok+",
            "Good",
            "Good+",
            "Excellent",
            "Excellent+",
          ]}
        />
      </Stacked>

      <Stacked variation="vertical" type="full">
        {!applicationDetails.hasExtraRound && (
          <Checkbox
            checked={hasExtraRound}
            onChange={() => {
              setHasExtraRound((extra) => !extra);
              setHasSelected(false);
            }}
          >
            Want to take an extra round ({extraRound})?
          </Checkbox>
        )}
        <Checkbox
          checked={hasSelected}
          onChange={() => setHasSelected((selected) => !selected)}
          id={applicationDetails.id}
          disabled={hasSelected}
        >
          I Confirm that {applicationDetails.candidates.fullName} has passed all
          the interview rounds ({hasExtraRound ? maxRounds : totalRounds})
          (Technical Round + Live Coding {hasExtraRound && `+ ${extraRound}`}) (
          {maxDuration * (hasExtraRound ? maxRounds : 2)} Minutes) and thus got
          selected for the job.
        </Checkbox>
      </Stacked>

      <Stacked type="last">
        <Button onClick={handleSelected} disabled={!hasSelected || isSelecting}>
          {isSelecting ? "Selecting" : "Selected"}
        </Button>
      </Stacked>
    </StyledRemarks>
  );
}
