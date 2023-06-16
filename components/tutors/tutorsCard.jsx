import HalfStar from "@/public/reviews/halfStar";
import Star from "@/public/reviews/star";
import StarFill from "@/public/reviews/starFill";
import React from "react";
import Link from "next/link";
const TutorsCards = (props) => {
  let description = props.tutor.tu_desc;
  let newDescription = [];
  description
    .split("")
    .map((letter, i) => i <= 80 && newDescription.push(letter));
  newDescription.push("...");
  newDescription = newDescription.join("");
  const reviews = [1, 2, 3, 4, 5];
  let contador = 0;
  let languages = [];
  if (props.languages) {
    const indexEnglish = props.languages.indexOf("English");
    languages.push(props.languages[indexEnglish]);
    for (let i = indexEnglish - 1; i >= 0; i--) {
      languages.push(props.languages[i]);
    }
  }
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return (
    <Link href={'#'} className={`${props.class ? props.class : ""} w-full h-[250px] rounded-xl border-[1px] border-blackNot shadow-lg bg-white`}>
     <div
      id="card"
      className={`relative w-full h-full`}
    >
      <div className="top-[50%] -translate-y-1/2 absolute left-0 w-[220px] h-[200px] self-center rounded-xl pl-5">
        <img
          className="h-full w-full object-cover rounded-xl"
          src={`${
            props.dummy
              ? "https://media3.giphy.com/media/3oEjI6SIIHBdRxXI40/200w.gif?cid=6c09b952542dzbun2w1r7f3dk1x94igjth33h99grfpijkha&ep=v1_gifs_search&rid=200w.gif&ct=g"
              : "https://images.pexels.com/photos/16786066/pexels-photo-16786066/free-photo-of-moda-hombre-gente-mujer.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          }`}
        ></img>
      </div>
      <div className="h-[40%] bg-main rounded-tl-xl rounded-tr-xl flex items-center">
        <div id="content" className="pl-[230px]">
          <div className="flex items-center gap-3">
            <p className="text-white font-bold text-2xl flex items-center gap-3">
              {props.tutor.tu_name} {props.tutor.tu_lastname}{" "}
            </p>
            <img
              className="h-[20px] w-[30px]"
              src={`/countriesFlags/${props.tutor.country.toLowerCase()}.png`}
            ></img>
          </div>
          <div>
            <ul className="font-normal text-white flex gap-6 list-disc">
              {props.tutor.tu_skill?.map((skill,i) => (
                <li key={skill + i}>{skill}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="pl-[230px] pt-2 flex flex-col gap-2">
        <div className="flex items-center gap-5">
          <div className="flex gap-2">
            <p className="text-xl font-bold">Speaks:</p>
            <ul className="flex gap-2 items-end">
              {languages?.map((lang, i) => (
                <li key={lang} className="text-lg font-semibold">
                  {lang}
                  {i != languages.length - 1 && languages.length != 1 && ","}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex gap-2">
            <p className="text-xl font-bold">Teach:</p>
            <p className="text-lg font-semibold">
              {capitalizeFirstLetter(props.tutor.subject)}
            </p>
          </div>
        </div>
        <div id="reviews" className="flex items-center">
          <div
            id="stars"
            className="flex items-center gap-1 after:content-['|'] after:mx-2"
          >
            {reviews.map((revi, i) => {
              if (Math.round(props.tutor.average_rating) > i) {
                if (
                  i === Math.floor(props.tutor.average_rating) &&
                  props.tutor.average_rating -
                    Math.floor(props.tutor.average_rating) <
                    0.68
                ) {
                  contador++;
                  return (
                    <HalfStar
                      key={
                        props.tutor.tu_name +
                        props.tutor.tu_lastname +
                        "HalfStar" +
                        props.tutor.average_rating +
                        contador
                      }
                    ></HalfStar>
                  );
                } else {
                  contador++;
                  return (
                    <StarFill
                      key={
                        props.tutor.tu_name +
                        props.tutor.tu_lastname +
                        "StarFill" +
                        props.tutor.average_rating +
                        contador
                      }
                    ></StarFill>
                  );
                }
              } else {
                contador++;
                return (
                  <Star
                    key={
                      props.tutor.tu_name +
                      "starNormal" +
                      props.tutor.average_rating +
                      contador
                    }
                  ></Star>
                );
              }
            })}
          </div>
          <p className="after:content-['|'] after:text-black after:text-base after:content-['|'] after:mx-2">
            {props.tutor.average_rating}
          </p>
          <Link
            className="text-link after:text-black after:text-base after:content-['|'] after:mx-2"
            href={"#"}
          >
            {props.tutor.number_reviews} Reviews
          </Link>
          <p className="text-main font-semibold text-xl">
            {props.tutor.tu_hourly} USD per Hour
          </p>
        </div>
        <p>{props.tutor.ad_desc}</p>
      </div>
      {props.tutor.first_class && <div className="font-semibold text-3xl text-first_class opacity-[0.92] absolute right-5 top-[50%] translate-[-50%,-50%]">
        1st Class Free!
        </div>}
    </div>
    </Link>
  );
};

export default TutorsCards;
