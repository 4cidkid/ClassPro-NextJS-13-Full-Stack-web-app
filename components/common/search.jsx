"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { ChevronDown, Search } from "react-feather";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
const SearchBar = ({ personalized }) => {

  //get params from current url
  const searchParams = useSearchParams();
  const subjectParam = searchParams.get("subject");
  const levelParam = searchParams.get("level");
  const min = parseInt(searchParams.get("min"));
  const max = parseInt(searchParams.get("max"));
  /* get all subjects */
  const [localSubject, setLocalSubjects] = useState([]);
  useEffect(() => {
    const getSubjects = async () => {
      const data = await fetch("http://localhost:3000/api/subjects");
      const subjects = await data.json();
      const newArray = subjects.subjects.map((sub) => {
        return sub.subject_name.toLowerCase();
      });
      setLocalSubjects(newArray);
    };
    getSubjects();
  }, []);
  /* if url contains certains params => convert the searchbar to an 'active' state */
  useEffect(() => {
    if (subjectParam && levelParam && min && max) {
      setLevel(levelParam);
      setSubject(subjectParam);
      setInputOne({ one: min, two: max });
      setPriceColor("##292929");
    }
    if (localSubject.length != 0) {
      if (
        !localSubject.includes(subjectParam.toLowerCase()) &&
        levelParam &&
        min &&
        max
      ) {

        router.replace(
          `/tutors?subject=All&level=${levelParam}&min=${min}&max=${max}`
        );
      }
      if (
        subjectParam &&
        min &&
        max &&
        !["all", "beginner", "intermediate", "advanced"].includes(
          levelParam.toLowerCase()
        )
      ) {
        router.replace(
          `/tutors?subject=${subjectParam}&level=All&min=${min}&max=${max}`
        );
      }
    }
  }, [subjectParam, levelParam, min, max, localSubject]);
  /*To replace current url on submit*/
  const router = useRouter();

  /*Values of price range, subject and level*/
  const [inputOne, setInputOne] = useState({ one: 5, two: 100 });
  const [priceRange, setPriceRange] = useState("$5 - $100");
  const [subject, setSubject] = useState("");
  const [level, setLevel] = useState("");
  /*which one of the inputs is active */
  const [selectPrice, setSelectPrice] = useState(false);
  const [selectSubject, setSelectSubject] = useState(false);
  const [selectLevel, setSelectLevel] = useState(false);
  //default color of range pricing 
  const [priceColor, setPriceColor] = useState("#A1A1A1");
  //animation if subject OR level are empty
  const [animationError, setAnimationError] = useState(false);


  const smoothScrollOne = (event) => {
    const input = event.target;
    const value = input.value;
    setInputOne((prev) => {
      return { one: value, two: prev.two };
    });
  };
  //set te value of input two
  const smoothScrollTwo = (event) => {
    const input = event.target;
    const value = input.value;

    setInputOne((prev) => {
      return { one: prev.one, two: value };
    });
  };
  useEffect(() => {
    const setError = () => setAnimationError(false);
    const timeout = setTimeout(setError, 1500);
    return () => clearTimeout(timeout, setError);
  }, [animationError]);
  const handleSubmit = () => {
    if (subject === "" || level === "" || priceRange === "") {
      setAnimationError(true);
    } else {
      router.replace(
        `/tutors?subject=${subject}&level=${level}&min=${inputOne.one}&max=${inputOne.two}`
      );
    }
  };
  //Hide current active dropdown menu on click outside targets
  useEffect(() => {
    const handleClickOutside = (e) => {
      var subject = document.getElementById("searchCat");
      var price = document.getElementById("range-ab");
      var level = document.getElementById("levelCat");
      if (
        !subject.contains(e.target) &&
        subject.classList.contains("scale-1")
      ) {
        setSelectSubject(false);
      }
      if (!price.contains(e.target) && price.classList.contains("scale-1")) {
        setSelectPrice(false);
      }
      if (!level.contains(e.target) && level.classList.contains("scale-1")) {
        setSelectLevel(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  });
  return (
    <>
      <div
        className={`${personalized || ""} ${
          animationError ? "shake" : ""
        } w-[60%] flex items-center justify-between bg-white rounded-full shadow-md border-second border-2`}
      >
        <div className="flex flex-col py-5 pl-5 relative">
          <label htmlFor="learn" className="font-bold text-xl text-[#A1A1A1]">
            What You Want To Learn?
          </label>
          <div className="relative">
            <input
              className={`text-xl font-semibold text-[#292929] ${
                subject === "" && animationError ? "" : ""
              }`}
              name="learn"
              type="text"
              placeholder="Ex: Math"
              list="learn"
              value={subject}
              onClick={() => {
                if (selectLevel) {
                  setSelectLevel(false);
                }
                if (selectPrice) {
                  setSelectPrice(false);
                }
                setSelectSubject(true);
              }}
              onChange={(e) => {
                if (e.target.value.length <= 12) {
                  setSubject(e.target.value);
                } else {
                  return;
                }
              }}
              required
            ></input>
            <div
              className={`${
                subject === "" && animationError
                  ? "opacity-1 before:z-[999]"
                  : "before:z-[-999] before:opacity-0"
              } before:content-[""]   before:border-2 before:border-main before:w-full before:h-full before:absolute before:top-0 before:left-0  `}
            ></div>
          </div>
          <div
            id="searchCat"
            className={`${
              selectSubject ? "scale-1" : "scale-0"
            } transition-transform z-[10] bg-opacity-[0.9] absolute top-[130%] flex flex-col gap-2 items-center justify-center pl-1 text-white  left-1/2  -translate-x-1/2  w-[300px] max-h-[200px] bg-main before:absolute before:content-[''] before:left-1/2 before:bottom-[100%]   before:w-[0] before:h-[0] before:-translate-x-1/2 before:border-main before:border-[20px] before:border-transparent before:border-b-[20px] before:border-t-[0] before:border-b-main before:shadow-2xl`}
          >
            <ul className="w-full h-full p-2 overflow-y-auto font-xl text-lg font-semibold">
              <SearchCat
                set={setSubject}
                subjectSelect={setSelectSubject}
                search={subject}
              ></SearchCat>
            </ul>
          </div>
        </div>
        <p className="font-bold text-2xl text-[#A1A1A1]">|</p>
        <div className="relative flex flex-col py-5">
          <div
            id="range-ab"
            className={`${
              selectPrice ? "scale-1" : "scale-0"
            } transition-transform z-[10] bg-opacity-[0.9] absolute top-[130%] flex flex-col gap-2 items-center justify-center p-10 text-white  left-1/2  -translate-x-1/2  w-[300px] h-[200px] bg-main before:absolute before:content-[''] before:left-1/2 before:bottom-[100%]   before:w-[0] before:h-[0] before:-translate-x-1/2 before:border-main before:border-[20px] before:border-transparent before:border-b-[20px] before:border-t-[0] before:border-b-main before:shadow-2xl`}
          >
            <label className="font-bold text-xl">Select The Price</label>
            <div className="flex w-full justify-evenly gap-3">
              <div className="flex flex-col items-center w-2/5">
                <label>Min</label>
                <input
                  type="text"
                  value={`$${inputOne.one}`}
                  name="min"
                  className="w-full rounded-xl text-black border-2"
                  readOnly
                ></input>
              </div>
              <div className="flex flex-col items-center w-2/5">
                <label>Max</label>
                <input
                  value={`$${inputOne.two}`}
                  type="text"
                  name="max"
                  className="w-full rounded-xl bg-gray text-black border-2"
                  readOnly
                ></input>
              </div>
            </div>
            <div className="flex relative">
              <input
                className="thumb-bg-main text-main bg-transparent appearance-none"
                type="range"
                min="5"
                max="50"
                step={5}
                value={inputOne.one}
                onInput={smoothScrollOne}
              ></input>
              <input
                className="thumb-bg-main text-main bg-transparent appearance-none"
                type="range"
                min="50"
                max="100"
                step={5}
                value={inputOne.two}
                onInput={smoothScrollTwo}
              ></input>
              <div className="absolute top-2/4 -translate-y-2/4 left-0 right-0 w-full h-[3px] z-[-1] bg-white bg-opacity-[0.5]"></div>
            </div>
            <button
              className="bg-main p-2 font-bold text-lg text-white rounded-xl border-2 border-white"
              onClick={(e) => {
                e.preventDefault();
                setPriceRange(`$${inputOne.one} - $${inputOne.two}`);
                setSelectPrice(false);
              }}
            >
              Set Price Range
            </button>
          </div>

          <label htmlFor="price" className="font-bold text-xl text-[#A1A1A1]">
            Price Range
          </label>
          <button
            id="price-range"
            className={`text-xl text-left font-semibold text-[${priceColor}]`}
            onClick={(e) => {
              setPriceColor("##292929");
              e.preventDefault();
              if (selectLevel) {
                setSelectLevel(false);
              }
              if (selectSubject) {
                setSelectSubject(false);
              }
              setSelectPrice(true);
            }}
          >
            {priceRange}
          </button>
        </div>
        <p className="font-bold text-2xl text-[#A1A1A1]">|</p>
        <div className="relative flex flex-col py-5">
          <label className="font-bold text-xl text-[#A1A1A1]">
            Level of Classes
          </label>
          <div
            className="relative flex items-center cursor-pointer"
            onClick={() => {
              if (selectSubject) {
                setSelectSubject(false);
              }
              if (selectPrice) {
                setSelectPrice(false);
              }
              setSelectLevel(true);
            }}
          >
            <p
              type="text"
              name="level"
              className="text-xl w-fit font-semibold text-[#292929]"
              placeholder="Ex:Beginner"
              readOnly
              required
            >
              {level}
            </p>
            <ChevronDown></ChevronDown>
            <div
              className={`${
                level === "" && animationError
                  ? "opacity-1 before:z-[999]"
                  : "before:z-[-999] before:opacity-0"
              } before:content-[""]  before:border-2 before:border-main before:w-full before:h-full before:absolute before:top-0 before:left-0  `}
            ></div>
          </div>
          <div
            id="levelCat"
            className={`${
              selectLevel ? "scale-1" : "scale-0"
            } shadow-2xl absolute z-[10] bg-opacity-[0.9] top-[130%] right-0 bg-black  w-[300px] max-h-[200px] transition-transform flex flex-col gap-2 items-center justify-center text-white bg-main before:absolute before:content-[''] before:left-1/2 before:bottom-[100%]   before:w-[0] before:h-[0] before:-translate-x-1/2 before:border-main before:border-[20px] before:border-transparent before:border-b-[20px] before:border-t-[0] before:border-b-main before:shadow-2xl`}
          >
            <ul className="w-full h-full p-2 overflow-y-auto text-lg font-semibold">
              <li
                onClick={(e) => {
                  setSelectLevel(false);
                  setLevel(e.target.innerText);
                }}
                className="hover:bg-white font-normal hover:text-main cursor-pointer"
              >
                All
              </li>
              <li
                onClick={(e) => {
                  setSelectLevel(false);
                  setLevel(e.target.innerText);
                }}
                className="hover:bg-white font-normal hover:text-main cursor-pointer"
              >
                Beginner
              </li>
              <li
                onClick={(e) => {
                  setSelectLevel(false);
                  setLevel(e.target.innerText);
                }}
                className="hover:bg-white font-normal hover:text-main cursor-pointer"
              >
                Intermediate
              </li>
              <li
                onClick={(e) => {
                  setSelectLevel(false);
                  setLevel(e.target.innerText);
                }}
                className="hover:bg-white font-normal hover:text-main cursor-pointer"
              >
                Advanced
              </li>
            </ul>
          </div>
        </div>
        <button
          onClick={handleSubmit}
          className="h-full w-[10%] py-2  rounded-tr-full rounded-br-full text-white bg-main"
        >
          {" "}
          <Search className="w-full h-full p-4"></Search>
        </button>
      </div>
    </>
  );
};

//get all categories and filter on user input
const SearchCat = (props) => {
  const setSelectSubject = props.subjectSelect;
  const setSubject = props.set;
  const [localSubject, setLocalSubjects] = useState([]);
  useEffect(() => {
    const getSubjects = async () => {
      const data = await fetch("http://localhost:3000/api/subjects");
      const subjects = await data.json();
      const newArray = [{ subject_id: 0, subject_name: "All" }].concat(
        subjects.subjects
      );
      setLocalSubjects(newArray);
    };
    getSubjects();
  }, []);
  let subjectsToShow = [];
  const target = props.search;
  if (target != "") {
    for (let i of localSubject) {
      if (
        i.subject_name.toLowerCase().includes(target.toLowerCase()) &&
        !subjectsToShow.includes(i.subject_name)
      ) {
        subjectsToShow.push(i.subject_name);
      }
    }
  }
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return (
    <>
      {subjectsToShow.length > 0
        ? subjectsToShow.map((subj) => (
            <li
              key={subj}
              onClick={(e) => {
                setSelectSubject(false);
                setSubject(e.target.innerText);
              }}
              className="hover:bg-white hover:text-main font-normal cursor-pointer"
            >
              {capitalizeFirstLetter(subj)}
            </li>
          ))
        : localSubject?.map((subj, i) =>
            target === "" ? (
              <li
                key={subj.subject_name}
                onClick={(e) => {
                  setSelectSubject(false);
                  setSubject(e.target.innerText);
                }}
                className="hover:bg-white hover:text-main font-normal cursor-pointer"
              >
                {capitalizeFirstLetter(subj.subject_name)}
              </li>
            ) : i == 0 ? (
              <li
                key={subj}
                className="hover:bg-white font-normal hover:text-main"
              >
                No se encontraron resultados :(
              </li>
            ) : undefined
          )}
    </>
  );
};

export default SearchBar;
