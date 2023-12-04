import { useState } from "react";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignup } from "./useSignup";
import Button from "../../ui/Button";
import SpinnerMini from "../../ui/SpinnerMini";
import Section from "../../ui/Section";
import Heading from "../../ui/Heading";
const INITIAL_STATE = {
  fullName: "",
  email: "",
  password: "",
  repeatPassword: "",
};

export default function SignupForm() {
  const [{ fullName, email, password, repeatPassword }, setUserInfo] =
    useState(INITIAL_STATE);
  const { signUp, isLoading } = useSignup();

  function handleChange(e) {
    setUserInfo((curInfo) => ({ ...curInfo, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    signUp({ email, password, fullName });
  }

  const Header = (
    <>
      <Heading as="h2">Create New User</Heading>
      <FormRow>
        <Button>{isLoading ? <SpinnerMini /> : "Submit"}</Button>
      </FormRow>
    </>
  );

  return (
    <Section header={Header}>
      <Form onSubmit={handleSubmit}>
        <FormRow label="Full name" orientation="horizontal">
          <Input
            type="text"
            id="fullName"
            name="fullName"
            value={fullName}
            onChange={handleChange}
          />
        </FormRow>

        <FormRow label="Email">
          <Input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </FormRow>

        <FormRow label="password">
          <Input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </FormRow>

        <FormRow label="Repeat Password">
          <Input
            type="password"
            id="repeat-password"
            name="repeatPassword"
            value={repeatPassword}
            onChange={handleChange}
          />
        </FormRow>
      </Form>
    </Section>
  );
}
