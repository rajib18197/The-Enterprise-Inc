import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm";
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

export default function Account() {
  return (
    <>
      <Heading as="h1">Update your Account</Heading>
      <Row>
        <UpdateUserDataForm />
      </Row>

      <Row>
        <UpdatePasswordForm />
      </Row>
    </>
  );
}
