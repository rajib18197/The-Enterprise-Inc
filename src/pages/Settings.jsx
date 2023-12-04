import UpdateSettingForm from "../features/settings/UpdateSettingForm";
import Heading from "../ui/Heading";

export default function Settings() {
  return (
    <>
      <Heading as="h2">Update Job Settings</Heading>
      <UpdateSettingForm />
    </>
  );
}
