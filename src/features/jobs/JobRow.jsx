import styled from "styled-components";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import {
  HiEllipsisVertical,
  HiPencilSquare,
  HiSquare2Stack,
  HiTrash,
} from "react-icons/hi2";
import Modal from "../../ui/Modal";
import CreateJobForm from "./CreateJobForm";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteJob } from "./useDeleteJob";
import { useCreateJob } from "./useCreateJob";

const Job = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  text-transform: capitalize;
`;
const Type = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  text-transform: capitalize;
`;
const Salary = styled.div`
  font-weight: 600;
`;
const Experience = styled.div`
  font-weight: 500;
  color: var(--color-green-700);
  text-transform: capitalize;
`;

const Status = styled.div`
  font-weight: 500;
  color: var(--color-green-700);
  text-transform: capitalize;
`;

const Benefit = styled.div`
  font-weight: 500;
  color: var(--color-green-700);
  text-transform: capitalize;
`;

export default function JobRow({ job }) {
  const { id, title, type, salary, experience, status, benefit } = job;
  const { deleteJob, isDeleting } = useDeleteJob();
  const { createJob, isCreating } = useCreateJob();

  return (
    <Table.Row>
      <Job>{title}</Job>
      <Type>{type}</Type>
      <Salary>${salary}</Salary>
      <Experience>{experience}</Experience>
      <Status>{status}</Status>
      <Benefit>{benefit}</Benefit>
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle opens={id}>
              <HiEllipsisVertical />
            </Menus.Toggle>
            <Menus.List windowName={id}>
              <Menus.Button
                icon={<HiSquare2Stack />}
                onClick={() =>
                  createJob({ title, type, salary, experience, benefit })
                }
              >
                Duplicate
              </Menus.Button>

              <Modal.Open opens="update">
                <Menus.Button icon={<HiPencilSquare />}>Update</Menus.Button>
              </Modal.Open>

              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>
          </Menus.Menu>
          <Modal.Window windowName="update">
            <CreateJobForm jobToUpdate={job} />
          </Modal.Window>

          <Modal.Window windowName="delete">
            <ConfirmDelete
              resource={title}
              onConfirm={() => deleteJob(id)}
              disabled={isDeleting}
            />
          </Modal.Window>
        </Modal>
      </div>
    </Table.Row>
  );
}

// total Interviews - total selections
