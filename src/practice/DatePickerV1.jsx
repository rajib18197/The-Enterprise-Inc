import { useState } from "react";
import "./DatePickerV1.css";

const getDateInfo = function (year) {
  const calender = {
    months: [
      {
        name: "January",
        days: 31,
        startDay: new Date(`jan, 01, ${year}`).getDay(),
      },
      {
        name: "February",
        days: [28, 29],
        startDay: new Date(`feb, 01, ${year}`).getDay(),
      },
      {
        name: "March",
        days: 31,
        startDay: new Date(`mar, 01, ${year}`).getDay(),
      },
      {
        name: "April",
        days: 30,
        startDay: new Date(`apr, 01, ${year}`).getDay(),
      },
      {
        name: "May",
        days: 31,
        startDay: new Date(`may, 01, ${year}`).getDay(),
      },
      {
        name: "June",
        days: 30,
        startDay: new Date(`jun, 01, ${year}`).getDay(),
      },
      {
        name: "July",
        days: 31,
        startDay: new Date(`jul, 01, ${year}`).getDay(),
      },
      {
        name: "August",
        days: 31,
        startDay: new Date(`aug, 01, ${year}`).getDay(),
      },
      {
        name: "September",
        days: 30,
        startDay: new Date(`sep, 01, ${year}`).getDay(),
      },
      {
        name: "October",
        days: 31,
        startDay: new Date(`oct, 01, ${year}`).getDay(),
      },
      {
        name: "November",
        days: 30,
        startDay: new Date(`nov, 01, ${year}`).getDay(),
      },
      {
        name: "December",
        days: 31,
        startDay: new Date(`dec, 01, ${year}`).getDay(),
      },
    ],
    days: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
    ],
    weekdays: ["sun", "mon", "tue", "wed", "thu", "fri", "sat"],
  };

  return calender;
};

export default function DatePickerV1() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);

  const calender = getDateInfo(currentYear);
  console.log(currentYear, currentMonth);

  function handleClickInc() {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((year) => +year + 1);
      return;
    }

    setCurrentMonth((c) => c + 1);
  }

  function handleClickDec() {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((year) => +year - 1);
      return;
    }
    setCurrentMonth((c) => c - 1);
  }

  function handleSelect(date) {
    setSelectedDate(
      `${date < 10 ? "0" + date : date}/${
        currentMonth + 1 < 10 ? "0" + (currentMonth + 1) : currentMonth
      }/${currentYear}`
    );
  }

  return (
    <div>
      <p style={{ color: "white" }}>{selectedDate || "no date selected"}</p>
      <div className="container">
        <span className="left" onClick={handleClickDec}>
          ◀
        </span>

        <div className="info">
          <h1>
            {calender.months[currentMonth].name}, {currentYear}
          </h1>
          <div className="weekdays">
            {calender.weekdays.map((day) => (
              <h3 key={day}>{day}</h3>
            ))}
          </div>
          <div className="days">
            {Array.from(
              {
                length: calender.months[currentMonth].name.startsWith("Feb")
                  ? calender.months[currentMonth].days[0] +
                    calender.months[currentMonth].startDay
                  : calender.months[currentMonth].days +
                    calender.months[currentMonth].startDay,
              },
              (_, i) =>
                i >= calender.months[currentMonth].startDay ? (
                  <button
                    key={i + 1}
                    className="day"
                    onClick={() =>
                      handleSelect(
                        i - calender.months[currentMonth].startDay + 1
                      )
                    }
                  >
                    {i - calender.months[currentMonth].startDay + 1}
                  </button>
                ) : (
                  <button className="day" key={i + 1}></button>
                )
            )}
          </div>
        </div>

        <span className="right" onClick={handleClickInc}>
          ▶
        </span>
      </div>
    </div>
  );
}
