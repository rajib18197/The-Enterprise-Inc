import Filter from "../../ui/Filter";

export default function DashboardFilter() {
  return (
    <>
      <Filter
        filterFields={"last"}
        options={[
          { value: "90", label: "Last 90 days" },
          { value: "30", label: "Last 30 days" },
          { value: "7", label: "Last 7 days" },
        ]}
      />
    </>
  );
}
