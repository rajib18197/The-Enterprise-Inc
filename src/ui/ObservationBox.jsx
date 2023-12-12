import styled from "styled-components";

const Aside = styled.div`
  padding: 2rem;
  //   grid-column:

  position: relative;
  z-index: 100;

  &::before,
  &::after {
    content: "";
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    border-radius: 50%;
    transform: translate(-50%, -50%);
  }
  &::before {
    width: 45%;
    padding-bottom: 45%;
    background-color: #fdf2e9;
    background-color: #111827;
    background-color: var(--color-grey-100);
    z-index: -2;
  }
  &::after {
    width: 30%;
    padding-bottom: 30%;
    background-color: #fae5d3;
    background-color: var(--color-silver-100);
    z-index: -1;
  }
`;

const Talk = styled.div`
  box-shadow: 0 0 0 transparent, 0 0 0 transparent,
    0 0 3rem rgba(76, 103, 150, 0.3);
  padding: 2rem;
  display: grid;
  //   grid-template-columns: 5fr 1fr;
  gap: 1rem;
  margin-bottom: 2rem;
  border-left: 4px solid orangered;
  font-size: 1.7rem;
`;

const Observation = styled.p`
  white-space: break-spaces;
  color: var(--color-grey-600);
`;

export default function ObservationBox({ text }) {
  return (
    <Aside>
      <Talk>
        <Observation>{text}</Observation>
      </Talk>
    </Aside>
  );
}
