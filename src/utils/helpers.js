// import { formatDistance, parseISO } from "date-fns";
// import { differenceInDays } from "date-fns/esm";

// // We want to make this function work for both Date objects and strings (which come from Supabase)
// export const subtractDates = (dateStr1, dateStr2) =>
//   differenceInDays(parseISO(String(dateStr1)), parseISO(String(dateStr2)));

// export const formatDistanceFromNow = (dateStr) =>
//   formatDistance(parseISO(dateStr), new Date(), {
//     addSuffix: true,
//   })
//     .replace("about ", "")
//     .replace("in", "In");

// // Supabase needs an ISO date string. However, that string will be different on every render because the MS or SEC have changed, which isn't good. So we use this trick to remove any time
export const getToday = function (options = {}) {
  const today = new Date();

  // This is necessary to compare with created_at from Supabase, because it it not at 0.0.0.0, so we need to set the date to be END of the day when we compare it with earlier dates
  if (options?.end)
    // Set to the last second of the day
    today.setUTCHours(23, 59, 59, 999);
  else today.setUTCHours(0, 0, 0, 0);
  return today.toISOString();
};

// export const formatCurrency = (value) =>
//   new Intl.NumberFormat("en", { style: "currency", currency: "USD" }).format(
//     value
//   );

export const transformer = function (arr, option) {
  const transformedArr = arr.reduce((acc, cur) => {
    const values = acc?.map((el) => el.value);
    if (values?.includes(cur[option])) {
      return acc;
    }

    return [
      ...acc,
      {
        value: cur[option],
        label:
          cur[option].split("-").join(" ")[0].toUpperCase() +
          cur[option].split("-").join(" ").slice(1),
      },
    ];
  }, []);

  return transformedArr;
};

export function isToday(date) {
  const today = new Date();
  if (today.toDateString() === date.toDateString()) return true;
  return false;
}

export function formatDate(date, weekday) {
  console.log(date, weekday);
  const formatted = date.toLocaleDateString("en-us", {
    // Don't forget to add a specific value to variable because simply placing "weekday" is not enough
    ...((weekday === "short" || weekday === "long") && { weekday: weekday }),
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return formatted;
}

export function formatDistance(date1, date2) {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  // console.log(d1);
  // console.log(d2);

  const d1Day = d1.getDate();
  const d1Month = d1.getMonth() + 1;
  const d1Year = d1.getFullYear();

  const d2Day = d2.getDate();
  const d2Month = d2.getMonth() + 1;
  const d2Year = d2.getFullYear();

  // console.log(d1Day, d1Month, d1Year);
  // console.log(d2Day, d2Month, d2Year);

  const newD1 = new Date(`${d1Month}/${d1Day}/${d1Year}`);
  const newD2 = new Date(`${d2Month}/${d2Day}/${d2Year}`);

  // console.log(newD1, newD2);
  const diffTime = Math.abs(newD2 - newD1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  // console.log(diffTime + " milliseconds");
  // console.log(diffDays + " days");
  return diffDays;
}
