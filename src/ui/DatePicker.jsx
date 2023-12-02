import { useEffect, useState } from "react";
import styles from "./DatePicker.module.css";

const dateInfo = {
  weekdays: ["sun", "mon", "tue", "wed", "thu", "fri", 'sat'],
  date: [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ],
  months: [
    { name: "January", days: 31, },
    { name: "February", days: 28 },
    { name: "March", days: 31 },
    { name: "April", days: 30 },
    { name: "May", days: 31 },
    { name: "June", days: 30 },
    { name: "July", days: 31 },
    { name: "August", days: 31 },
    { name: "September", days: 30 },
    { name: "October", days: 31 },
    { name: "November", days: 30 },
    { name: "December", days: 31 },
  ],
};

export default function DatePicker({ position }) {
  const [curSlides, setCurSlides] = useState([new Date().getMonth(), new Date().getMonth() + 1]);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [tempYear, setTempYear] = useState(new Date().getFullYear());
  console.log(curSlides);
 

  useEffect(function(){
    console.log(curSlides[0] === 11 && curSlides[1] === 0 && tempYear !== currentYear );

    if(curSlides[0] === 11 && curSlides[1] === 0 && tempYear !== currentYear){
      return;
    }
    document.querySelectorAll('.months-loop').forEach((mon, i) => (mon.style.transform =  `translateX(${(i - curSlides[0]) * 50}%)`))
  }, [curSlides])

  function handlePrev(){
    if(curSlides[0] === 0) {
      setCurSlides(prev => [11, 0]);
      setTempYear(currentYear - 1)
      // setCurrentYear();
      return;
    }

    setCurSlides(prev => [prev[0] - 1, prev[0]]);
    setCurrentYear(tempYear )
    setTempYear(tempYear);
  }

  function handleNext(){
    if(curSlides[1] === 11){
      setCurSlides(prev => [prev[1], 0]);
      setTempYear(currentYear);
      setCurrentYear(prev => prev + 1)
      return;
    }
    setCurSlides(prev => [prev[1], prev[1] + 1]);
    // setCurrentYear(tempYear);
    setTempYear(currentYear);
  }

  return (
      <div  className={styles.datePicker}
      style={{ left: `${position.x}px`, top: `${position.y}px` }}>

        {curSlides[0] === 11 && curSlides[1] === 0 && tempYear !== currentYear ? <div className={`${styles.loop} months-loop`} key={crypto.randomUUID()}>
            <div className={`${styles.month} month`}>
              <div className={styles.intro}>
                 <button onClick={handlePrev}>Prev</button>

                <h4>{dateInfo.months[11].name} {tempYear}</h4>
              </div>

              <div className={styles.weekdays}>
                {dateInfo.weekdays.map((day) => (
                  <h5 key={day}>{day}</h5>
                ))}
              </div>

              <div className={styles.days}>
                {Array.from({ length: dateInfo.months[11].days + new Date(tempYear, dateInfo.months.indexOf(dateInfo.months[11]), 1).getDay() }, (_, index) => (
                  Number(index) >= `${new Date(tempYear, dateInfo.months.indexOf(dateInfo.months[11]), 1).getDay()}` ? 
                  <button key={index + 1}>
                    {index - new Date(tempYear, dateInfo.months.indexOf(dateInfo.months[11]), 1).getDay() + 1}
                  </button> : <button></button>
                ))}
              </div>
            </div>

            <div className={`${styles.month} month`}>
              <div className={styles.intro}>
                <h4>{dateInfo.months[0].name} {currentYear}</h4>
                <button onClick={handleNext}>Next</button>
              </div>

              <div className={styles.weekdays}>
                {dateInfo.weekdays.map((day) => (
                  <h5 key={day}>{day}</h5>
                ))}
              </div>

              <div className={styles.days}>
                {Array.from({ length: dateInfo.months[0].days + new Date(currentYear, dateInfo.months.indexOf(dateInfo.months[0]), 1).getDay() }, (_, index) => (
                  Number(index) >= `${new Date(currentYear, dateInfo.months.indexOf(dateInfo.months[0]), 1).getDay()}` ? 
                  <button key={index + 1}>
                    {index - new Date(currentYear, dateInfo.months.indexOf(dateInfo.months[0]), 1).getDay() + 1}
                  </button> : <button></button>
                ))}
              </div>
            </div>
          </div> : dateInfo.months.map((month, i) => (
          <div className={`${styles.loop} months-loop`}>
            <div key={i + 1} className={`${styles.month} month`}>
              <div className={styles.intro}>
                {curSlides[0] === Number(i) ? <button onClick={handlePrev}>Prev</button> : ''}

                <h4>{dateInfo.months[i].name} {curSlides[0] === 11 && tempYear !== currentYear ? tempYear : currentYear}</h4>

                {curSlides[1] === Number(i) ? <button onClick={handleNext}>Next</button> : ''}
              </div>

              <div className={styles.weekdays}>
                {dateInfo.weekdays.map((day) => (
                  <h5 key={day}>{day}</h5>
                ))}
              </div>

              <div className={styles.days}>
                {Array.from({ length: dateInfo.months[i].days + new Date(currentYear, dateInfo.months.indexOf(dateInfo.months[i]), 1).getDay() }, (_, index) => (
                  Number(index) >= `${new Date(currentYear, dateInfo.months.indexOf(dateInfo.months[i]), 1).getDay()}` ? 
                  <button key={index + 1}>
                    {index - new Date(currentYear, dateInfo.months.indexOf(dateInfo.months[i]), 1).getDay() + 1}
                  </button> : <button></button>
                ))}
              </div>
            </div>
          </div>
          )
        )}
        
      </div>
  );
}
