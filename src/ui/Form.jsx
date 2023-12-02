import styled, { css } from "styled-components";

const Form = styled.form`
  ${(props) =>
    props.scrolling === 'true' &&
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

      /* Box */
      background-color: var(--color-grey-0);
      border: 1px solid var(--color-grey-100);
      border-radius: var(--border-radius-md);
    `}

  ${(props) =>
    props.type === "modal" &&
    css`
      width: 100rem;
    `}
    
  // overflow: hidden;
  font-size: 1.4rem;
`;

export default Form;
