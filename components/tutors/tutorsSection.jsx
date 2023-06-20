import React from "react";
import { FilterTutors } from "./filterTutors";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Filter,
  Search,
} from "react-feather";
import { searchFor, searchAny, getLanguages } from "@/app/tutors/search";
import { useEffect, useState } from "react";
import TutorsCards from "@/components/tutors/tutorsCard";
import { Loader } from "@/components/common/loading";
import { dummyData } from "@/app/tutors/dummyData";
import Link from "next/link";

export const GridTutors = ({ subject, level, min, max }) => {
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
    if (languages === "" && country === "") {
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
    } else {
      let newData = dataApi?.response.filter((tutor) => {
        if (
          tutor.average_rating > rating - 0.5 &&
          tutor.country_name.toLowerCase() === country.toLowerCase()
        ) {
          if (languages != "") {
            const toSearch = dataApi.language.filter((lang) => {
              if (lang.tu_id === tutor.tu_id) {
                return tutor;
              }
            });
            if (toSearch) {
              return toSearch;
            } else {
              return null;
            }
          } else {
            return tutor;
          }
        }
      });
      if (dataApi?.response && newData) {
        setData((prev) => {
          return { response: newData, language: prev.language };
        });
      }
    }
  }, [rating]);

  //handle language search event
  useEffect(() => {
    if (fireLanguage && languages != "") {
      if (country === "") {
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
      } else {
        let newData = dataApi?.response.filter((tutor) => {
          for (let i of dataApi.language) {
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
      }
    } else if (languages === "") {
      if (dataApi?.response) {
        if (country === "" && rating === 1) {
          setData(originalData);
        }
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
          const languageVar = originalData?.language.filter((lang) => {
            if (tutor.tu_id === lang.tu_id) {
              return tutor;
            }
          });
          if (languageVar) {
            return languageVar;
          } else {
            return null;
          }
        }
      });
      if (dataApi?.response && newData) {
        setData((prev) => {
          return { response: newData, language: prev.language };
        });
      }
    } else if (country === "") {
      if (dataApi?.response) {
        if (languages === "" && rating === 1) {
          setData(originalData);
        }
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
              return (
                <Link
                  className={`bg-white relative w-full h-[250px] rounded-xl shadow-lg`}
                  href={`tutors/${tutor.tu_id}`}
                  key={tutor.tu_name + tutor.tu_lastname}
                >
                  <TutorsCards
                    tutor={tutor}
                    languages={
                      languages[0]?.language_names || [
                        {
                          advertisements_level: "beginner",
                          language_names: [
                            "(Afan)/Oromoor/Oriya",
                            "Afar",
                            "English",
                            "Latin",
                          ],
                          subject_name: "mathematics",
                          tu_id: 1,
                        },
                      ]
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
