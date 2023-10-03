import { useEffect, useState } from "react";
import Home from "./Home";
import { supabase } from "../../services/supabase";
import styles from "./Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchHomes, getHomesState } from "./homesSlice";
import { useSearchParams } from "react-router-dom";
import { useFilterHomes } from "../../hooks/useFilterHomes";
import Pagination from "../../ui/Pagination";

export default function HomesList() {
  const { homes } = useSelector(getHomesState);
  const filterHomesMany = useFilterHomes(homes);
  const dispacth = useDispatch();
  const [searchParams] = useSearchParams();
  // 1) Filter Apartments
  let filterHomes;

  if (
    !searchParams.get("homesAttribute") ||
    searchParams.get("homesAttribute") === "all"
  )
    filterHomes = filterHomesMany;
  else
    filterHomes = filterHomesMany.filter(
      (home) =>
        home.remarkableAttribute.toLowerCase().split(" ").join("-") ===
        searchParams.get("homesAttribute").toLowerCase()
    );

  console.log(filterHomes);
  useEffect(
    function () {
      if (filterHomesMany.length > 0) return;
      console.log(1);
      dispacth(fetchHomes());
      // async function getHomes() {
      //   // const { data: apartments, error } = await supabase
      //   //   .from("Apartments")
      //   //   .select("*");
      //   // console.log(apartments);
      //   // setHomes(apartments);
      //   // one image can have in many houses
      //   let { data: images, error } = await supabase
      //     .from("Images")
      //     .select("*, Apartments(*)");

      //   console.log(images);
      //   const homesData = images.reduce((acc, cur) => {
      //     const house = acc.find((el) => el.apartmentID === cur.apartmentID);

      //     if (house) {
      //       house.images = [...house.images, cur.image];
      //     } else {
      //       acc.push({
      //         ...cur.Apartments,
      //         apartmentID: cur.apartmentID,
      //         images: [cur.image],
      //       });
      //     }
      //     return acc;
      //   }, []);

      //   homesData.forEach(
      //     (home) =>
      //       (home.amenities = {
      //         // essential: [],
      //         // feature: [],
      //         // loaction: [],
      //         // safety: [],
      //       })
      //   );

      //   let { data: amenities, error: amenitiesError } = await supabase
      //     .from("Home_Amenities")
      //     .select(`*, Amenities(*), Apartments(id, name)`);

      //   console.log(amenities);

      //   // amenities.forEach(amenity => {
      //   //   homesData.forEach(home => {
      //   //     home.amenities[amenity] = [];
      //   //     })
      //   // })
      //   amenities?.forEach((amenity) => {
      //     const home = homesData.find(
      //       (home) => home.id === amenity.Apartments.id
      //     );

      //     const field = amenity.Amenities.description;
      //     const value = amenity.Amenities.name;
      //     if (home) {
      //       home.amenities = {
      //         ...home.amenities,
      //         [field]: Array.isArray(home.amenities[field])
      //           ? [...home.amenities?.[field], value]
      //           : [value],
      //       };
      //       // home.amenities[field].push(value);
      //     }
      //   });

      //   console.log(homesData);

      //   setHomes(homesData);
      // }

      // getHomes();
    },
    [dispacth]
  );

  if (!filterHomes.length) return <h3>No homes</h3>;
  return (
    <div className={styles.homesContainer}>
      <h3 className={styles.countHomes}>{filterHomes?.length} homes found</h3>
      <ul className={styles.homes}>
        {filterHomes?.map((home) => (
          <Home home={home} key={home.id} />
        ))}
      </ul>
      <div>
        <Pagination count={75} />
      </div>
    </div>
  );
}

// Features don’t make money! Products make money!

// So, it is time you market yourself not as a developer but as a money-making specialist.

// Where is the best place to do that?

// In your CV & LinkedIn profile.

// How?

// By directly relating the stuff you do with the revenue. Either by generating more sales (better website, better conversion, more money) or by reducing cost (automating processes that were in the past done by humans, expensive humans).

// That’s it
