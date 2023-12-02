import {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import styled from "styled-components";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--backdrop-color);
  // backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

const ModalContext = createContext();

export default function Modal({ children }) {
  const [openName, setOpenName] = useState("");
  const open = setOpenName;
  const close = () => setOpenName("");

  return (
    <ModalContext.Provider value={{ openName, open, close }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ opens, children }) {
  const { openName, open, close } = useContext(ModalContext);

  function handleClick() {
    openName === "" || openName !== opens ? open(opens) : close();
  }

  return cloneElement(children, { onClick: handleClick });
}

function Window({ windowName, children }) {
  const { openName, close } = useContext(ModalContext);
  const refEl = useRef();

  useEffect(
    function () {
      function closeModal(e) {
        if (refEl.current && !refEl.current.contains(e.target)) {
          close();
        }
      }

      document.addEventListener("click", closeModal, true);
      return () => document.removeEventListener("click", closeModal, true);
    },
    [close]
  );

  if (openName !== windowName) return null;

  return (
    <Overlay>
      <StyledModal ref={refEl}>
        <Button onClick={close}>&times;</Button>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </StyledModal>
    </Overlay>
  );
}

Modal.Open = Open;
Modal.Window = Window;
