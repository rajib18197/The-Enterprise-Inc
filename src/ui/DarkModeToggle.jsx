import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import styled from "styled-components";

import { useTheme } from "../context/ThemeContext";

// const Toggle = styled.div`
//   background-color: red;
//   // display: flex;
//   padding: 1.2rem 2.4rem;
//   // flex-direction: column;
//   // gap: 1rem;
//   // align-items: center;
//   // justify-content: center;
//   // font-weight: 600;
//   // width: 100%;
// `;

// const Box = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 1rem;
//   align-items: center;
//   justify-content: center;
//   font-weight: 600;
//   width: 100%;
// `;

const ToggleButton = styled.button`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
  justify-content: center;
  width: 100%;
  // height: 100%;
  font-size: 1.2rem;
  padding: 1.5rem 2.4rem;
  text-transform: uppercase;
  font-weight: 600;
  text-align: center;
  border: none;
  outline: none;
  border-radius: var(--border-radius-sm);

  color: #160d0d;
  /* background-image: linear-gradient(to right bottom, #2998ff, #5643fa); */

  & svg {
    width: 2.1rem;
    height: 2.1rem;
  }
  &:hover {
    background-color: var(--color-grey-200);
  }

  &:focus {
    outline: none;
  }
`;

export default function DarkModeToggle() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <ToggleButton onClick={toggleTheme}>
      {isDarkMode ? <HiOutlineMoon /> : <HiOutlineSun />}
      <span>{isDarkMode ? "Dark" : "light"}</span>
    </ToggleButton>
  );
}
