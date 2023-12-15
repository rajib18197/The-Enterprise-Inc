import { NavLink } from "react-router-dom";
import styled from "styled-components";

import {
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlineUsers,
} from "react-icons/hi2";
import DarkModeToggle from "./DarkModeToggle";

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* height: 100%; */
`;
const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  // gap: 0.8rem;

  @media (max-width: 60em) {
    flex-direction: row;
  }
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    color: var(--color-grey-600);
    // background-color: var(--color-grey-200);

    // border-radius: 4px;
    // border-left: 4px solid var(--color-brand-600);
    // border-bottom-left-radius: 100px;

    font-size: 1.2rem;
    font-weight: 600;
    // padding: .4rem;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;

    @media (max-width: 60rem) {
      flex-direction: row;
      justify-content: start;
      align-items: center;
      /* background-color: #f1b8a3; */
      line-height: 1;
    }

    @media (max-width: 38em) {
      flex-direction: column;
    }
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-200);
    /* background-color: var(--color-green-700); */
    /* color: var(--color-grey-100); */
    // border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.1rem;
    height: 2.1rem;
    color: var(--color-brand-600);
    // border-radius: 50%;
    // padding: 2rem;
    /* background-color: var(--color-brand-600); */
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;

function MainNav() {
  return (
    <Nav>
      <NavList>
        <li>
          <StyledNavLink to="/dashboard">
            <HiOutlineHome />
            <span>Dashboard</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/applications">
            <HiOutlineCalendarDays />
            <span>Applications</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/jobs">
            <HiOutlineHomeModern />
            <span>Jobs</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/users">
            <HiOutlineUsers />
            <span>Users</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/account">
            <HiOutlineUsers />
            <span>Account</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/settings">
            <HiOutlineCog6Tooth />
            <span>Settings</span>
          </StyledNavLink>
        </li>
      </NavList>
    </Nav>
  );
}

export default MainNav;
