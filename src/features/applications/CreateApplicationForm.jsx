import { useState } from "react";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Select from "../../ui/Select";
import { useCandidates, useJobs } from "../jobs/useJobs";
import { useCreateApplication } from "./useCreateApplication";
import Checkbox from "../../ui/Checkbox";
import { useUpdateApplication } from "./useUpdateApplication";
import { SUPABASE_URL } from "../../services/supabase";
import Input from "../../ui/Input";
import { useForm } from "react-hook-form";

const transformer = function (obj, name, email) {
  // const str = `${obj[name].toLowerCase().split(' ').join('-')}-${obj[email].toLowerCase()}`
  const str = `${obj[name]}-${obj[email]}`;
  return str;
};

const experiences = [
  { value: "junior", label: "Junior" },
  { value: "senior", label: "Senior" },
  { value: "mid-level", label: "Mid level" },
];

const statusOptions = [
  { value: "under-review", label: "under review" },
  { value: "interviewing", label: "Interviewing" },
  { value: "selected", label: "selected" },
];

export default function CreateApplicationForm({
  applicationToUpdate = {},
  onCloseModal,
}) {
  const isUpdateSession = Boolean(applicationToUpdate?.id);
  console.log(applicationToUpdate);

  const { jobs, isLoading, error: jobError } = useJobs();
  const { candidates, isLoading: isCandidatesLoading, error } = useCandidates();

  const { createApplication, isCreating } = useCreateApplication();
  const { updateApplication, isUpdating } = useUpdateApplication();

  const { register, handleSubmit, reset, formState, getValues } = useForm({
    defaultValues: isUpdateSession
      ? {
          ...applicationToUpdate,
          jobTitle: applicationToUpdate?.jobs?.id,
          candidate: applicationToUpdate?.candidates?.id,
          status: statusOptions.find(
            (opt) => opt.value === applicationToUpdate.status
          ).value,
          submittedDate: applicationToUpdate?.submittedDate?.slice(
            0,
            applicationToUpdate.submittedDate.indexOf("T")
          ),
          specialMention: applicationToUpdate?.specialAttribute,
          resume: applicationToUpdate?.resume,
          experience: experiences.find(
            (exp) => exp.value === applicationToUpdate.experience
          ).value,
          hasEdTechExperience: applicationToUpdate.hasEdTechExperience,
          salaryExpectation: applicationToUpdate.salaryExpectation,
        }
      : {},
  });

  const { errors } = formState;
  console.log(formState);

  if (isLoading || isCandidatesLoading) return <h2>Loading</h2>;

  const titleOptions = jobs.map((job) => ({
    value: job.id,
    label: job.title,
  }));

  const candidateOptions = candidates.map((candidate) => ({
    value: candidate.id,
    label: `${candidate.fullName}-${candidate.email}`,
  }));

  function onSubmit(data) {
    console.log(data, applicationToUpdate.submittedDate);

    if (isUpdateSession) {
      console.log(isUpdateSession);
      updateApplication(
        {
          id: applicationToUpdate.id,
          newData: {
            jobId: Number(data.jobTitle),
            candidateId: Number(data.candidate),
            submittedDate: data?.submittedDate + "T00:00:00",
            resume: data.resume,
            experience: data.experience,
            status: data.status,
            specialAttribute: data.specialMention.split(" ").join("-"),
            hasExtraRound: applicationToUpdate.hasExtraRound,
            salaryExpectation: data.salaryExpectation,
            hasEdTechExperience: applicationToUpdate.hasEdTechExperience,
          },
        },
        {
          onSuccess: () => {
            onCloseModal();
            reset();
          },
        }
      );

      return;
    }

    createApplication(
      {
        jobId: Number(data.jobTitle),
        candidateId: Number(data.candidate),
        submittedDate: data?.submittedDate + "T00:00:00",
        resume: data.resume[0],
        experience: data.experience,
        status: data.status,
        specialAttribute: data.specialMention.split(" ").join("-"),
        hasExtraRound: false,
        observations: "text",
        salaryExpectation: data.salaryExpectation,
        hasEdTechExperience: true, // TODO:
      },
      {
        onSuccess: () => {
          reset();
          onCloseModal();
        },
      }
    );
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "modal" : "regular"}
      scrolling="true"
    >
      <FormRow label="Job" error={errors?.jobTitle?.message}>
        <Select
          options={titleOptions}
          {...register("jobTitle", {
            required: "This field is required",
          })}
          label={"JobTitle"}
        />
      </FormRow>

      <FormRow label="Candidate" error={errors?.candidate?.message}>
        <Select
          options={candidateOptions}
          {...register("candidate", {
            required: "This field is required",
          })}
          label={"Candidate"}
        />
      </FormRow>

      <FormRow label="Submission Date" error={errors?.submittedDate?.message}>
        <Input
          type="date"
          {...register("submittedDate", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Status" error={errors?.status?.message}>
        <Select
          options={statusOptions}
          {...register("status", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Special Mention" error={errors?.specialMention?.message}>
        <Input
          type="text"
          {...register("specialMention", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Resume" error={errors?.resume?.message}>
        <FileInput
          accept="application/pdf"
          {...register("resume", {
            required: isUpdateSession ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Experience" error={errors?.experience?.message}>
        <Select
          options={experiences}
          {...register("experience", {
            required: "This field is required",
          })}
          label={"Experience"}
        />
      </FormRow>

      {/* <FormRow label="Ed-Tech Experience">
        <Checkbox
          id="edtech"
          ref={register("hasEdTechExperience", {
            required: "This field is required",
          })}
        >
          Ed-Tech Experience
        </Checkbox>
      </FormRow> */}

      <FormRow
        label="salary expectation"
        error={errors?.salaryExpectation?.message}
      >
        <Input
          type="number"
          {...register("salaryExpectation", {
            required: "This field is required",
            min: {
              value: 1,
              message: "value should be at lease 1",
            },
          })}
        />
      </FormRow>

      <FormRow>
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button>
          {isCreating && !isUpdating && !isUpdateSession && "Creating"}
          {isUpdating && !isCreating && isUpdateSession && "Updating"}
          {!isCreating &&
            !isUpdating &&
            !isUpdateSession &&
            "Create New Application"}
          {!isCreating &&
            !isUpdating &&
            isUpdateSession &&
            "Update Application"}
        </Button>
      </FormRow>
    </Form>
  );
}
