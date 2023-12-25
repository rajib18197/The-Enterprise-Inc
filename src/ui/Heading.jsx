import styled, { css } from "styled-components";

const Heading = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 3rem;
      font-weight: 600;
      color: #e11d48;
    `}

  ${(props) =>
    props.as === "h1" &&
    props.showOnSmall === "false" &&
    css`
      @media (max-width: 38rem) {
        display: none;
      }
    `}
    
  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 2.7rem;
      font-weight: 600;
      color: #e11d48;
    `}
    
    ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 2rem;
      font-weight: 500;
      color: #e11d48;
    `}

    ${(props) =>
    props.as === "h4" &&
    css`
      font-size: 4rem;
      font-weight: 500;
      font-family: "Josefin Sans", sans-serif;
      /* color: #e11d48; */

      @media (max-width: 60em) {
        font-size: 3rem;
      }
    `}
    ${(props) =>
    props.as === "h5" &&
    css`
      font-size: 4rem;
      font-weight: 500;
      font-family: "Josefin Sans", sans-serif;
      color: #352e30;
      /* border-top: 2px solid white;
      padding: 1rem;
      border-bottom: 2px solid white; */
      text-align: center;
      width: 45rem;
      text-transform: capitalize;
      display: flex;
      justify-content: center;
      align-items: center;
    `}
    
  line-height: 1.4;
`;

export default Heading;
