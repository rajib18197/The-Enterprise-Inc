import { useSearchParams } from "react-router-dom";

export function useFilterHomes(homes) {
  console.log(homes);
  const [searchParams] = useSearchParams();
  if (!homes) return [];
  // if(!homes)
  // filters

  // 1) beds, bedrooms, baths
  let obj = {};
  const filterBeds = searchParams.get("beds");
  const filterBedRooms = searchParams.get("bedrooms");
  const filterBaths = searchParams.get("bathrooms");

  if (filterBeds) {
    obj.numBeds = Number(filterBeds);
  }

  if (filterBedRooms) obj.numBedrooms = Number(filterBedRooms);
  if (filterBaths) obj.numBaths = Number(filterBaths);

  let filters = homes.filter((home) => {
    const keys = Object.keys(obj);
    const mapp = keys.map((key) => {
      return home[key] === obj[key];
    });

    if (mapp.includes(false)) return false;

    return true;
  });

  console.log(filters);

  // 2) types
  const filterTypes = searchParams.get("types")
    ? searchParams.get("types").split(",")
    : undefined;
  console.log(filterTypes);

  let filterTypesApartments;
  if (!filterTypes) filterTypesApartments = filters;

  if (filterTypes) {
    filterTypesApartments = filters.filter((home) => {
      return filterTypes.includes(home.type.toLowerCase());
    });
  }

  console.log(filterTypesApartments);

  // 3) Amenities
  const amenitiesEssentials = searchParams.get("essentials")
    ? searchParams.get("essentials").split(",")
    : [];

  console.log(amenitiesEssentials);

  let filterAmenitiesEssentials;
  if (amenitiesEssentials.length === 0)
    filterAmenitiesEssentials = filterTypesApartments;

  if (amenitiesEssentials.length > 0) {
    filterAmenitiesEssentials = filterTypesApartments.filter((apart) => {
      const arr = amenitiesEssentials.map((essen) =>
        apart.amenities?.essentials
          .map((el) => el.toLowerCase())
          .includes(essen.toLowerCase())
      );
      console.log(
        arr,
        arr.includes(false || undefined),
        arr.includes(false || undefined) ? null : apart
      );
      return arr.includes(false) || arr.includes(undefined) ? null : apart;
    });
  }

  console.log(filterAmenitiesEssentials);

  const amenitiesFeatures = searchParams.get("features")
    ? searchParams.get("features").split(",")
    : [];

  console.log(amenitiesFeatures);
  let filterAmenitiesFeatures;
  if (amenitiesFeatures.length === 0)
    filterAmenitiesFeatures = filterAmenitiesEssentials;

  if (amenitiesFeatures.length > 0) {
    filterAmenitiesFeatures = filterAmenitiesEssentials.filter((apart) => {
      const arr = amenitiesFeatures.map((feature) =>
        apart.amenities.features
          ?.map((el) => el.toLowerCase())
          .includes(feature.toLowerCase())
      );
      return arr.includes(false) || arr.includes(undefined) ? false : apart;
    });
  }

  console.log(filterAmenitiesFeatures);

  const amenitiesLocations = searchParams.get("location")
    ? searchParams.get("location").split(",")
    : [];
  console.log(amenitiesLocations);

  let filterAmenitiesLocation;

  if (amenitiesLocations.length === 0)
    filterAmenitiesLocation = filterAmenitiesFeatures;
  if (amenitiesLocations.length > 0) {
    filterAmenitiesLocation = filterAmenitiesFeatures.filter((apart) => {
      const arr = amenitiesLocations.map((location) =>
        apart.amenities.location
          ?.map((el) => el.toLowerCase())
          .includes(location.toLowerCase())
      );

      return arr.includes(false) || arr.includes(undefined) ? null : apart;
    });
  }

  const amenitiesSafety = searchParams.get("safety")
    ? searchParams.get("safety").split(",")
    : [];

  let filterAmenitiesSafety;

  if (amenitiesSafety.length === 0)
    filterAmenitiesSafety = filterAmenitiesLocation;

  if (amenitiesSafety.length > 0) {
    filterAmenitiesSafety = filterAmenitiesLocation.filter((apart) => {
      const arr = amenitiesSafety.map((safety) =>
        apart.amenities.safety
          ?.map((el) => el.toLowerCase())
          .includes(safety.toLowerCase())
      );

      return arr.includes(false) || arr.includes(undefined) ? false : apart;
    });
  }

  console.log(filterAmenitiesSafety);

  return filterAmenitiesSafety;
}
