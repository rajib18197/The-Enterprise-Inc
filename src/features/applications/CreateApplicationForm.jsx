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
  console.log(isUpdateSession);
  console.log(applicationToUpdate);

  const { jobs, isLoading, error: jobError } = useJobs();
  const { candidates, isLoading: isCandidatesLoading, error } = useCandidates();
  // console.log(jobs);
  // console.log(candidates);

  const { createApplication, isCreating } = useCreateApplication();
  const { updateApplication, isUpdating } = useUpdateApplication();
  // console.log(applicationToUpdate?.jobs.id);
  // console.log(applicationToUpdate?.candidates.id);

  const [jobTitle, setJobTitle] = useState(applicationToUpdate?.jobs?.id || "");
  const [candidate, setCandidate] = useState(
    applicationToUpdate?.candidates?.id || ""
  );
  const [status, setStatus] = useState(() => {
    if (isUpdateSession) {
      const findStatus = statusOptions.find(
        (opt) => opt.value === applicationToUpdate.status
      );
      console.log(findStatus);
      return findStatus.value;
    }
    return "";
  });
  const [submittedDate, setSubmittedDate] = useState(
    applicationToUpdate?.submittedDate?.slice(
      0,
      applicationToUpdate.submittedDate.indexOf("T")
    ) || ""
  );
  const [specialMention, setSpecialMention] = useState(
    applicationToUpdate?.specialAttribute || ""
  );
  const [resume, setResume] = useState(applicationToUpdate?.resume && "");
  const [experience, setExperience] = useState(() => {
    if (isUpdateSession) {
      const findExperience = experiences.find(
        (exp) => exp.value === applicationToUpdate.experience
      );
      return findExperience.value;
    }

    return "";
  });
  const [hasEdTechExperience, setHasEdTechExperience] = useState(
    applicationToUpdate?.hasEdTechExperience || false
  );
  const [salaryExpectation, setSalaryExpectation] = useState(
    applicationToUpdate?.salaryExpectation || ""
  );

  if (isLoading || isCandidatesLoading) return <h2>Loading</h2>;

  const titleOptions = jobs.map((job) => ({
    value: job.id,
    label: job.title,
  }));

  console.log(submittedDate);

  const candidateOptions = candidates.map((candidate) => ({
    value: candidate.id,
    label: `${candidate.fullName}-${candidate.email}`,
  }));

  function submitHandler(e) {
    e.preventDefault();
    console.log(experience, status, specialMention, resume, candidate);

    if (isUpdateSession) {
      console.log(isUpdateSession);
      updateApplication({
        id: applicationToUpdate.id,
        newData: {
          jobId: Number(jobTitle),
          candidateId: Number(candidate),
          submittedDate,
          resume: resume === "" ? applicationToUpdate.resume : resume,
          experience,
          status,
          specialAttribute: specialMention.split(" ").join("-"),
          hasExtraRound: applicationToUpdate.hasExtraRound,
          salaryExpectation,
          hasEdTechExperience,
        },
      });

      return;
    }

    createApplication({
      jobId: Number(jobTitle),
      candidateId: Number(candidate),
      // startDate,
      // endDate,
      submittedDate,
      resume,
      status,
      experience,
      specialAttribute: specialMention.split(" ").join("-"),
      hasExtraRound: false,
      observations: "text",
      salaryExpectation,
      hasEdTechExperience,
    });
  }

  return (
    <Form
      type={onCloseModal ? "modal" : "regular"}
      scrolling="true"
      onSubmit={submitHandler}
    >
      <FormRow label="Job" error={""}>
        <Select
          options={titleOptions}
          value={jobTitle}
          label={"JobTitle"}
          onChange={(e) => setJobTitle(e.target.value)}
        />
      </FormRow>

      <FormRow label="Candidate">
        <Select
          options={candidateOptions}
          value={candidate}
          label={"Candidate"}
          onChange={(e) => setCandidate(e.target.value)}
        />
      </FormRow>

      <FormRow label="Submission Date">
        <input
          type="date"
          value={submittedDate}
          onChange={(e) => setSubmittedDate(e.target.value)}
        />
      </FormRow>

      <FormRow label="Status">
        <Select
          options={statusOptions}
          value={status}
          label={"Status"}
          onChange={(e) => setStatus(e.target.value)}
        />
      </FormRow>

      <FormRow label="Special Mention">
        <input
          type="text"
          value={specialMention}
          onChange={(e) => setSpecialMention(e.target.value)}
        />
      </FormRow>

      <FormRow label="Resume">
        <FileInput
          accept="application/pdf"
          // value={resume}
          onChange={(e) => setResume(e.target.files[0])}
        />
      </FormRow>

      <FormRow label="Experience">
        <Select
          options={experiences}
          onChange={(e) => setExperience(e.target.value)}
          value={experience}
          label={"Experience"}
        />
      </FormRow>

      <FormRow label="Ed-Tech Experience">
        <Checkbox
          id="edtech"
          checked={hasEdTechExperience}
          onChange={() => setHasEdTechExperience((edTech) => !edTech)}
        >
          Ed-Tech Experience
        </Checkbox>
      </FormRow>

      <FormRow label="salary expectation">
        <input
          type="number"
          value={salaryExpectation}
          onChange={(e) => setSalaryExpectation(Number(e.target.value))}
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
        <Button>Add</Button>
      </FormRow>
    </Form>
  );
}
