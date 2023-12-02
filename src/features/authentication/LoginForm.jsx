import { useState } from "react";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import useLogin from "./useLogin";
import SpinnerMini from "../../ui/SpinnerMini";

export default function LoginForm() {
  const [email, setEmail] = useState("trott@gmail.com");
  const [password, setPassword] = useState("job1234");
  const { login, isLoading } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    login({ email, password });
  }
  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address" orientation="vertical">
        <Input
          type="email"
          id="email"
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormRow>

      <FormRow label="Password" orientation="vertical">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormRow>
      <FormRow orientation="vertical">
        <Button size="large" disabled={isLoading}>
          {isLoading ? <SpinnerMini /> : "Submit"}
        </Button>
      </FormRow>
    </Form>
  );
}
