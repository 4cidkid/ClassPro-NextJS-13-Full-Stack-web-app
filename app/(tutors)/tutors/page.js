"use client";

import { useSearchParams } from "next/navigation";
import SearchBar from "@/components/common/search";
import { GridTutors } from "@/components/tutors/tutorsSection";

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




export default Tutors;
