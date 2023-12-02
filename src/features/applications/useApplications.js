import { useQuery } from "@tanstack/react-query";
import { getHomes } from "../../services/apiHomes";
import { getApplications } from "../../services/apiApplications";
import { useSearchParams } from "react-router-dom";

export function useHomes() {
  const {
    isPending: isLoading,
    data: homes,
    isError,
  } = useQuery({
    queryKey: ["applications"],
    queryFn: getHomes,
  });

  return { isLoading, homes, isError };
}

export function useApplications({ flag = true } = {}) {
  const [searchParams] = useSearchParams();
  const filterValues = [];
  // if(searchParams.get(''))
  for (const [key, value] of searchParams) {
    if (key.startsWith("salary") || key.startsWith("experience")) {
      filterValues.push({
        field: key.startsWith("salary")
          ? key.slice(0, key.indexOf("Range"))
          : key,
        value: value.includes("plus")
          ? value.slice(0, value.indexOf("p"))
          : value,
        method: value.includes("plus")
          ? "gte"
          : !key.startsWith("salary")
          ? "eq"
          : "gte-lte",
      });

      continue;
    }

    if (key.toLowerCase() === "type") {
      filterValues.push({
        field: key,
        value: value.split(","),
        method: "in",
        table: "foreign",
      });

      continue;
    }

    if (value === "edTechExperience") {
      filterValues.push({
        field: "hasEdTechExperience",
        value: true,
        method: "eq",
      });

      continue;
    }

    if (value === "extra-round") {
      filterValues.push({
        field: "hasExtraRound",
        value: true,
        method: "eq",
      });

      continue;
    }

    if (key === "specialAttribute" && value !== "all") {
      filterValues.push({
        field: key,
        value: value.split(","),
        method: "in",
      });
    }
  }

  console.log(filterValues);
  const filters = filterValues.length === 0 ? null : filterValues;
  console.log(filters);

  const currentPage = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : flag
    ? 1
    : undefined;

  const {
    data: { applications, count } = {},
    isPending,
    isError,
  } = useQuery({
    queryKey: ["applications", filters, currentPage],
    queryFn: () => getApplications({ filters, currentPage }),
  });

  return { isPending, applications, isError, count };
}

// for (let [field, value] of searchParams) {
//   if (field.startsWith("expectedSalary")) {
//     const [expectation, experience] = field.split("-");

//     const index = filterValues.findIndex((v) => v.field === expectation);
//     if (index !== -1) {
//       filterValues[index] = {
//         ...filterValues[index],
//         value: [
//           filterValues[index].value,
//           value.includes("plus") ? value.slice(0, value.indexOf("p")) : value,
//         ],
//         // method: value.includes('plus') ? 'rangeGte' : "in",
//         method: 'gte',
//         line: 'in',
//       };
//     } else {
//       filterValues.push({
//         field: expectation,
//         value: value.includes("plus")
//           ? value.slice(0, value.indexOf("p"))
//           : value,

//         method: value.includes("plus") ? "gte" : "eq",
//       });
//     }

//     const exIndex = filterValues.findIndex((e) => e.field === "experience");
//     console.log(exIndex);
//     if (exIndex !== -1) {
//       filterValues[exIndex] = {
//         ...filterValues[exIndex],
//         value: [filterValues[exIndex].value, experience],
//         // method: "or",
//         line: "in",
//       };
//     } else {
//       filterValues.push({ field: "experience", value: experience });
//     }
//     continue;
//   }

//   filterValues.push({
//     field,
//     value: value.includes(",") ? value?.split(",") : value,
//   });
// }

// expectedSalary-junior=3000plus&expectedSalary-senior=10000plus
