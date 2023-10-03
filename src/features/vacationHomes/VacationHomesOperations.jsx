import Filter from "../../ui/Filter";
import Modal from "../../ui/Modal";
import ComplexFiltersHomes from "./ComplexFiltersHomes";
import styles from "./VacationHomesOperations.module.css";

const options = [
  { value: "all", label: "All" },
  { value: "cabins", label: "Cabins" },
  { value: "amazing-views", label: "Amazing views" },
  { value: "domes", label: "Domes" },
  { value: "farms", label: "Farms" },
  { value: "design", label: "Design" },
  { value: "mansions", label: "Mansions" },
  { value: "creative spaces", label: "Creative spaces" },
  { value: "treehouses", label: "TreeHouses" },
  { value: "treehouse", label: "TreeHouse" },
];

export default function VacationHomesOperations() {
  return (
    <div className={styles.operations}>
      <Filter filterFields="homesAttribute" options={options} />
      <Modal>
        <Modal.Open opens="complex-filter">
          <button className={styles.btn}>Filters</button>
        </Modal.Open>
        <Modal.Window windowName="complex-filter">
          <ComplexFiltersHomes />
        </Modal.Window>
      </Modal>
    </div>
  );
}
