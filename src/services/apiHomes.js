import { supabase } from "./supabase";

export async function getHomes() {
  // const { data: apartments, error } = await supabase
  //   .from("Apartments")
  //   .select("*");
  // console.log(apartments);
  // setHomes(apartments);
  // one image can have in many houses
  let { data: images, error } = await supabase
    .from("Images")
    .select("*, Apartments(*)");

  console.log(images);
  const homesData = images.reduce((acc, cur) => {
    const house = acc.find((el) => el.apartmentID === cur.apartmentID);

    if (house) {
      house.images = [...house.images, cur.image];
    } else {
      acc.push({
        ...cur.Apartments,
        apartmentID: cur.apartmentID,
        images: [cur.image],
      });
    }
    return acc;
  }, []);

  homesData.forEach(
    (home) =>
      (home.amenities = {
        // essential: [],
        // feature: [],
        // loaction: [],
        // safety: [],
      })
  );

  let { data: amenities, error: amenitiesError } = await supabase
    .from("Home_Amenities")
    .select(`*, Amenities(*), Apartments(id, name)`);

  console.log(amenities);

  // amenities.forEach(amenity => {
  //   homesData.forEach(home => {
  //     home.amenities[amenity] = [];
  //     })
  // })
  amenities?.forEach((amenity) => {
    const home = homesData.find((home) => home.id === amenity.Apartments.id);

    const field = amenity.Amenities.description;
    const value = amenity.Amenities.name;
    if (home) {
      home.amenities = {
        ...home.amenities,
        [field]: Array.isArray(home.amenities[field])
          ? [...home.amenities?.[field], value]
          : [value],
      };
      // home.amenities[field].push(value);
    }
  });

  console.log(homesData);
  return homesData;
}
