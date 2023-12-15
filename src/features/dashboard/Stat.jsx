import styled from "styled-components";

const StyledStat = styled.div`
  border-radius: var(--border-radius-sm);
  border-left: 4px solid orangered;

  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 2rem;

  box-shadow: var(--shadow-xl);
  padding: 2rem;
  /* box-shadow: 0 0 0 transparent, 0 0 0 transparent,
    0 0 3rem rgba(76, 103, 150, 0.3); */
`;

const Icon = styled.div`
  grid-row: 1 / -1;
  height: 4rem;
  width: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  /* transform: rotate(45deg); */

  /* Make these dynamic, based on the received prop */
  background-color: var(--color-${(props) => props.color}-100);
  /* background-color: #ffa8a8; */

  & svg {
    width: 2.5rem;
    height: 2.5rem;
    color: var(--color-${(props) => props.color}-700);
  }
`;

const Title = styled.h5`
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
  margin-left: auto;
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
