import { useState } from "react";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import useUser from "./useUser";
import { useUpdateUserData } from "./useUpdateUserData";
import SpinnerMini from "../../ui/SpinnerMini";

export default function UpdateUserDataForm() {
  const {
    user: { email },
    user: {
      user_metadata: { fullName },
    },
  } = useUser();

  const [updateFullName, setUpdateFullName] = useState(fullName);
  const [avatar, setAvatar] = useState(null);

  const { updateUser, isLoading } = useUpdateUserData();

  function handleSubmit(e) {
    e.preventDefault();
    if (!updateFullName) return;
    updateUser({ fullName: updateFullName, avatar });
  }
  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email Address">
        <Input
          id="email"
          name="email"
          type="email"
          defaultValue={email}
          disabled
        />
      </FormRow>

      <FormRow label="Full Name">
        <Input
          id="fullName"
          name="fullName"
          type="text"
          value={updateFullName}
          onChange={(e) => setUpdateFullName(e.target.value)}
          disabled={isLoading}
        />
      </FormRow>

      <FormRow label="Avatar Image">
        <FileInput
          id="avatar"
          name="avatar"
          type="file"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files[0])}
          disabled={isLoading}
        />
      </FormRow>

      <FormRow>
        <Button disabled={isLoading}>Cancel</Button>
        <Button disabled={isLoading}>
          {isLoading ? <SpinnerMini /> : "Update Account"}
        </Button>
      </FormRow>
    </Form>
  );
}
