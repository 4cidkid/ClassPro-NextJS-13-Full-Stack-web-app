"use client";
import { Search } from "react-feather";
import { useSearchParams } from "next/navigation";
import Router from "next/router";
import { searchFor, searchAny } from "./search";
import { useEffect, useState } from "react";
import SearchBar from "@/components/common/search";
import TutorsCards from "@/components/tutors/tutorsCard";
import { usePathname } from "next/navigation";
import { Loader } from "@/components/common/loading";
import { dummyData } from "./dummyData";
export function Tutors() {
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
  const [dataApi, setData] = useState();
  const [falseData,setFalseData] = useState(false)
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
          setFalseData(true)
        } else {
          setFalseData(false)
          setData(data);
        }
      }
    }
    fetchData();
  }, [subject, level, min, max]);
  useEffect(() => {
    async function fetchData() {
      if (!subject || !level || !min || !max) {
        const data = await searchAny();
        setFalseData(false)
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
          {falseData && (<p>We didn't find any tutor, but Here is some Nice Tutors!</p>)}
          {(dataApi && (
            dataApi.response?.map((tutor) => {
              const languages = dataApi.language.filter((lang) => {
               
                if(tutor.tu_id === lang.tu_id){
                  return lang;
                }
              })
              return (
                <TutorsCards
                  key={tutor.ad_title + tutor.tu_lastname}
                  tutor={tutor}
                  languages={languages[0].language_names}
                ></TutorsCards>
              );
            })
          ))}
          {!dataApi && dummyData.map((data) => <TutorsCards key={data.id} class={'blur-lg'} dummy={true} tutor={data}></TutorsCards>)}
          {!dataApi &&  <Loader show={dataApi?false:true}></Loader>}
          
          
        </div>
      </div>
    </section>
  );
};

export default Tutors;
