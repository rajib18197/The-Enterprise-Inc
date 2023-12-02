import styled, { css } from "styled-components";
import Logo from "./Logo";
import { UserAvatar } from "./UserAvatar";
import HeaderMenu from "./HeaderMenu";
import Heading from "./Heading";
import Logout from "./Logout";
import { HiUser } from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon";
import { useTheme } from "../context/ThemeContext";
// import HeaderMenu from "./HeaderMenu";
// import UserAvatar from "../features/authentication/UserAvatar";

const StyledHeader = styled.header`
  background-color: var(--color-grey-100);
  /* color: var(--color-grey-00); */
  // background: linear-gradient(to right top, rgba(101, 223, 201, 0.452), rgba(108, 218, 235, 0.452));
  padding: 1.2rem 3.4rem;
  border-bottom: 1px solid var(--color-grey-100);
  border-bottom: 8px solid var(--color-brand-700);
  // grid-row: 1 / span 1;
  grid-row: 1 / span 1;
  // grid-column: 1 / -1;
  grid-column: 2 / -1;
  display: flex;
  gap: 2.4rem;
  height: 7rem;
  align-items: center;
  justify-content: space-between;
  // justify-content: space-between;
`;

const Menu = styled.div`
  display: flex;
  gap: 5rem;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.1);
  ${(props) =>
    props.darkMode
      ? css`
          background: linear-gradient(to right bottom, #ddd6f3, #faaca8);
        `
      : css`
          background: linear-gradient(to right bottom, #ee9ca7, #ffdde1);
        `}

  color: #101d28;
  backdrop-filter: blur(0.6rem);
  width: max-content;
  border-radius: 100px;
  padding: 0.8rem 2rem;
  z-index: 100;

  & > *:first-child {
    margin-right: auto;
  }
`;

function Header() {
  const { isDarkMode } = useTheme();

  return (
    <StyledHeader>
      <Heading>The Enterprise Inc.</Heading>
      <Menu darkMode={isDarkMode}>
        <UserAvatar />
        <div>
          <Logout />
        </div>
      </Menu>
    </StyledHeader>
  );
}

export default Header;
