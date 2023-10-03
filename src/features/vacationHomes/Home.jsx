import { useDispatch } from "react-redux";
import styles from "./Home.module.css";
import {
  ImUsers,
  ImLocation,
  ImMeter,
  ImCoinEuro,
  ImHeart,
} from "react-icons/im";
import { focusedHome, removeFocused } from "./homesSlice";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function Home({ home }) {
  const {
    id,
    name,
    images,
    address,
    numBedrooms,
    price,
    startDate,
    endDate,
    ratings,
  } = home;
  const dispatch = useDispatch();

  function handleMouseEnter() {
    dispatch(focusedHome(home));
  }

  function handleMouseLeave() {
    dispatch(removeFocused());
  }

  return (
    <div
      className={styles.home}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img src={images[0]} alt="" className={styles.homeImg} />
      <span className={styles.homeHeart}>
        <ImHeart />
      </span>
      <h5 className={styles.homeName}>{name}</h5>
      <div className={styles.homeLocation}>
        <span>
          <ImLocation />
        </span>
        <p>
          {address} <span className={styles.ratings}>(★ {ratings})</span>
        </p>
      </div>

      <div className={styles.homeRooms}>
        <span>
          <ImUsers />
        </span>

        <p>{numBedrooms} Rooms</p>
      </div>

      <div className={styles.homeArea}>
        <span>
          <ImMeter />
        </span>
        <p>
          {months[new Date(startDate).getMonth()]}{" "}
          {new Date(startDate).getDate()} -{" "}
          {months[new Date(endDate).getMonth()]} {new Date(endDate).getDate()}
        </p>
      </div>

      <div className={styles.homePrice}>
        <span>
          <ImCoinEuro />
        </span>
        <p>€{price} night</p>
      </div>
      <button className={`${styles.btn} ${styles.homeBtn}`}>
        Contact Realtor
      </button>
    </div>
  );
}
