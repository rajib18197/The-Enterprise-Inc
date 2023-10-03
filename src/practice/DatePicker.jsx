import { useState } from "react";
import "./DatePicker.css";

const calender = {
  // ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"]
  // prettier-ignore
  months: [{name: "January", days: 31, startDay: new Date('jan, 01, 2023').getDay()},{name: "February", days: [28, 29], startDay: new Date('feb, 01, 2023').getDay()},{name: "March", days: 31, startDay: new Date('mar, 01, 2023').getDay()},{name: "April", days: 30},{name: "May", days: 31},{name: "June", days: 30},{name: "July", days: 31}, {name: "August", days: 31},{name: "September", days: 30},{name: "October", days: 31},{name: "November", days: 30},{name: "December", days: 31}],
  days: [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ],
  weekdays: ["sun", "mon", "tue", "wed", "thu", "fri", "sat"],
};

export default function DatePicker() {
  const [count, setCount] = useState(0);
  //   console.log(calender.months[0].startDay);
  //   console.log(calender.months[1].startDay);

  return (
    <div className="container">
      <span className="left" onClick={() => setCount((c) => c - 1)}>
        ◀
      </span>

      <div className="months">
        {calender.months.map((month, index) => {
          return (
            <div
              key={month.name}
              className="info"
              //   style={{ transform: `translateX(-${(count - index) * 100}%)` }}
              //   style={{ transform: `translateX(-41rem)` }}
            >
              <h1>
                {month.name}, {new Date().getFullYear()}
              </h1>
              <div className="weekdays">
                {calender.weekdays.map((day) => (
                  <h3 key={day}>{day}</h3>
                ))}
              </div>
              <div className="days">
                {Array.from(
                  {
                    length: month.name.startsWith("Feb")
                      ? month.days[0] + month.startDay
                      : month.days + month.startDay,
                  },
                  (_, i) =>
                    i >= month.startDay ? (
                      <button key={i + 1} className="day">
                        {i - month.startDay + 1}
                      </button>
                    ) : (
                      <button className="day" key={i + 1}></button>
                    )
                )}
              </div>
            </div>
          );
        })}
      </div>

      <span className="right" onClick={() => setCount((c) => c + 1)}>
        ▶
      </span>
    </div>
  );
}
