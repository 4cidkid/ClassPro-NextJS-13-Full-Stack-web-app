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
  //loading state control
  const [shouldLoad, setShouldLoad] = useState(false);
  //current page
  const [defaultPage, setDefaultPage] = useState(1);
  //total numers of page calculated based on total number of tutors
  const [totalPages, setTotalPages] = useState(0);
  //slice number of tutors to show
  const [slice, setSlice] = useState({ start: 0, end: 6 });
  //slice numbers in pagination
  const [slicePagination, setSlicePagination] = useState({ start: 0, end: 5 });
  //saves the original data to not mutate dataApi with rating
  const [originalData, setOriginalData] = useState();

  /* ------------ First Class Free ------------ */
  //first class free state
  const [switchFirst, setSwitchFirst] = useState(true);

  /* ------------ RATING ------------ */
  //saves the rating variable for the FilterTutors Component
  const [rating, setRating] = useState(1);
  /* ------------ LANGUAGE STATES ------------ */

  //languages state for languages filter
  const [languages, setLanguages] = useState("");
  //list of languages avalible
  const [listLanguajes, setListLanguages] = useState([
    "English",
    "Spanish",
    "French",
  ]);
  /* ------------ Country States ------------ */
  //specific country filter state
  const [country, setCountry] = useState("");
  //list of countries avalible
  const [countryList, setCountryList] = useState();

  //set Language list
  useEffect(() => {
    let languagesListSetter = [];
    if (dataApi?.language) {
      for (let tutor of dataApi.response) {
        for (let langObj of dataApi.language) {
          for (let arrayOfLang of langObj.language_names) {
            if (
              !languagesListSetter.includes(arrayOfLang) &&
              tutor.tu_id === langObj.tu_id
            ) {
              languagesListSetter.push(arrayOfLang);
            }
          }
        }
      }
    }
    setListLanguages(languagesListSetter);
  }, [dataApi]);

  //set country List
  useEffect(() => {
    let countries = [];
    dataApi?.response.map((tutor) => {
      if (
        !countries.includes(
          capitalizeFirstLetter(tutor.country_name.toLowerCase())
        )
      ) {
        countries.push(capitalizeFirstLetter(tutor.country_name.toLowerCase()));
      }
    });
    setCountryList(countries);
  }, [dataApi]);

  /* ------------ FILTERS EVENTS ------------ */
  useEffect(() => {
    //if only rating exist
    if ((rating != 1) & (country === "") & (languages === "")) {
      setShouldLoad(true);
      let languagesToShow = [];
      const tutorsToShow = originalData.response.filter((tutor) => {
        if (
          tutor.average_rating > rating - 0.6 &&
          tutor.first_class === switchFirst
        ) {
          languagesToShow.push(tutor);
        }
      });
      if (languagesToShow) {
        setData((prev) => {
          return { response: languagesToShow, language: prev.language };
        });
      }
      setTimeout(() => setShouldLoad(false), 700);
    }
    //if only country exist
    if ((rating === 1) & (country != "") & (languages === "")) {
      setShouldLoad(true);
      let languagesToShow = [];
      const tutorsToShow = originalData.response.filter((tutor) => {
        if (
          tutor.country_name.toLowerCase() === country.toLowerCase() &&
          tutor.first_class === switchFirst
        ) {
          languagesToShow.push(tutor);
        }
      });
      if (languagesToShow) {
        setData((prev) => {
          return { response: languagesToShow, language: prev.language };
        });
      }
      setTimeout(() => setShouldLoad(false), 700);
    }

    //if only language exist
    if (country === "" && languages != "" && rating === 1) {
      setShouldLoad(true);
      let languagesToShow = [];
      const tutorsToShow = originalData.response.filter((tutor) => {
        dataApi.language.filter((lang) => {
          if (
            lang.tu_id === tutor.tu_id &&
            lang.language_names.includes(languages) &&
            tutor.first_class === switchFirst
          ) {
            languagesToShow.push(tutor);
          }
        });
      });
      if (languagesToShow) {
        setData((prev) => {
          return { response: languagesToShow, language: prev.language };
        });
      }
      setTimeout(() => setShouldLoad(false), 700);
    }
    //if country & language exist
    if ((rating === 1) & (country != "") & (languages != "")) {
      setShouldLoad(true);
      let languagesToShow = [];
      const tutorsToShow = originalData.response.filter((tutor) => {
        dataApi.language.filter((lang) => {
          if (
            lang.tu_id === tutor.tu_id &&
            lang.language_names.includes(languages) &&
            tutor.country_name.toLowerCase() === country.toLowerCase() &&
            tutor.first_class === switchFirst
          ) {
            languagesToShow.push(tutor);
          }
        });
      });
      if (languagesToShow) {
        setData((prev) => {
          return { response: languagesToShow, language: prev.language };
        });
      }
      setTimeout(() => setShouldLoad(false), 700);
    }

    //if country & rating exist
    if ((rating != 1) & (country != "") & (languages === "")) {
      setShouldLoad(true);
      let languagesToShow = [];
      const tutorsToShow = originalData.response.filter((tutor) => {
        if (
          tutor.country_name.toLowerCase() === country.toLowerCase() &&
          tutor.average_rating > rating - 0.6 &&
          tutor.first_class === switchFirst
        ) {
          languagesToShow.push(tutor);
        }
      });
      if (languagesToShow) {
        setData((prev) => {
          return { response: languagesToShow, language: prev.language };
        });
      }
      setTimeout(() => setShouldLoad(false), 700);
    }

    //if languages & rating exist
    if (country === "" && languages != "" && rating != 1) {
      setShouldLoad(true);
      let languagesToShow = [];
      const tutorsToShow = originalData.response.filter((tutor) => {
        dataApi.language.filter((lang) => {
          if (
            lang.tu_id === tutor.tu_id &&
            lang.language_names.includes(languages) &&
            tutor.average_rating > rating - 0.6 &&
            tutor.first_class === switchFirst
          ) {
            languagesToShow.push(tutor);
          }
        });
      });
      if (languagesToShow) {
        setData((prev) => {
          return { response: languagesToShow, language: prev.language };
        });
      }
      setTimeout(() => setShouldLoad(false), 700);
    }
    //if all variables exist
    if ((rating != 1) & (country != "") & (languages != "")) {
      setShouldLoad(true);

      let languagesToShow = [];
      const tutorsToShow = originalData.response.filter((tutor) => {
        dataApi.language.filter((lang) => {
          if (
            lang.tu_id === tutor.tu_id &&
            lang.language_names.includes(languages) &&
            tutor.country_name.toLowerCase() === country.toLowerCase() &&
            tutor.average_rating > rating - 0.6 &&
            tutor.first_class === switchFirst
          ) {
            languagesToShow.push(tutor);
          }
        });
      });
      if (languagesToShow) {
        setData((prev) => {
          return { response: languagesToShow, language: prev.language };
        });
      }
      setTimeout(() => setShouldLoad(false), 700);
    }
    //if none of the variables exist
    // && tutor.first_class === switchFirst
    if (
      rating === 1 &&
      country === "" &&
      languages === "" &&
      originalData?.response
    ) {
      setShouldLoad(true);

      let languagesToShow = [];
      originalData.response.filter((tutor) => {
        if (tutor.first_class === switchFirst) {
          languagesToShow.push(tutor);
        }
      });
      if (languagesToShow) {
        setData((prev) => {
          return { response: languagesToShow, language: prev.language };
        });
      }
      setTimeout(() => setShouldLoad(false), 700);
    }
  }, [rating, country, languages, switchFirst]);
  //fire country && fire language if rating is changed

  //define the array of numbers
  let mapMe = [];

  //define numbers of pages to map through array and return (i)
  if (totalPages != 0) {
    for (let i = 0; i <= totalPages - 1; i++) {
      mapMe.push(i);
    }
  }
  //fetchData from the api with params
  useEffect(() => {
    async function fetchData() {
      if (subject && level && min && max) {
        setShouldLoad(true);
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
        setTimeout(() => setShouldLoad(false), 700);
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
    } else {
      setTotalPages(6);
    }
  }, [dataApi]);

  //calculate total pages is dataApi.response.length is 0
  useEffect(() => {
    if (dataApi?.response && dataApi.response.length === 0) {
      setTotalPages(Math.floor(originalData.response.length / 6) + 1);
    }
  }, [dataApi]);

  //capitalize the first letter of string, helper function
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return (
    <section id="grid-tutors" className="h-fit">
      {shouldLoad && <Loader show={shouldLoad}></Loader>}
      <div
        id="tutors-container"
        className={`${
          shouldLoad ? "blur-md" : ""
        } px-[135px] py-[48px] flex justify-between`}
      >
        <div className="w-[25%] sticky overflow-visible">
          <FilterTutors
            languages={languages}
            setLanguages={setLanguages}
            rating={rating}
            setRating={setRating}
            dataApi={dataApi?.language}
            country={country}
            setCountry={setCountry}
            countryList={countryList}
            listLanguajes={listLanguajes}
            setListLanguages={setListLanguages}
            switchFirst={switchFirst}
            setSwitchFirst={setSwitchFirst}
          ></FilterTutors>
        </div>
        <div id="tutors-cards" className="flex flex-col gap-5  w-[70%]">
          {dataApi?.response.length === 0 && (
            <p className="flex-start text-2xl font-semibold text-blackNot">
              We didn't find any tutor With that Filters, but Here is some Nice
              Tutors!
            </p>
          )}
          {dataApi?.response.length === 0 &&
            originalData.response
              ?.slice(slice.start, slice.end)
              .map((tutor, i) => {
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
