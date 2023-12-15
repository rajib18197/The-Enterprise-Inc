import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import styled from "styled-components";

import { useTheme } from "../context/ThemeContext";

const ToggleButton = styled.button`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
  justify-content: end;
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

  @media (max-width: 60rem) {
    flex-direction: row;
  }

  @media (max-width: 45em) {
    justify-content: center;
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
