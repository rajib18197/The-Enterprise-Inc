import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateApplicationForm from "./CreateApplicationForm";

export default function AddApplication() {
  return (
    <div>
      <Modal>
        <Modal.Open opens={"home-form"}>
          <Button>Add Application</Button>
        </Modal.Open>
        <Modal.Window windowName={"home-form"}>
          <CreateApplicationForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}
