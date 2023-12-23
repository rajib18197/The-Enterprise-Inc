import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Select from "../../ui/Select";
import { useCreateJob } from "./useCreateJob";
import { useUpdateJob } from "./useUpdateJob";
import { useJobs } from "./useJobs";
import { transformer } from "../../utils/helpers";
import { useForm } from "react-hook-form";

const statusOptions = [
  { value: "active", label: "Active" },
  { value: "done", label: "Done" },
];

export default function CreateJobForm({ jobToUpdate = {}, onCloseModal }) {
  const isUpdateSession = Boolean(jobToUpdate?.id);
  // console.log(jobToUpdate);
  const { jobs } = useJobs();
  // console.log(jobs);

  const { register, handleSubmit, reset, formState, getValues } = useForm({
    defaultValues: isUpdateSession
      ? {
          ...jobToUpdate,
          startDate: jobToUpdate?.startDate?.slice(
            0,
            jobToUpdate.startDate.indexOf("T")
          ),
          endDate: jobToUpdate?.endDate?.slice(
            0,
            jobToUpdate.startDate.indexOf("T")
          ),
        }
      : {},
  });

  const { errors } = formState;

  const typeOptions = transformer(jobs, "type");
  const experienceOptions = transformer(jobs, "experience");
  const benfitsOptions = transformer(jobs, "benefit");

  // console.log(typeOptions);
  // console.log(experienceOptions);
  // console.log(benfitsOptions);

  const { isCreating, createJob, isError } = useCreateJob();
  const { updateJob, isUpdating } = useUpdateJob();

  // console.log(isCreating, isUpdating, isUpdateSession);

  function onSubmit(data) {
    if (isUpdateSession) {
      updateJob(
        {
          id: jobToUpdate.id,
          data,
        },
        {
          onSuccess: () => {
            onCloseModal();
          },
        }
      );
      return;
    }

    createJob(data, {
      onSettled: () => {
        onCloseModal();
      },
    });
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "modal" : "regular"}
      scrolling="true"
    >
      <FormRow label={"Job Title"} error={errors?.title?.message}>
        <Input
          type="text"
          name="title"
          {...register("title", {
            required: "This Field is required",
          })}
        />
      </FormRow>
      <FormRow label={"Job Type"} error={errors?.type?.message}>
        <Select
          options={typeOptions}
          {...register("type", {
            required: "This Field is required",
          })}
        />
      </FormRow>
      <FormRow label={"Salary"} error={errors?.salary?.message}>
        <Input
          type="number"
          {...register("salary", {
            required: "This Field is required",
            min: {
              value: 1,
              message: "Salary should be at least 1",
            },
          })}
        />
      </FormRow>
      <FormRow label={"Experience"} error={errors?.experience?.message}>
        <Select
          options={experienceOptions}
          {...register("experience", {
            required: "This Field is required",
          })}
        />
      </FormRow>
      <FormRow label={"Benefit"} error={errors?.benefit?.message}>
        <Select
          options={benfitsOptions}
          {...register("benefit", {
            required: "This Field is required",
          })}
        />
      </FormRow>

      <FormRow label={"Status"} error={errors?.status?.message}>
        <Select
          options={statusOptions}
          {...register("status", {
            required: "This Field is required",
          })}
        />
      </FormRow>

      <FormRow label="Start Date" error={errors?.startDate?.message}>
        <Input
          type="date"
          {...register("startDate", {
            required: "This Field is required",
          })}
        />
      </FormRow>

      <FormRow label="End Date" error={errors?.endDate?.message}>
        <Input
          type="date"
          {...register("endDate", {
            required: "This Field is required",
          })}
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
