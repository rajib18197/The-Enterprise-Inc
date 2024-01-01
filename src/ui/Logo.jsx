import styled from "styled-components";

const StyledLogo = styled.div`
  text-align: center;
  border-radius: var(--border-radius-lm);
  grid-column: 1 / span 1;
  grid-row: 1 / span 1;
  background-color: var(--color-grey-100);
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 60em) {
    border-radius: 0;
  }
`;

const Img = styled.img`
  /* height: 5.2rem; */
  width: 4rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid #3d67ff;
  outline-offset: 2px;
`;

function Logo() {
  return (
    <StyledLogo>
      <Img src="/vite.svg" alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
