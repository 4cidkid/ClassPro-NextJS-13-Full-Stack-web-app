import React from "react";
import { X, ChevronLeft, ChevronRight, Filter } from "react-feather";
import { useEffect, useState } from "react";
import StarFill from "@/public/reviews/starFill";
import Star from "@/public/reviews/star";
import { Star as ReactStar } from "react-feather";
export const FilterTutors = (props) => {
  //switch of first class free
  const switchFirst = props.switchFirst
  const setSwitchFirst = props.setSwitchFirst
  //get country variable from father
  const country = props.country;
  //get country setter from father
  const setCountry = props.setCountry;
  //list of countries
  const countryList = props.countryList;
  //get prop variable from father
  const languages = props.languages;
  //set language on father element
  const setLanguages = props.setLanguages;
  //list of languages
  const listLanguajes = props.listLanguajes;
  //set list of language
  const setListLanguages = props.setListLanguages;
  //the dropdown menu of country should be on view?
  const [showCount, setShowCount] = useState(false);
  //the dropdown menu of language should be on view?
  const [show, setShow] = useState(false);
  //props fire language search
  const dataPros = props.dataApi;
  useEffect(() => {
    let newLanguages = [];
    dataPros?.map((lang) => {
      for (let i of lang.language_names) {
        if (!newLanguages.includes(i)) {
          newLanguages.push(i);
        }
      }
    });
    setListLanguages(newLanguages);
  }, [dataPros]);
  //handle click outside input
  useEffect(() => {
    const handleClickOutside = (e) => {
      var subject = document.getElementById("dropdown-menu");
      var subjectTwo = document.getElementById("dropdown-menu-2");
      if (
        !subject.contains(e.target) &&
        subject.classList.contains("scale-1")
      ) {
        setShow(false);
      }
      if (
        !subjectTwo.contains(e.target) &&
        subjectTwo.classList.contains("scale-1")
      ) {
        setShowCount(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  });

  return (
    <div className="sticky top-[100px] bg-white rounded-xl shadow-lg h-fit pb-8">
      <div className="flex flex-col child:py-6">
        <p className="text-4xl mx-auto font-normal flex items-center w-full p-5 justify-center border-b border-[rgba(105, 105, 105, 0.21)]">
          Filters <Filter></Filter>
        </p>
        <div className="flex flex-col gap-2 items-start px-5 border-b border-[rgba(105, 105, 105, 0.21)]">
          <p className="text-xl text-blackNot font-semibold">
            In what Language?
          </p>
          <div className="flex relative text-base w-full p-1 rounded-sm border-2 border-[rgba(105, 105, 105, 0.21)] shadow-sm">
            <input
              placeholder="English, Spanish, French"
              className="w-full"
              id="language-input"
              value={languages}
              onChange={(e) => {
                setLanguages(e.target.value);
              }}
              onClick={() => {
                setShowCount(false);
                setShow(true);
              }}
              readOnly
            ></input>
            <X className="cursor-pointer" onClick={() => setLanguages("")}></X>
            <ul
              id="dropdown-menu"
              className={`${
                show ? "scale-1" : "scale-0"
              } transition-transform border-2 border-main p-1 flex flex-col gap-1 left-0 top-[100%] z-[15] pl-2 text-xl absolute bg-main w-full max-h-[200px] overflow-y-scroll`}
            >
              {listLanguajes?.map((lang, i) => {
                return (
                  <li
                    className="text-white cursor-pointer hover:bg-white hover:text-main text-lg"
                    key={lang}
                    onClick={(e) => {
                      setLanguages(e.target.innerText);
                      setShow(false);
                    }}
                  >
                    {lang}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="px-5 border-b border-[rgba(105, 105, 105, 0.21)]">
          <div className="text-xl text-blackNot font-semibold">
            <p>Any specific Country?</p>
          </div>
          <div className="flex relative text-base w-full p-1 rounded-sm border-2 border-[rgba(105, 105, 105, 0.21)] shadow-sm">
            <input
              placeholder="US, Spain, France"
              className="w-full"
              id="language-input"
              value={country}
              onChange={(e) => {
                setCountry(e.target.value);
              }}
              onClick={() => {
                setShowCount(true);
                setShow(false);
              }}
              readOnly
            ></input>
            <X className="cursor-pointer" onClick={() => setCountry("")}></X>
            <ul
              id="dropdown-menu-2"
              className={`${
                showCount ? "scale-1" : "scale-0"
              } transition-transform border-2 border-main p-1 flex flex-col gap-1 left-0 top-[100%] z-[15] pl-2 text-xl absolute bg-main w-full max-h-[200px] overflow-y-scroll`}
            >
              {countryList?.map((coun, i) => {
                return (
                  <li
                    className="text-white cursor-pointer hover:bg-white hover:text-main text-lg"
                    key={coun + "list"}
                    onClick={(e) => {
                      setCountry(e.target.innerText);
                      setShowCount(false);
                    }}
                  >
                    {coun}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-2 items-start px-5 border-b border-[rgba(105, 105, 105, 0.21)]">
          <div className="flex w-full justify-between items-center">
            <p className="text-xl text-blackNot font-semibold">
              Minimum Rating:
            </p>
            <div className="flex items-center">
              <p className="text-3xl text-blackNot font-semibold ">{props.rating}</p>
              <ReactStar className="text-blackNot"></ReactStar>
            </div>
          </div>
          <div className="relative flex child:w-full gap-7" id="range-rating">
            <ChevronLeft
              onClick={() =>
                props.setRating((prev) => (prev > 1 ? prev - 1 : prev))
              }
              className="cursor-pointer select-none"
            ></ChevronLeft>
            <StarFill classname={"w-full"}></StarFill>
            {props.rating >= 2 ? (
              <StarFill classname={"w-full"}></StarFill>
            ) : (
              <Star classname={"w-full"}></Star>
            )}
            {props.rating >= 3 ? (
              <StarFill classname={"w-full"}></StarFill>
            ) : (
              <Star classname={"w-full"}></Star>
            )}
            {props.rating >= 4 ? (
              <StarFill classname={"w-full"}></StarFill>
            ) : (
              <Star classname={"w-full"}></Star>
            )}
            {props.rating >= 5 ? (
              <StarFill classname={"w-full"}></StarFill>
            ) : (
              <Star classname={"w-full"}></Star>
            )}
            <ChevronRight
              onClick={() =>
                props.setRating((prev) => (prev < 5 ? prev + 1 : prev))
              }
              className="cursor-pointer select-none"
            ></ChevronRight>
          </div>
        </div>
        <div className="flex items-center justify-between px-5">
          <div>
            <p className="text-xl text-blackNot font-semibold">
              First Class Free?
            </p>
          </div>
          <div
            className="relative bg-main rounded-full w-[20%] h-[30px] shadow-lg"
            onClick={() => {
              setSwitchFirst((prev) => !prev);
            }}
          >
            <div
              className={`${
                switchFirst ? "translate-x-[10%] bg-white" : "translate-x-[140%] bg-blackNot"
              } absolute top-1/2 transform transition-all duration-300 -translate-y-1/2 w-[25px] h-[25px] rounded-full`}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};
