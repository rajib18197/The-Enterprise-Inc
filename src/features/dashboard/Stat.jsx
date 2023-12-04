import styled from "styled-components";

const StyledStat = styled.div`
  /* Box */
  /* background-color: ${(props) => props.bgcolor}; */
  /* border: 1px solid var(--color-grey-100); */
  border-radius: var(--border-radius-md);

  padding: 1.6rem;
  display: grid;
  grid-template-columns: 6.4rem 1fr;
  grid-template-rows: auto auto;
  align-items: center;
  column-gap: 1.6rem;
  row-gap: 0.4rem;
  box-shadow: var(--shadow-xl);
  /* box-shadow: 0 0 0 transparent, 0 0 0 transparent,
    0 0 3rem rgba(76, 103, 150, 0.3); */
`;

const Icon = styled.div`
  grid-row: 1 / -1;
  aspect-ratio: 1;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  /* Make these dynamic, based on the received prop */
  background-color: var(--color-${(props) => props.color}-100);

  & svg {
    width: 3.2rem;
    height: 3.2rem;
    color: var(--color-${(props) => props.color}-700);
  }
`;

const Title = styled.h5`
  align-self: end;
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const Value = styled.p`
  font-size: 2.4rem;
  line-height: 1;
  font-weight: 500;
`;

export default function Stat({ stat }) {
  const { icon, title, color, value, bgcolor } = stat;

  return (
    <StyledStat bgcolor={bgcolor}>
      <Icon color={color}>{icon}</Icon>
      <Title>{title}</Title>
      <Value>{value}</Value>
    </StyledStat>
  );
}
