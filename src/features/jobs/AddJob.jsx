import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateJobForm from "./CreateJobForm";

export default function AddJob() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="job-form">
          <Button>Add Job</Button>
        </Modal.Open>
        <Modal.Window windowName="job-form">
          <CreateJobForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}
