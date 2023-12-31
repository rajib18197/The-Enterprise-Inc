import styled, { css } from "styled-components";

const Form = styled.form`
  ${(props) =>
    props.scrolling === "true" &&
    css`
      overflow-y: scroll;
      height: 70vh;

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
    `}
  ${(props) =>
    props.type !== "modal" &&
    css`
      padding: 2.4rem 4rem;
      width: 85rem;

      /* Box */
      background-color: var(--color-grey-0);
      border-radius: var(--border-radius-md);

      @media (max-width: 60em) {
        width: 60rem;
      }

      @media (max-width: 38em) {
        width: 50rem;
      }
    `}

  ${(props) =>
    props.type === "modal" &&
    css`
      width: 100rem;
    `}

    ${(props) =>
    props.type === "login" &&
    css`
      width: 60rem;
      border: 30px solid #8b15c2;
    `}
    
  // overflow: hidden;
  font-size: 1.4rem;
  /* box-shadow: 0 3.2rem 0 -1.8rem #f7b2b2; */
`;

export default Form;
