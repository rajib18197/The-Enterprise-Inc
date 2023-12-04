import styled from "styled-components";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 6.2rem;
  width: 4.2rem;
`;

function Logo() {
  return (
    <StyledLogo>
      {/* <Img src="/logo-light.png" alt="Logo" /> */}
      <Img src="/vite.svg" alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
