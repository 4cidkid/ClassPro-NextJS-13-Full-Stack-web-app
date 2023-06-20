import React from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Filter } from "react-feather";
import { useEffect, useState } from "react";
import StarFill from "@/public/reviews/starFill";
import Star from "@/public/reviews/star";
import { Star as ReactStar } from "react-feather";
export const FilterTutors = (props) => {
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
  const listLanguajes = props.listLanguajes
  //set list of language
  const setListLanguages = props.setListLanguages
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
  //find te language that the user need
  let languagesToShow = [];
  if (languages != "" && listLanguajes != "" && languages) {
    for (let i of listLanguajes) {
      if (
        i.toLowerCase().includes(languages.toLowerCase()) &&
        !languagesToShow.includes(i)
      ) {
        languagesToShow.push(i);
      }
    }
  }
  //find the country that the user need
  let countriesToShow = [];
  if (country != "" && countryList != "" && country) {
    for (let i of countryList) {
      if (
        i.toLowerCase().includes(country.toLowerCase()) &&
        !countriesToShow.includes(i)
      ) {
        countriesToShow.push(i);
      }
    }
  }
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
    <div className="sticky top-[100px] bg-white rounded-xl shadow-lg h-[70vh]">
      <div className="flex flex-col gap-3">
        <p className="text-4xl mx-auto font-normal flex items-center w-full p-5 border-b justify-center border-[rgba(105, 105, 105, 0.21)]">
          Filters <Filter></Filter>
        </p>
        <div className="flex flex-col gap-2 items-start px-5">
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
                setShowCount(false)
                setShow(true)
              }}
              readOnly
            ></input>
            <ul
              id="dropdown-menu"
              className={`${
                show ? "scale-1" : "scale-0"
              } transition-transform border-2 border-main p-1 flex flex-col gap-1 left-0 top-[100%] z-[15] pl-2 text-xl absolute bg-main w-full max-h-[200px] overflow-y-scroll`}
            >
              {languagesToShow.length > 0
                ? languagesToShow.map((lang) => {
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
                  })
                : listLanguajes?.map((lang, i) => {
                    if (
                      languages != "" &&
                      languages &&
                      languagesToShow.length === 0
                    ) {
                      if (i === 0) {
                        return (
                          <li
                            key={lang + 1}
                            className="text-white hover:bg-white text-lg font-normal hover:text-main"
                          >
                            No se encontraron resultados :(
                          </li>
                        );
                      }
                    } else {
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
                    }
                  })}
            </ul>
          </div>
        </div>
        <div className="px-5">
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
                setShowCount(true)
                setShow(false)
              }}
              readOnly
            ></input>
            <ArrowRight
              className="cursor-pointer"
            ></ArrowRight>
            <ul
              id="dropdown-menu-2"
              className={`${
                showCount ? "scale-1" : "scale-0"
              } transition-transform border-2 border-main p-1 flex flex-col gap-1 left-0 top-[100%] z-[15] pl-2 text-xl absolute bg-main w-full max-h-[200px] overflow-y-scroll`}
            >
              {countriesToShow.length > 0
                ? countriesToShow.map((coun) => {
                    return (
                      <li
                        className="text-white cursor-pointer hover:bg-white hover:text-main text-lg"
                        key={coun + "country"}
                        onClick={(e) => {
                          setCountry(e.target.innerText);
                          setShowCount(false);
                        }}
                      >
                        {coun}
                      </li>
                    );
                  })
                : countryList?.map((coun, i) => {
                    if (
                      country != "" &&
                      country &&
                      countriesToShow.length === 0
                    ) {
                      if (i === 0) {
                        return (
                          <li
                            key={coun + "list-no-result"}
                            className="text-white hover:bg-white text-lg font-normal hover:text-main"
                          >
                            No se encontraron resultados :(
                          </li>
                        );
                      }
                    } else {
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
                    }
                  })}
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-2 items-start px-5">
          <div className="flex gap-2 items-center">
            <p className="text-xl text-blackNot font-semibold">
              Minimum Rating:
            </p>
            <div className="flex items-center">
              <p className="text-3xl  font-semibold ">{props.rating}</p>
              <ReactStar className=""></ReactStar>
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
      </div>
    </div>
  );
};
