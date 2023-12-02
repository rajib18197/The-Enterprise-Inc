import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useUpdateUserData } from "./useUpdateUserData";
import SpinnerMini from "../../ui/SpinnerMini";

export default function UpdatePasswordForm() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { updateUser, isLoading } = useUpdateUserData();

  function handleSubmit(e) {
    e.preventDefault();
    console.log();
    if (!newPassword || !confirmPassword) return;
    if (newPassword !== confirmPassword) return;
    updateUser({ password: newPassword });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="New Password (Min 8 Chars)">
        <Input
          type="password"
          id="password"
          name="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          disabled={isLoading}
        />
      </FormRow>

      <FormRow label="Confirm Password">
        <Input
          type="password"
          id="confirm-password"
          name="confirm-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          disabled={isLoading}
        />
      </FormRow>

      <FormRow>
        <Button>Cancel</Button>
        <Button disabled={isLoading}>
          {isLoading ? <SpinnerMini /> : "Update Password"}
        </Button>
      </FormRow>
    </Form>
  );
}
