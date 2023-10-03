import { useState } from "react";
import Modal from "./Modal";

export default function Search() {
  const [isSearchOptionsOpen, setIsSearchOptionsOpen] = useState(false);

  return (
    <div>
      {!isSearchOptionsOpen && (
        <div onClick={() => setIsSearchOptionsOpen(true)}>
          <div>
            <h3>Anywhere</h3>
          </div>
          <div>
            <h3>Any Week</h3>
          </div>
          <div>
            <h3>Add Guests</h3>
          </div>
          <div>
            <button>search</button>
          </div>
        </div>
      )}

      {isSearchOptionsOpen && (
        <>
          <div>
            <h2>Stays</h2>
          </div>
          <div>
            <Modal>
              <Modal.Open opens="where" type="active">
                <button>where</button>
              </Modal.Open>
              <Modal.Window windowName="where">
                where window is open now!
              </Modal.Window>

              <Modal.Open opens="who">
                <button>who</button>
              </Modal.Open>
              <Modal.Window windowName="who">
                Who window is open!!!!!!!
              </Modal.Window>
            </Modal>
          </div>
        </>
      )}
    </div>
  );
}
