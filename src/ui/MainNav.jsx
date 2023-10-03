import SearchBox from "./SearchBox";
import styles from "./MainNav.module.css";

export default function MainNav() {
  return (
    <div className={styles.mainNav}>
      <div>
        <h3>Logo</h3>
      </div>
      <SearchBox />
      <nav>navigation</nav>
    </div>
  );
}
