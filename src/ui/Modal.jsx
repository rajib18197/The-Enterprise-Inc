import {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styles from "./Modal.module.css";

const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState("");

  const open = setOpenName;
  const close = () => setOpenName("");
  // console.log("re-rendering");

  return (
    <ModalContext.Provider value={{ openName, open, close }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ opens, children, type }) {
  const { open } = useContext(ModalContext);

  return (
    <span>
      {/* {cloneElement(<></>, { onClick: () => open(opens) }, ...children)} */}
      {/* here event first stated occurs here and then when the handler update the state then entire Modal is re-rendered again. then in the Window function effect is called and remove the first callback in the clean up and then enter in the side-effect, then set another click event in the document, now the tricky part starts to happen which is since first event still haven't bubbling so that event starts bubbling phase and although we already remove the first callback when first event occurs but in between we also attach another event and therefore when bubbling that handlers are found and the handlers then called and this consequeces close the modal window. 
      
      but if we starts listen to capture phase then when the first event occurs in the complex filter button then as the click event in the document is in the capture phase so therefor that handlers will execute first then complex filter button event handlers will execute and change the "openName" state and re-render happens then in the Window function effect cleanup is going to remove that first event listener of the Window function click event and then enter to the side effect and set another new event listener to the document which listenCapture is also true and therefore now in this time as the complex event button will starts to bubble but as there is no handlers in the bubbling phase then everything will be happens as expected.
      
      so much trickyness in this context. glad I am figure that out.
      */}
      {cloneElement(children, { onClick: () => open(opens) })}
    </span>
  );
}

function Window({ children, windowName }) {
  const { openName, close } = useContext(ModalContext);
  const refModal = useRef();
  // console.log(openName || "hello", refModal.current, 1111);

  useEffect(() => {
    // console.log("use effect called", Math.random() * 6);

    function callback(e) {
      // console.log(openName, refModal.current, e.eventPhase, e.target);
      // event-bubbling happens after react re-renders and commit the changes of dom elements in browser
      // but event capturing happens before react re-renders
      if (refModal.current && !refModal.current.contains(e.target)) {
        console.log("close the modal window!");
        close();
      }
    }

    // function test(e) {
    //   console.log(e.target, e.eventPhase);
    //   console.log("test");
    // }

    document.addEventListener("click", callback, true);
    // document.addEventListener("click", test);

    return () => {
      // console.log(22222);
      document.removeEventListener("click", callback, true);
      // document.removeEventListener("click", test);
    };
  }, [close]);

  if (openName !== windowName) return null;

  // console.log(refModal.current);
  return createPortal(
    <div className={styles.overlay}>
      <div ref={refModal} className={styles.modal}>
        <button onClick={close} className={styles.btn}>
          <HiXMark />
        </button>

        {children}
      </div>
    </div>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
