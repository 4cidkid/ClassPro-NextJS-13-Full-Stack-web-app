"use client";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Filter,
  Search,
} from "react-feather";
import { useSearchParams } from "next/navigation";
import Router from "next/router";
import { searchFor, searchAny, getLanguages } from "./search";
import { useEffect, useState } from "react";
import SearchBar from "@/components/common/search";
import TutorsCards from "@/components/tutors/tutorsCard";
import { usePathname } from "next/navigation";
import { Loader } from "@/components/common/loading";
import { dummyData } from "./dummyData";
import Link from "next/link";
import StarFill from "@/public/reviews/starFill";
import HalfStar from "@/public/reviews/halfStar";
import Star from "@/public/reviews/star";
import { Star as ReactStar } from "react-feather";
import { Input } from "postcss";

export function Tutors() {
  //get params from url
  const searchParams = useSearchParams();
  const subject = searchParams.get("subject");
  const level = searchParams.get("level");
  const min = parseInt(searchParams.get("min"));
  const max = parseInt(searchParams.get("max"));

  return (
    <>
      <section
        id="hero-level"
        className="relative flex justify-center w-full h-full"
      >
        <div
          id="hero-container"
          className="flex flex-col gap-3 items-center before:absolute before:inset-0 before:content-[''] before:w-full before:h-full
          before:bg-cover before:bg-center before:z-[-1] before:saturate-150 before:brightness-[65%]
           before:bg-[url('https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] 
           px-[135px] flex justify-center py-[100px] w-full h-full"
        >
          <h1
            className="text-4xl text-center text-white font-bold"
            style={{ textShadow: "0px 3px 2px #000000" }}
          >
            Find <strong className=" text-5xl">Perfect Tutors</strong> Today
          </h1>
          <SearchBar></SearchBar>
        </div>
      </section>
      <section id="tutors" className="bg-second">
        <GridTutors
          subject={subject}
          level={level}
          min={min}
          max={max}
        ></GridTutors>
      </section>
    </>
  );
}

const FilterTutors = (props) => {
  //get country variable from father
  const country = props.country;
  //get country setter from father
  const setCountry = props.setCountry;
  //list of countries
  const countryList = props.countryList;
  //set country language
  const setfireCountry = props.setfireCountry;
  //get prop variable from father

  const languages = props.languages;
  //set language on father element
  const setLanguages = props.setLanguages;
  //list of languages
  const [listLanguajes, setListLanguages] = useState([
    "English",
    "Spanish",
    "French",
  ]);
  //the dropdown menu of country should be on view?
  const [showCount, setShowCount] = useState(false);
  //the dropdown menu of language should be on view?
  const [show, setShow] = useState(false);
  //props fire language search
  const setFireLanguage = props.setFireLanguage;
  //get list of languages
  const dataPros = props.dataApi;
  useEffect(() => {
    let newLanguages = [];
    console.log(dataPros, "asdas");
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
              onClick={() => setShow(true)}
            ></input>
            <ArrowRight
              className="cursor-pointer"
              onClick={() => setFireLanguage(true)}
            ></ArrowRight>
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
              onClick={() => setShowCount(true)}
            ></input>
            <ArrowRight
              className="cursor-pointer"
              onClick={() => setfireCountry(true)}
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

const GridTutors = ({ subject, level, min, max }) => {
  //data from the api
  const [dataApi, setData] = useState();
  //Work's like a switch, if DataApi hasn't loaded yet, falseData switch to true
  const [falseData, setFalseData] = useState(false);
  const [defaultPage, setDefaultPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  //slice number of tutors to show
  const [slice, setSlice] = useState({ start: 0, end: 6 });
  //slice numbers in pagination
  const [slicePagination, setSlicePagination] = useState({ start: 0, end: 5 });
  //fire language search
  const [fireLanguage, setFireLanguage] = useState(false);
  //saves the original data to not mutate dataApi with rating
  const [originalData, setOriginalData] = useState();
  //saves the rating variable for the FilterTutors Component
  const [rating, setRating] = useState(1);
  //languages state for languages filter
  const [languages, setLanguages] = useState("");
  //specific country filter
  const [country, setCountry] = useState("");
  //list of countries
  const [countryList, setCountryList] = useState();
  //fire country search
  const [fireCountry, setfireCountry] = useState(false);

  let mapMe = [];

  //get number of pages in an array
  if (totalPages != 0) {
    for (let i = 0; i <= totalPages - 1; i++) {
      mapMe.push(i);
    }
  }
  //fetchData from the api with params
  useEffect(() => {
    async function fetchData() {
      if (subject && level && min && max) {
        const data = await searchFor({
          subject,
          level,
          min,
          max,
        });
        if (data === false) {
          const data = await searchAny();
          setData(data);
          setOriginalData(data);
          setFalseData(true);
        } else {
          setFalseData(false);
          setData(data);
          setOriginalData(data);
        }
      }
    }
    fetchData();
  }, [subject, level, min, max]);

  //FetchData from the api without any params
  useEffect(() => {
    async function fetchData() {
      if (!subject || !level || !min || !max) {
        const data = await searchAny();
        setFalseData(false);
        setData(data);
        setOriginalData(data);
      }
    }
    fetchData();
  }, []);
  //calculate total pages
  useEffect(() => {
    if (dataApi?.response) {
      setTotalPages(Math.floor(dataApi.response.length / 6) + 1);
    }
  }, [dataApi]);

  //update data by rating
  useEffect(() => {
    let newData = originalData?.response.filter((tutor) => {
      if (tutor.average_rating > rating - 0.5) {
        return tutor;
      }
    });
    if (dataApi?.response && newData) {
      setData((prev) => {
        return { response: newData, language: prev.language };
      });
    }
  }, [rating]);

  //handle language search event
  useEffect(() => {
    if (fireLanguage && languages != "") {
      let newData = originalData?.response.filter((tutor) => {
        for (let i of originalData.language) {
          if (tutor.tu_id === i.tu_id) {
            const lowerCase = i.language_names.map((lang) => {
              return lang.toLowerCase();
            });
            if (lowerCase.includes(languages.toLowerCase())) {
              return tutor;
            }
          }
        }
      });
      if (dataApi?.response && newData) {
        setData((prev) => {
          return { response: newData, language: prev.language };
        });
      }
    } else if (languages === "") {
      if (dataApi?.response) {
        setData(originalData);
      }
    }
    setFireLanguage(false);
  }, [fireLanguage, languages]);
  //map countries to set country list
  useEffect(() => {
    let countriesToGet = [];
    dataApi?.response.map((coun) => {
      if (
        !countriesToGet.includes(
          capitalizeFirstLetter(coun.country_name.toLowerCase())
        )
      ) {
        countriesToGet.push(
          capitalizeFirstLetter(coun.country_name.toLowerCase())
        );
      }
    });
    setCountryList(countriesToGet);
  }, [dataApi]);
  //handle country search event
  useEffect(() => {
    if (fireCountry && country != "") {
      let newData = originalData?.response.filter((tutor) => {
        if (tutor.country_name.toLowerCase() === country.toLowerCase()) {
          return tutor;
        }
      });
      if (dataApi?.response && newData) {
        setData((prev) => {
          return { response: newData, language: prev.language };
        });
      }
    } else if (country === "") {
      if (dataApi?.response) {
        setData(originalData);
      }
    }
    setfireCountry(false);
  }, [fireCountry, country]);
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return (
    <section id="grid-tutors" className="h-fit">
      <div
        id="tutors-container"
        className="px-[135px] py-[48px] flex justify-between"
      >
        <div className="w-[25%] sticky overflow-visible">
          <FilterTutors
            languages={languages}
            setLanguages={setLanguages}
            rating={rating}
            setRating={setRating}
            setFireLanguage={setFireLanguage}
            dataApi={dataApi?.language}
            country={country}
            setCountry={setCountry}
            countryList={countryList}
            setfireCountry={setfireCountry}
          ></FilterTutors>
        </div>
        <div
          id="tutors-cards"
          className="flex flex-col items-center gap-5  w-[70%]"
        >
          {falseData && (
            <p>We didn't find any tutor, but Here is some Nice Tutors!</p>
          )}
          {dataApi &&
            dataApi.response?.slice(slice.start, slice.end).map((tutor, i) => {
              const languages = dataApi.language.filter((lang) => {
                if (tutor.tu_id === lang.tu_id) {
                  return lang;
                }
              });
              console.log(languages, "languages");
              return (
                <Link
                  className={`bg-white relative w-full h-[250px] rounded-xl shadow-lg`}
                  href={`tutors/${tutor.tu_id}`}
                  key={tutor.tu_name + tutor.tu_lastname}
                >
                  <TutorsCards
                    tutor={tutor}
                    languages={
                      languages[0]?.language_names || [{
                        advertisements_level: "beginner",
                        language_names: [
                          "(Afan)/Oromoor/Oriya",
                          "Afar",
                          "English",
                          "Latin",
                        ],
                        subject_name: "mathematics",
                        tu_id: 1,
                      }]
                    }
                  ></TutorsCards>
                </Link>
              );
            })}
          {!dataApi &&
            dummyData.map((data) => (
              <div
                key={data.tu_id}
                className="blur-lg bg-white relative w-full h-[250px] rounded-xl border-[1px] border-blackNot shadow-lg"
              >
                <TutorsCards dummy={true} tutor={data}></TutorsCards>
              </div>
            ))}
          {!dataApi && <Loader show={dataApi ? false : true}></Loader>}
        </div>
      </div>
      <div className="px-[135px] py-[48px] flex justify-center flex items-center gap-5">
        <div className="flex gap-x-12   justify-around items-center child:cursor-pointer">
          <ChevronLeft
            onClick={() => {
              if (slicePagination.start != 0) {
                setSlicePagination((prev) => {
                  return { start: prev.start - 1, end: prev.end - 1 };
                });
              }
              setSlice((prev) => {
                if (prev.start > 0) {
                  document.getElementById("tutors-container").scrollIntoView();

                  return { start: prev.start - 6, end: prev.end - 6 };
                } else {
                  return { start: prev.start, end: prev.end };
                }
              });
              if (defaultPage != 1) {
                setDefaultPage((prev) => prev - 1);
              }
            }}
            className="bg-main rounded-full text-white w-[45px] h-[45px]"
          ></ChevronLeft>
          <ul className="flex gap-12">
            {mapMe
              ?.slice(slicePagination.start, slicePagination.end)
              .map((num) => (
                <li
                  key={num}
                  onClick={(e) => {
                    document
                      .getElementById("tutors-container")
                      .scrollIntoView();
                    if (defaultPage === parseInt(e.target.innerText)) {
                      return;
                    } else {
                      if (defaultPage < parseInt(e.target.innerText)) {
                        if (
                          slicePagination.end != totalPages &&
                          slicePagination.end < totalPages
                        ) {
                          setSlicePagination((prev) => {
                            return { start: prev.start + 1, end: prev.end + 1 };
                          });
                        }
                        const goTo = parseInt(e.target.innerText) - defaultPage;
                        setSlice((prev) => {
                          return {
                            start: prev.start + goTo * 6,
                            end: prev.end + goTo * 6,
                          };
                        });
                        setDefaultPage(parseInt(e.target.innerText));
                      } else {
                        if (slicePagination.start != 0) {
                          setSlicePagination((prev) => {
                            return { start: prev.start - 1, end: prev.end - 1 };
                          });
                        }
                        const goTo = parseInt(e.target.innerText) - defaultPage;
                        setSlice((prev) => {
                          return {
                            start: prev.start + goTo * 6,
                            end: prev.end + goTo * 6,
                          };
                        });
                        setDefaultPage(parseInt(e.target.innerText));
                      }
                    }
                  }}
                  className={`${
                    num + 1 === defaultPage
                      ? "scale-[1.5] font-bold text-main"
                      : "scale-[1] text-black"
                  } text-3xl transition-transform duration-300 transition-colors`}
                >
                  {num + 1}
                </li>
              ))}
          </ul>
          <ChevronRight
            onClick={() => {
              if (
                slicePagination.end != totalPages &&
                slicePagination.end < totalPages
              ) {
                setSlicePagination((prev) => {
                  return { start: prev.start + 1, end: prev.end + 1 };
                });
              }
              setSlice((prev) => {
                if (prev.end < dataApi.response.length) {
                  document.getElementById("tutors-container").scrollIntoView();

                  return { start: prev.end, end: prev.end + 6 };
                } else {
                  return { start: prev.start, end: prev.end };
                }
              });
              if (defaultPage != totalPages) {
                setDefaultPage((prev) => prev + 1);
              }
            }}
            className="bg-main rounded-full text-white w-[45px] h-[45px]"
          ></ChevronRight>
        </div>
        <div className="text-xl font-bold">
          {defaultPage} - {totalPages}
        </div>
      </div>
    </section>
  );
};

export default Tutors;
