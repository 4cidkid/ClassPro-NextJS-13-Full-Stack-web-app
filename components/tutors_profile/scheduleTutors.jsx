"use client";
import React, { useState  } from "react";
import { ChevronLeft, ChevronRight } from "react-feather";
export default function ScheduleTutors({ tutorDate }) {
  //define weeks
  const firstWeek = new Date();
  const secondWeek = new Date(firstWeek);
  secondWeek.setDate(secondWeek.getDate() + 7);
  const thirdWeek = new Date(secondWeek);
  thirdWeek.setDate(thirdWeek.getDate() + 7);
  const fourWeek = new Date(thirdWeek);
  fourWeek.setDate(fourWeek.getDate() + 7);

  //define range weeks
  const firstWeekRange = new Date(firstWeek);
  firstWeekRange.setDate(firstWeekRange.getDate() + 6);
  const secondWeekRange = new Date(secondWeek);
  secondWeekRange.setDate(secondWeekRange.getDate() + 6);
  const thirdWeekRange = new Date(thirdWeek);
  thirdWeekRange.setDate(thirdWeekRange.getDate() + 6);
  const fourWeekRange = new Date(fourWeek);
  fourWeekRange.setDate(fourWeekRange.getDate() + 6);

  //define position of dates
  const [move, setMove] = useState({
    one: 0,
    two: 100,
    three: 200,
    four: 300,
  });

  //get todays date to generate days of the week;
  const generateDaysOfTheWeek = (today) => {
    let daysOfTheWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    for (let day of daysOfTheWeek.splice(0, today)) {
      daysOfTheWeek.push(day);
    }
    return daysOfTheWeek;
  };
  //convert sql dates to javascript dates and push them on an array
  const arrayOfDates = tutorDate.map((date) => {
    return new Date(date);
  });

  return (
    <div
      id="schedule"
      className="relative flex flex-col bg-white  shadow-xl rounded-xl h-[30vh]"
    >
      <div className="flex justify-between items-center  [&>*:first-child]:w-[35px] [&>*:last-child]:w-[35px] [&>*:first-child]:h-[35px] [&>*:last-child]:h-[35px] child:bg-gray p-5 border-b border-[rgba(0, 0, 0, 0.90)]">
        <ChevronLeft
          className={`${move.one === 0 ? 'opacity-0 pointer-events-none':'opacity-1'}  transition-opacity duration-500  text-black relative z-[999] cursor-pointer`}
          onClick={() => {
            if (move.one !== 0) {
              setMove((prev) => {
                return {
                  one: prev.one + 100,
                  two: prev.two + 100,
                  three: prev.three + 100,
                  four: prev.four + 100,
                };
              });
            } else {
              return;
            }
          }}
        ></ChevronLeft>
        <div className="flex text-xl gap-2">
          <p>From</p>
          <p>
            <strong>
              {move.one === 0
                ? firstWeek.toLocaleDateString('us-US',{ year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-')
                : move.two === 0
                ? secondWeek.toLocaleDateString('us-US',{ year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-')
                : move.three === 0
                ? thirdWeek.toLocaleDateString('us-US',{ year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-')
                : fourWeek.toLocaleDateString('us-US',{ year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-') }
            </strong>
          </p>
          <p>to</p>
          <p>
            <strong>
            {move.one === 0
                ? firstWeekRange.toLocaleDateString('us-US',{ year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-')
                : move.two === 0
                ? secondWeekRange.toLocaleDateString('us-US',{ year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-')
                : move.three === 0
                ? thirdWeekRange.toLocaleDateString('us-US',{ year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-')
                : fourWeekRange.toLocaleDateString('us-US',{ year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-') }
            </strong>
          </p>
        </div>
        <ChevronRight
          className={`${move.four === 0 ? 'opacity-0 pointer-events-none':'opacity-1'} transition-opacity duration-500 text-black relative z-[999] cursor-pointer`}
          onClick={() => {
            if (move.four !== 0) {
              setMove((prev) => {
                return {
                  one: prev.one - 100,
                  two: prev.two - 100,
                  three: prev.three - 100,
                  four: prev.four - 100,
                };
              });
            } else {
              return;
            }
          }}
        ></ChevronRight>
      </div>
      <div
        className="h-full overflow-hidden flex w-full  pt-5 pb-5 relative z-[10]"
        style={{ overflowX: "hidden" }}
      >
        <div
          id="1"
          style={{
            translate: `${move.one}%`,
            transition: "translate 400ms ease",
          }}
          className={` transition-transform duration-1000 absolute flex justify-between w-full child:flex child:flex-col child:items-center`}
        >
          {generateDaysOfTheWeek(firstWeek.getDay()).map((day, i) => {
            const date = new Date(firstWeek);
            date.setDate(firstWeek.getDate() + i);

            const tutorHours = arrayOfDates.filter((tuhour) => {
              if (tuhour.getDay() === date.getDay()) {
                return tuhour;
              }
            });
            return (
              <div
                className="flex w-[100%]  flex-col items-center gap-2"
                key={`${date} 2`}
              >
                <div className="flex flex-col items-center text-2xl font-semibold">
                  <p className="text-xl p-2 bg-main rounded-full w-[40px] h-[40px] text-center text-white font-bold">
                    {date.toLocaleString("default", { day: "numeric" })}
                  </p>
                  <p>{day}</p>
                </div>
                <div key={`${date} 2`}>
                  {tutorHours.length > 0 &&
                    tutorHours.map((hour) => {
                      return (
                        <p
                          className="text-main font-semibold"
                          key={`${hour} 2`}
                        >
                          {hour.getHours() > 10
                            ? hour.getHours()
                            : "0" + hour.getHours()}{" "}
                          -{" "}
                          {hour.getMinutes() > 10
                            ? hour.getMinutes()
                            : "0" + hour.getMinutes()}
                        </p>
                      );
                    })}
                </div>
              </div>
            );
          })}
        </div>
        <div
          id="2"
          style={{
            translate: `${move.two}%`,
            transition: "translate 400ms ease",
          }}
          className={` transition-transform duration-1000 flex w-[100%] child:w-full absolute justify-between child:flex child:flex-col child:items-center`}
        >
          {generateDaysOfTheWeek(secondWeek.getDay()).map((day, i) => {
            const date = new Date(secondWeek);
            date.setDate(secondWeek.getDate() + i);

            const tutorHours = arrayOfDates.filter((tuhour) => {
              if (tuhour.getDay() === date.getDay()) {
                return tuhour;
              }
            });
            return (
              <div
                className="flex flex-col items-center gap-2"
                key={`${date} 3`}
              >
                <div className="flex flex-col items-center text-2xl font-semibold">
                  <p className="text-xl p-2 bg-main rounded-full w-[40px] h-[40px] text-center text-white font-bold">
                    {date.toLocaleString("default", { day: "numeric" })}
                  </p>
                  <p>{day}</p>
                </div>
                <div key={`${date} 33`}>
                  {tutorHours.length > 0 &&
                    tutorHours.map((hour) => {
                      return (
                        <p
                          className="text-main font-semibold"
                          key={`${hour} 3`}
                        >
                          {hour.getHours() > 10
                            ? hour.getHours()
                            : "0" + hour.getHours()}{" "}
                          -{" "}
                          {hour.getMinutes() > 10
                            ? hour.getMinutes()
                            : "0" + hour.getMinutes()}
                        </p>
                      );
                    })}
                </div>
              </div>
            );
          })}
        </div>
        <div
          id="3"
          style={{
            translate: `${move.three}%`,
            transition: "translate 400ms ease",
          }}
          className={`  transition-transform duration-1000 flex w-[100%] child:w-full absolute justify-between child:flex child:flex-col child:items-center`}
        >
          {generateDaysOfTheWeek(thirdWeek.getDay()).map((day, i) => {
            const date = new Date(thirdWeek);
            date.setDate(thirdWeek.getDate() + i);

            const tutorHours = arrayOfDates.filter((tuhour) => {
              if (tuhour.getDay() === date.getDay()) {
                return tuhour;
              }
            });
            return (
              <div
                className="flex flex-col items-center gap-2"
                key={`${date} 4`}
              >
                <div className="flex flex-col items-center text-2xl font-semibold">
                  <p className="text-xl p-2 bg-main rounded-full w-[40px] h-[40px] text-center text-white font-bold">
                    {date.toLocaleString("default", { day: "numeric" })}
                  </p>
                  <p>{day}</p>
                </div>
                <div key={date + "44"}>
                  {tutorHours.length > 0 &&
                    tutorHours.map((hour) => {
                      return (
                        <p
                          className="text-main font-semibold"
                          key={`${hour} 4`}
                        >
                          {hour.getHours() > 10
                            ? hour.getHours()
                            : "0" + hour.getHours()}{" "}
                          -{" "}
                          {hour.getMinutes() > 10
                            ? hour.getMinutes()
                            : "0" + hour.getMinutes()}
                        </p>
                      );
                    })}
                </div>
              </div>
            );
          })}
        </div>
        <div
          id="4"
          style={{
            translate: `${move.four}%`,
            transition: "translate 400ms ease",
          }}
          className={` transition-transform duration-1000 flex w-[100%] child:w-full absolute justify-between child:flex child:flex-col child:items-center`}
        >
          {generateDaysOfTheWeek(fourWeek.getDay()).map((day, i) => {
            const date = new Date(fourWeek);
            date.setDate(fourWeek.getDate() + i);

            const tutorHours = arrayOfDates.filter((tuhour) => {
              if (tuhour.getDay() === date.getDay()) {
                return tuhour;
              }
            });
            return (
              <div
                className="flex flex-col items-center gap-2"
                key={`${date} 4`}
              >
                <div className="flex flex-col items-center text-2xl font-semibold">
                  <p className="text-xl p-2 bg-main rounded-full w-[40px] h-[40px] text-center text-white font-bold">
                    {date.toLocaleString("default", { day: "numeric" })}
                  </p>
                  <p>{day}</p>
                </div>
                <div key={date + "44"}>
                  {tutorHours.length > 0 &&
                    tutorHours.map((hour) => {
                      return (
                        <p
                          className="text-main font-semibold"
                          key={`${hour} 4`}
                        >
                          {hour.getHours() > 10
                            ? hour.getHours()
                            : "0" + hour.getHours()}{" "}
                          -{" "}
                          {hour.getMinutes() > 10
                            ? hour.getMinutes()
                            : "0" + hour.getMinutes()}
                        </p>
                      );
                    })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
