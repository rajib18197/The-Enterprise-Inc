import { useSearchParams } from "react-router-dom";
import Button from "../ui/Button";
import Heading from "../ui/Heading";

const combined = [
  { experience: "junior", salaryExpectationRange: { min: 1000, max: 1999 } },
  { experience: "junior", salaryExpectationRange: { min: 2000, max: 2999 } },
  { experience: "junior", salaryExpectationRange: { min: 3000 } },
  {
    experience: "mid-level",
    salaryExpectationRange: { min: 3500, max: 4999 },
  },
  {
    experience: "mid-level",
    salaryExpectationRange: { min: 5000, max: 5999 },
  },
  { experience: "mid-level", salaryExpectationRange: { min: 6000 } },
  { experience: "senior", salaryExpectationRange: { min: 7000, max: 7900 } },
  { experience: "senior", salaryExpectationRange: { min: 8000, max: 9999 } },
  { experience: "senior", salaryExpectationRange: { min: 10000 } },
];

export default function Filters() {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleClick({ experience, range }) {
    let experienceList = [
      ...(searchParams.get("experience")?.split(",") || []),
      // experience,
    ];
    let rangeList = [
      ...(searchParams.get("range")?.split(",") || []),
      // `${range.max ? `${range.min}-${range.max}` : `${range.min}plus`}`,
    ];

    let remove = false;

    for (let [i, el] of experienceList.entries()) {
      console.log(
        el,
        rangeList[i],
        `${range.max ? `${range.min}-${range.max}` : `${range.min}plus`}`
      );
      const isExp = el === experience;
      const isRange =
        rangeList[i] ===
        `${range.max ? `${range.min}-${range.max}` : `${range.min}plus`}`;
      if (isExp && isRange) {
        experienceList = experienceList.filter(
          (exp, ind) => !(ind === i && exp === el)
        );
        rangeList = rangeList.filter((range) => range !== rangeList[i]);
        remove = true;
        break;
      }
    }

    if (!remove) {
      experienceList.push(experience);
      rangeList.push(
        `${range.max ? `${range.min}-${range.max}` : `${range.min}plus`}`
      );
    }

    console.log(experienceList, rangeList);
    searchParams.set("experience", experienceList);
    if (experienceList.length === 0 && rangeList.length === 0) {
      searchParams.delete("experience");
      searchParams.delete("range");
    } else {
      if (range.max) {
        // const rangeList = [
        //   ...(searchParams.get("range")?.split(",") || []),
        //   `${range.min}-${range.max}`,
        // ];

        searchParams.set("range", rangeList);
      } else {
        // const rangeList = [
        //   ...(searchParams.get("range")?.split(",") || []),
        //   `${range.min}plus`,
        // ];
        searchParams.set("range", rangeList);
      }
    }

    setSearchParams(searchParams);
  }

  return (
    <div>
      <Heading>Salary Expectation Range</Heading>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "2rem",
        }}
      >
        {combined.map((expRange) => (
          <Button
            key={`${expRange.experience}-${expRange.salaryExpectationRange.min}`}
            onClick={() =>
              handleClick({
                experience: expRange.experience,
                range: expRange.salaryExpectationRange,
              })
            }
          >
            {expRange.experience} (
            {expRange.salaryExpectationRange.max
              ? `${expRange.salaryExpectationRange.min}- ${expRange.salaryExpectationRange.max}`
              : `${expRange.salaryExpectationRange.min}+`}
            )
          </Button>
        ))}
      </div>
    </div>
  );
}
