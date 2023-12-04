import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Select from "../../ui/Select";
import { useCreateJob } from "./useCreateJob";
import { useUpdateJob } from "./useUpdateJob";
import { useJobs } from "./useJobs";
import { transformer } from "../../utils/helpers";

const statusOptions = [
  { value: "active", label: "Active" },
  { value: "done", label: "Done" },
];

export default function CreateJobForm({ jobToUpdate = {}, onCloseModal }) {
  const isUpdateSession = Boolean(jobToUpdate?.id);
  console.log(isUpdateSession);
  console.log(jobToUpdate);
  const { jobs } = useJobs();
  console.log(jobs);

  const [title, setTitle] = useState(jobToUpdate?.title || "");
  const [type, setType] = useState(jobToUpdate?.type || "");
  const [salary, setSalary] = useState(jobToUpdate?.salary || "");
  const [experience, setExperience] = useState(jobToUpdate?.experience || "");
  const [benefit, setBenefit] = useState(jobToUpdate?.benefit || "");
  const [status, setStatus] = useState(jobToUpdate?.status || "");
  const [startDate, setStartDate] = useState(
    jobToUpdate?.startDate?.slice(0, jobToUpdate.startDate.indexOf("T")) || ""
  );
  const [endDate, setEndDate] = useState(
    jobToUpdate?.endDate?.slice(0, jobToUpdate.startDate.indexOf("T")) || ""
  );

  const typeOptions = transformer(jobs, "type");
  const experienceOptions = transformer(jobs, "experience");
  const benfitsOptions = transformer(jobs, "benefit");

  console.log(typeOptions);
  console.log(experienceOptions);
  console.log(benfitsOptions);

  const { isCreating, createJob, isError } = useCreateJob();
  const { updateJob, isUpdating } = useUpdateJob();
  console.log(isCreating, isUpdating, isUpdateSession);

  console.log(title, type, salary, experience, benefit, startDate, endDate);

  function handleSubmit(e) {
    e.preventDefault();
    if (isUpdateSession) {
      updateJob(
        {
          id: jobToUpdate.id,
          data: {
            title,
            type,
            salary,
            experience,
            benefit,
            status,
            startDate,
            endDate,
          },
        },
        {
          onSuccess: () => {
            onCloseModal();
          },
        }
      );
      return;
    }

    createJob(
      { title, type, salary, experience, benefit, status, startDate, endDate },
      {
        onSettled: () => {
          onCloseModal();
        },
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit} type={onCloseModal ? "modal" : "regular"}>
      <FormRow label={"Job Title"}>
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </FormRow>
      <FormRow label={"Job Type"}>
        <Select
          options={typeOptions}
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
      </FormRow>
      <FormRow label={"Salary"}>
        <Input
          type="number"
          value={salary}
          onChange={(e) => setSalary(Number(e.target.value))}
        />
      </FormRow>
      <FormRow label={"Experience"}>
        <Select
          options={experienceOptions}
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
        />
      </FormRow>
      <FormRow label={"Benefit"}>
        <Select
          options={benfitsOptions}
          value={benefit}
          onChange={(e) => setBenefit(e.target.value)}
        />
      </FormRow>

      <FormRow label={"Status"}>
        <Select
          options={statusOptions}
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
      </FormRow>

      <FormRow label="Start Date">
        <Input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </FormRow>

      <FormRow label="End Date">
        <Input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isCreating}>
          {isCreating && !isUpdating && !isUpdateSession && "Creating"}
          {isUpdating && !isCreating && isUpdateSession && "Updating"}
          {!isCreating && !isUpdating && !isUpdateSession && "Create New Job"}
          {!isCreating && !isUpdating && isUpdateSession && "Update Job"}
        </Button>
      </FormRow>
    </Form>
  );
}
