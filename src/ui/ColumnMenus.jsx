import {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

const StyledMenu = styled.div`
  display: flex;
  align-items: center;
`;

const StyledToggle = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  padding: 0.4rem 0;
  border-radius: var(--border-radius-sm);
  /* transform: translateX(0.8rem); */
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

  left: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  /* padding: 1.2rem 2.4rem; */
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
const ColumnMenusContext = createContext();

export default function ColumnMenus({ children }) {
  const [openName, setOpenName] = useState("");
  const [position, setPosition] = useState({});
  const [sort, setSort] = useState({});

  const open = setOpenName;
  const close = () => setOpenName("");

  return (
    <ColumnMenusContext.Provider
      value={{ openName, open, close, position, setPosition, sort, setSort }}
    >
      {children}
    </ColumnMenusContext.Provider>
  );
}

function Menu({ children }) {
  return <StyledMenu>{children}</StyledMenu>;
}

function Toggle({ opens, children }) {
  const { openName, open, close, setPosition } = useContext(ColumnMenusContext);

  function handleClick(e) {
    openName !== "" || openName === opens ? close() : open(opens);
    const coords = e.target.closest("button").getBoundingClientRect();
    console.log(coords);

    setPosition({ x: coords.left, y: coords.top + coords.height });
    e.stopPropagation();
  }

  return <StyledToggle onClick={handleClick}>{children}</StyledToggle>;
}

function List({ windowName, children }) {
  const { openName, close, position } = useContext(ColumnMenusContext);
  const refEl = useRef();

  useEffect(
    function () {
      function closeColumnMenu(e) {
        if (refEl.current && !refEl.current.contains(e.target)) {
          close();
        }
      }

      document.addEventListener("click", closeColumnMenu);

      return () => document.removeEventListener("click", closeColumnMenu);
    },
    [close]
  );

  if (openName !== windowName) return null;

  return (
    <StyledList ref={refEl} position={position}>
      {children}
    </StyledList>
  );
}

function Button({ sortBy, icon, children }) {
  const { sort, setSort, close } = useContext(ColumnMenusContext);
  const [searchParams, setSearchParams] = useSearchParams();

  function handleClick() {
    if (sortBy.direction === "clear") {
      searchParams.delete("sortBy");
      setSearchParams(searchParams);
      setSort({});
      close();
      return;
    }

    if (sort.label !== sortBy.label) {
      searchParams.delete("sortBy");
      setSearchParams(searchParams);
    }

    searchParams.set("sortBy", `${sortBy.label}-${sortBy.direction}`);
    setSearchParams(searchParams);
    setSort({ label: sortBy.label, direction: sortBy.direction });
    close();
  }

  return (
    <StyledButton onClick={handleClick}>
      {icon}
      <span>{children}</span>
    </StyledButton>
  );
}

ColumnMenus.Menu = Menu;
ColumnMenus.Toggle = Toggle;
ColumnMenus.List = List;
ColumnMenus.Button = Button;
