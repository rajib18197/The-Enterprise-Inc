import HomeMap from "../features/vacationHomes/HomeMap";
import HomesList from "../features/vacationHomes/HomesList";
import VacationHomesOperations from "../features/vacationHomes/VacationHomesOperations";
import MainNav from "../ui/MainNav";
import StarRating from "../ui/StarRating";
import styles from "./VacationHomes.module.css";

export default function HomesListing() {
  return (
    <div>
      {/* <MainNav />
      <div className={styles.vacationContainer}>
        <VacationHomesOperations />
        <main className={styles.main}>
          <HomesList />
          <HomeMap />
        </main>
      </div> */}
      <StarRating />
    </div>
  );
}
