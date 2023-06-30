import React from "react";
import {
  Calendar,
  MessageCircle,
} from "react-feather";
import Speech from "@/public/educationIcons/speech";
import Education from "@/public/educationIcons/education";
import ScheduleTutors from "@/components/tutors_profile/scheduleTutors";
export default async function TutorsID({ params }) {
  //capitalize first letter of strings
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  //do fetch request to get tutor info
  const response = await fetch(
    `http://localhost:3000/api/tutors?id=${params.id}`,
    { cache: "no-cache" }
  );
  const data = await response.json();
  const tutor = data.response[0];
  Intl.DateTimeFormat
  return (
    <>
      <section
        id="profile-tutor"
        className="flex justify-around py-[50px] px-[135px] bg-second h-fit"
      >
        <div className="flex flex-col gap-14 w-[70%]">
          <div className=" w-full flex justify-between   relative bg-white p-4 shadow-xl rounded-xl">
            <div
              id="tutor-info"
              className="flex gap-4 items-center w-full bg-white"
            >
              <div className="w-[200px] h-[200px]">
                <div className="aspect-square	 rounded-xl shadow-lg">
                  <img
                    className="object-cover w-full h-full rounded-xl"
                    src="https://images.pexels.com/photos/16786066/pexels-photo-16786066/free-photo-of-moda-hombre-gente-mujer.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  ></img>
                </div>
              </div>
              <div className="flex flex-col text-left gap-2 w-[50%]">
                <div className="flex items-center gap-2">
                  <h1 className="text-5xl font-black">
                    {tutor.tu_name} {tutor.tu_lastname}
                  </h1>
                  <img
                    className="w-[40px]"
                    src={`/countriesFlags/${tutor.c_iso}.png`}
                  ></img>
                </div>
                <ul
                  id="skills"
                  className="flex flex-wrap gap-x-2 child:text-xl"
                >
                  {tutor.tu_skills.map((skill, i) => {
                    return (
                      <li key={skill}>
                        {skill}
                        {tutor.tu_skills.length - 1 > i ? "," : "."}
                      </li>
                    );
                  })}
                </ul>
                <div id="languages" className="flex flex-col text-xl gap-2">
                  <div className="flex text-xl gap-2 items-end">
                    <div className="inline-flex">
                      <p className="flex items-center">
                        <Speech classname={"text-main"}></Speech>
                        <strong className="font-bold text-2xl">Speaks:</strong>
                      </p>
                    </div>
                    <ul className="flex gap-2">
                      {tutor.langs.map((lang, i) => {
                        return (
                          <li key={lang}>
                            {lang}
                            {tutor.langs.length - 1 > i ? "," : "."}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <div className="flex text-xl gap-2 items-end">
                    <p className="flex items-center">
                      <Education></Education>
                      <strong className="font-bold text-2xl">Teach:</strong>
                    </p>
                    {tutor.subject_names.length > 1 && (
                      <ul className="flex items-center gap-2">
                        {tutor.subject_names.map((subject, i) => {
                          return (
                            <li key={subject}>
                              {typeof subject === "string" &&
                                capitalizeFirstLetter(subject)}
                              {tutor.subject_names.length - 1 > i ? "," : "."}
                            </li>
                          );
                        })}
                      </ul>
                    )}
                    {tutor.subject_names.length === 1 && (
                      <p key={tutor.subject_names}>
                        {typeof tutor.subject_names[0] === "string" &&
                          capitalizeFirstLetter(tutor.subject_names[0])}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            id="info"
            className="bg-second w-full bg-white p-4  shadow-xl rounded-xl"
          >
            <div className="p-5 flex flex-col gap-4 ">
              <h2 className="text-4xl font-bold">
                <strong className="font-bold border-b-4 border-main">
                  About
                </strong>{" "}
                {tutor.tu_name}
              </h2>
              <p className="leading-8">{tutor.tu_desc}</p>
            </div>
          </div>
         <ScheduleTutors tutorDate={tutor.cl_date}></ScheduleTutors>
        </div>
        <div id="tutor-schedule" className="w-[23%] ">
          <div
            id="tutor-schedule-card"
            className="flex flex-col items-center h-[500px] shadow-lg top-0 sticky bg-main rounded-xl overflow-hidden text-white pb-32 justify-between "
          >
            <div className="w-full overflow-hidden h-[70%]">
              <iframe
                className="w-full scale-150  h-full rounded-t-xl"
                src="https://www.youtube.com/embed/u6mDX34_usA"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              ></iframe>
            </div>
            <div className="h-[30%] w-full flex flex-col items-center gap-5 pt-8">
              <p className="text-2xl font-semibold">{tutor.hourly} Per Hour</p>
              <button className=" justify-center text-center text-3xl bg-white text-main flex gap-2 items-center py-2 px-5 font-semibold rounded-xl w-[80%]">
                Schedule<Calendar></Calendar>
              </button>
              <button className="text-center justify-center text-2xl flex items-center py-2 px-5 w-[80%] text-white border-white border-2 rounded-xl">
                Send Message<MessageCircle></MessageCircle>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
