import { useState } from "react";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import useUser from "./useUser";
import { useUpdateUserData } from "./useUpdateUserData";
import SpinnerMini from "../../ui/SpinnerMini";
import styled from "styled-components";
import Heading from "../../ui/Heading";
import Section from "../../ui/Section";
import Spinner from "../../ui/Spinner";
import ContainerBox from "../../ui/ContainerBox";

const UpdateUserData = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default function UpdateUserDataForm() {
  const {
    user: { email } = {},
    user: { user_metadata: { fullName } = {} } = {},
    isLoading: isUserAccountLoading,
  } = useUser();

  const [updateFullName, setUpdateFullName] = useState(fullName);
  const [avatar, setAvatar] = useState(null);

  const { updateUser, isLoading } = useUpdateUserData();

  if (isUserAccountLoading) return <Spinner />;

  function handleSubmit(e) {
    e.preventDefault();
    if (!updateFullName) return;
    updateUser({ fullName: updateFullName, avatar });
  }

  const Header = (
    <>
      <Heading as="h3">Update User Data</Heading>
      <FormRow orientation="horizontal">
        <Button disabled={isLoading}>Cancel</Button>
        <Button disabled={isLoading} onClick={handleSubmit}>
          {isLoading ? <SpinnerMini /> : "Update Account"}
        </Button>
      </FormRow>
    </>
  );

  return (
    <ContainerBox>
      <Section header={Header}>
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
          <input type="submit" value="button" hidden />
        </Form>
      </Section>
    </ContainerBox>
  );
}
