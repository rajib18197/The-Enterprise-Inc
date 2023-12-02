import { createContext, useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

const StyledMenu = styled.div`
  display: flex;
  align-items: center;
  // justify-content: flex-end;
`;

const StyledToggle = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-200);
  }

  & span svg {
    width: 1.8rem;
    height: 1.8rem;
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenusContext = createContext();

export default function Menus({ children }) {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState({});

  const open = setOpenId;
  const close = () => setOpenId("");

  return (
    <MenusContext.Provider
      value={{ openId, open, close, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Menu({ children }) {
  return <StyledMenu>{children}</StyledMenu>;
}

function Toggle({ opens, children }) {
  const { openId, open, close, setPosition } = useContext(MenusContext);

  function handleClick(e) {
    // openId === id || openId !== "" ? close() : open(id);
    openId === opens ? close() : open(opens);
    const targetElementCoords = e.target
      .closest("button")
      .getBoundingClientRect();
    console.log(targetElementCoords);
    console.log(e.clientX);
    setPosition({
      x: document.documentElement.clientWidth - targetElementCoords.left - targetElementCoords.width,
      // x: targetElementCoords.left,
      y: targetElementCoords.top + targetElementCoords.height,
    });

    e.stopPropagation();
  }

  return <StyledToggle onClick={handleClick}>{children}</StyledToggle>;
}

function List({ windowName, children }) {
  const { openId, open, close, position } = useContext(MenusContext);
  const refEl = useRef();

  useEffect(
    function () {
      function closeModal(e) {
        if (refEl.current && !refEl.current.contains(e.target)) {
          close();
        }
      }

      document.addEventListener("click", closeModal);

      return () => document.removeEventListener("click", closeModal);
    },
    [close]
  );

  if (windowName !== openId) return;
  console.log(position);

  return createPortal(
    <StyledList position={position} ref={refEl}>
      {children}
    </StyledList>,
    document.body
  );
}

function Button({ icon, children, onClick }) {
  const { close } = useContext(MenusContext);

  function handleClick() {
    onClick?.();
    close();
  }
  return (
    <StyledButton onClick={handleClick}>
      {icon}
      <span>{children}</span>
    </StyledButton>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;
