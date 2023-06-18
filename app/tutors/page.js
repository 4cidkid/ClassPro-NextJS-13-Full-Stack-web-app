"use client";
import { ChevronLeft, ChevronRight, Search } from "react-feather";
import { useSearchParams } from "next/navigation";
import Router from "next/router";
import { searchFor, searchAny } from "./search";
import { useEffect, useState } from "react";
import SearchBar from "@/components/common/search";
import TutorsCards from "@/components/tutors/tutorsCard";
import { usePathname } from "next/navigation";
import { Loader } from "@/components/common/loading";
import { dummyData } from "./dummyData";
import Link from "next/link";
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

const GridTutors = ({ subject, level, min, max }) => {
  //data from the api
  const [dataApi, setData] = useState();
  //Work's like a switch, if DataApi hasn't loaded yet, falseData switch to true
  const [falseData, setFalseData] = useState(false);
  const [defaultPage, setDefaultPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  //slice number of tutors to show
  const [slice, setSlice] = useState({ start: 0, end: 6 });
  let mapMe = [];
  //get total number of tutors to make pagination
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
          //calculate the total number of pages that we need
          setTotalPages(Math.round(data.response.length / 6));
          setFalseData(true);
        } else {
          setFalseData(false);
          setTotalPages(Math.round(data.response.length / 6));
          setData(data);
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
        setTotalPages(Math.round(data.response.length / 6));
        setData(data);
      }
    }
    fetchData();
  }, []);
  return (
    <section id="grid-tutors" className="h-fit">
      <div id="tutors-container" className="px-[135px] py-[48px] flex">
        <div className="w-[30%]">asdfasdfasdf</div>
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
                  className={`bg-white relative w-full h-[250px] rounded-xl border-[1px] border-blackNot shadow-lg`}
                  href={`tutors/${tutor.tu_id}`}
                  key={tutor.tu_name + tutor.tu_lastname}
                >
                  <TutorsCards
                    tutor={tutor}
                    languages={languages[0].language_names}
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
      <div className="px-[135px] py-[48px]">
        <ul className="flex gap-x-12 justify-center items-center child:cursor-pointer">
          <ChevronLeft
            onClick={() => {
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
          {mapMe?.map((num) => (
            <li
              key={num}
              className={`${
                num + 1 === defaultPage
                  ? "scale-[1.5] font-bold text-main"
                  : "scale-[1] text-black"
              } text-3xl transition-transform duration-300 transition-colors`}
            >
              {num + 1}
            </li>
          ))}
          <ChevronRight
            onClick={() => {
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
        </ul>
      </div>
    </section>
  );
};

export default Tutors;
