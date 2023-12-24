// import { useDispatch } from "react-redux";
import styled from "styled-components";
import Table from "../../ui/Table";
// import styles from "./Home.module.css";
import {
  ImUsers,
  ImLocation,
  ImMeter,
  ImCoinEuro,
  ImHeart,
} from "react-icons/im";
import Tag from "../../ui/Tag";
import Menus from "../../ui/Menus";
import { formatDate, formatDistance, isToday } from "../../utils/helpers";
import {
  HiCheckCircle,
  HiEllipsisVertical,
  HiEye,
  HiPencil,
  HiShieldExclamation,
  HiTrash,
} from "react-icons/hi2";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import { useNavigate } from "react-router-dom";
import CreateApplicationForm from "./CreateApplicationForm";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteApplication } from "./useDeleteApplication";
import { useUpdateApplication } from "./useUpdateApplication";
// import { focusedHome, removeFocused } from "./homesSlice";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const Job = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

const PDFView = styled.embed`
  width: 110rem;
  height: 80vh;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-track {
    border-radius: 4px;
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--color-brand-700);
    border-radius: 4px;
  }
`;

export default function ApplicationRow({ application }) {
  console.log(application);
  const {
    id: applicationId,
    submittedDate,
    status,
    specialAttribute,
    resume,
    candidates: { fullName, email },
    jobs: { title: jobTitle = "", startDate, endDate } = {},
  } = application;

  console.log(applicationId);
  const navigate = useNavigate();

  const { deleteApplication, isDeleting, isError } = useDeleteApplication();
  const { updateApplication, isUpdating } = useUpdateApplication();

  function handleReview() {
    updateApplication({
      id: applicationId,
      newData: { status: "under-review" },
    });
  }

  const statusToTagName = {
    selected: "indigo",
    interviewing: "green",
    "under-review": "silver",
  };

  return (
    <Table.Row>
      <Job>{jobTitle}</Job>
      <Stacked>
        <span>{fullName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>Submitted {formatDate(new Date(submittedDate))}</span>
        <span>
          (
          {`${formatDate(new Date(startDate))} - ${formatDate(
            new Date(endDate)
          )}`}
          ) &rarr; Open for {formatDistance(startDate, endDate)} days
        </span>
        {/* <span>{formatDate(new Date(endDate))}</span> */}
      </Stacked>
      <Tag type={statusToTagName[status]}>
        {status} / {specialAttribute}
      </Tag>

      <div>
        {resume ? (
          <Modal>
            <Modal.Open opens="resume">
              <Button size={"small"}>View</Button>
            </Modal.Open>
            <Modal.Window windowName="resume">
              <PDFView src={resume} />
            </Modal.Window>
          </Modal>
        ) : (
          <>&mdash;</>
        )}
      </div>
      <Modal>
        <Menus.Menu>
          <Menus.Toggle opens={applicationId}>
            <HiEllipsisVertical />
          </Menus.Toggle>
          <Menus.List windowName={applicationId}>
            <Modal.Open opens={"update-application"}>
              <Menus.Button icon={<HiPencil />}>update</Menus.Button>
            </Modal.Open>

            <Modal.Open opens={"delete-application"}>
              <Menus.Button icon={<HiTrash />}>delete</Menus.Button>
            </Modal.Open>

            <Menus.Button
              icon={<HiEye />}
              onClick={() => {
                console.log(applicationId);
                navigate(`/applications/${applicationId}`);
              }}
            >
              see Details
            </Menus.Button>

            {status === "interviewing" && (
              <Menus.Button icon={<HiCheckCircle />} onClick={handleReview}>
                under-reviewing
              </Menus.Button>
            )}

            {status === "under-review" && (
              <Menus.Button
                icon={<HiCheckCircle />}
                onClick={() => navigate(`/selected/${applicationId}`)}
              >
                select candidate
              </Menus.Button>
            )}
          </Menus.List>
        </Menus.Menu>

        <Modal.Window windowName={"update-application"}>
          <CreateApplicationForm applicationToUpdate={application} />
        </Modal.Window>

        <Modal.Window windowName={"delete-application"}>
          <ConfirmDelete
            resource={`${jobTitle}-${fullName}`}
            onConfirm={() => deleteApplication(applicationId)}
            disabled={isDeleting}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}
