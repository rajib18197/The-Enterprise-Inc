import { useSearchParams } from "react-router-dom";
import Select from "./Select";

export default function SelectedFilter({ field, options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedValue = searchParams.get(field) || "";

  function handleSelect(e) {
    searchParams.set(field, e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Select options={options} value={selectedValue} onChange={handleSelect} />
  );
}
