import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import useSetting from "./useSetting";
import { useUpdateSetting } from "./useUpdateSetting";

export default function UpdateSettingForm() {
  const {
    setting: [
      { maxDuration, minDuration, performanceRatings, extraRound } = {},
    ] = [],
    isLoading,
  } = useSetting();
  const { updateSetting, isLoading: isUpdating } = useUpdateSetting();

  if (isLoading) return <Spinner />;

  function handleBlur(e) {
    console.log({[e.target.name]: e.target.value});
    updateSetting({
      [e.target.name]: e.target.name.startsWith("extra")
        ? e.target.value
        : Number(e.target.value),
    });
  }

  return (
    <Form>
      <FormRow label="Extra Round">
        <Input
          type="text"
          id="extra-round"
          name="extraRound"
          defaultValue={extraRound}
          onBlur={handleBlur}
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow label="Minimum Duration/Round">
        <Input
          type="number"
          id="min-duration"
          name="minDuration"
          defaultValue={minDuration}
          onBlur={handleBlur}
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow label="Maximum Duration/Round">
        <Input
          type="number"
          id="max-duration"
          name="maxDuration"
          defaultValue={maxDuration}
          onBlur={handleBlur}
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow label="Performance Rating">
        <Input
          type="number"
          id="rating"
          name="performanceRatings"
          defaultValue={performanceRatings}
          onBlur={handleBlur}
          disabled={isUpdating}
        />
      </FormRow>
    </Form>
  );
}
