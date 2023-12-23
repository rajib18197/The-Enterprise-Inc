import styled from "styled-components";
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";
import LoginForm from "../features/authentication/LoginForm";

const LoginLayout = styled.main`
  /* min-height: 100vh; */
  height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
`;

export default function Login() {
  return (
    <LoginLayout>
      {/* <Heading as="h5">Your One Place</Heading> */}
      <Heading as="h5">Log in to your account</Heading>
      <LoginForm type="login" />
    </LoginLayout>
  );
}
