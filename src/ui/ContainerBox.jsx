import styled from "styled-components";

const StyledContainerBox = styled.div`
  //   margin-top: -1.5rem;
  padding: 3rem 2rem;
  box-shadow: 0 0 0 transparent, 0 0 0 transparent,
    0 0 3rem rgba(76, 103, 150, 0.3);
  border: 4px solid orangered;
  border-radius: 0.6rem;
`;

const Box = styled.div`
  display: grid;
  place-content: center;
  /* grid-template-columns: repeat(2, 1fr); */
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

export default function ContainerBox({ children }) {
  return (
    <StyledContainerBox>
      <Box>{children}</Box>
    </StyledContainerBox>
  );
}
