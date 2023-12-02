import styled from "styled-components";
import ButtonIcon from "./ButtonIcon";
import { HiOutlineMoon, HiOutlineUser } from "react-icons/hi2";
import Logout from "./Logout";

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
`;

export default function HeaderMenu() {
  return (
    <StyledHeaderMenu>
      {/* <li>
        <ButtonIcon>
          <HiOutlineUser />
        </ButtonIcon>
      </li> */}
      <li>
        <ButtonIcon>
          <HiOutlineMoon />
        </ButtonIcon>
      </li>
      <li>
        <Logout />
      </li>
    </StyledHeaderMenu>
  );
}
