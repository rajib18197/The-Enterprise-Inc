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
    `}
    ${(props) =>
    props.as === "h5" &&
    css`
      font-size: 2rem;
      font-weight: 500;
      font-family: "Josefin Sans", sans-serif;
      /* color: #e11d48; */
    `}
    
  line-height: 1.4;
`;

export default Heading;
