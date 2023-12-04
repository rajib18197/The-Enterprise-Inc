import styled from "styled-components";

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default function Section({ header, children }) {
  return (
    <StyledSection>
      <Header>{header}</Header>
      {children}
    </StyledSection>
  );
}
