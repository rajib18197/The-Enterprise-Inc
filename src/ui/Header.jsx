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
  padding: 1.2rem 3.4rem;
  border-radius: var(--border-radius-lm);

  grid-row: 1 / span 1;
  grid-column: 2 / -1;
  display: flex;
  gap: 2.4rem;
  height: 11vh;
  align-items: center;
  justify-content: space-between;
`;

const Menu = styled.div`
  display: flex;
  gap: 5rem;
  align-items: center;
  /* background-color: rgba(255, 255, 255, 0.1); */
  ${(props) =>
    props.darkmode === "true"
      ? css`
          /* background: linear-gradient(to right bottom, #ddd6f3, #faaca8);
          background: linear-gradient(to right bottom, #2998ff, #5643fa);
          background-image: linear-gradient(to right bottom, #ff3366, #ba265d); */
          /* background-color: #101d38; */
        `
      : css`
          /* background: linear-gradient(to right bottom, #ee9ca7, #ffdde1);
          background: linear-gradient(to right bottom, #2998ff, #5643fa);
          background-image: linear-gradient(to right bottom, #ff3366, #ba265d); */
          /* background-color: #101d38; */
        `}

  backdrop-filter: blur(0.6rem);
  width: max-content;
  border-radius: 100px;
  padding: 0.2rem 2rem;
  z-index: 100;

  & > *:first-child {
    margin-right: auto;
  }
`;

const BrandName = styled.div`
  display: grid;
  grid-template-columns: max-content max-content max-content;
  gap: 3rem;
  align-items: center;

  /* justify-items: center; */
  /* background-color: aliceblue; */
  //   align-content: center;
  /* width: 50%; */
  /* margin: -0.4rem auto 0; */
  //   background-color: orangered;

  &::after,
  &::before {
    content: "";
    width: 75px;
    height: 3px;
    background-color: var(--color-brand-600);
  }
`;

function Header() {
  const { isDarkMode } = useTheme();
  // console.log(isDarkMode);

  return (
    <StyledHeader>
      <BrandName>
        <Heading as="h4">The Enterprise Inc.</Heading>
      </BrandName>
      <Menu darkmode={isDarkMode ? "true" : "false"}>
        <UserAvatar />
        {/* <div>
          <Logout />
        </div> */}
      </Menu>
    </StyledHeader>
  );
}

export default Header;
