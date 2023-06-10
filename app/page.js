"use client";
import Image from "next/image";
import Connectad from "../public/connected.jsx";
import HeroImage from "../public/heroImage.jsx";
import {
  ArrowRight,
  ChevronLeft,
  Heart,
  Search,
  X,
  ChevronRight,
} from "react-feather";
import Link from "next/link";
import { useState } from "react";
export default function Home() {
  return (
    <>
      <Hero></Hero>
      <Services></Services>
      <Connected></Connected>
      <Teachers></Teachers>
    </>
  );
}

const Hero = () => {
  return (
    <section id="hero" className="h-fit pb-32 ">
      <div className="w-full h-[90vh] absolute top-0 bg-main z-[-2] clip-path"></div>
      <div
        id="hero-container"
        className="px-[135px] flex items-center pt-[100px]"
        style={{ overflowX: "clip" }}
      >
        <div className="w-3/6 text-white pr-12 flex flex-col gap-5">
          <div className="flex items-center">
            <h1 className="text-5xl font-bold whitespace-nowrap">
              Discover the <strong>Perfect Mentor</strong>
            </h1>
            <img
              src="/img/emojis/writing-hand.png"
              width={45}
              alt="writing hand emoji"
            ></img>
          </div>
          <p className="text-xl pr-5">
            Discover boundless potential with passionate teachers on ClassPro,
            realizing your dreams through transformative education and opening
            doors to a world of endless possibilities.
          </p>
          <div className="flex font-bold text-white gap-10 text-2xl">
            <Link href="#" className="bg-white text-main px-5 py-2 rounded-lg">
              Find Tutors
            </Link>
            <Link href="#" className="flex items-center">
              Became a Tutor<ArrowRight></ArrowRight>
            </Link>
          </div>
        </div>
        <div className="relative w-2/4">
          <div className="absolute top-0 w-full h-full">
            <div className="z-[-4] absolute top-0 rounded-xl right-0 w-[300px] h-[150px] bg-main text-2xl font-bold text-white items-center shadow-md  flex text-center border-gray-500 appear-2">
              <div className="w-[70%] h-full rounded-bl-xl rounded-tl-xl">
                <img
                  className="object-cover h-full rounded-bl-lg rounded-tl-lg"
                  src="https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                ></img>
              </div>
              <p className="px-2">More than 10.000 Students Are with Us!</p>
            </div>
            <div className="z-[-4] absolute rounded-xl -top-0 left-0 w-[100px] h-[100px] bg-[blue] bg-main text-2xl font-bold text-white items-center shadow-2xl  flex text-center border-gray-500 appear-3">
              <img
                className="object-cover h-full rounded-lg"
                src="https://images.pexels.com/photos/1326946/pexels-photo-1326946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              ></img>
            </div>
          </div>
          <HeroImage></HeroImage>
        </div>
      </div>
    </section>
  );
};
const Services = () => {
  //this controlls input price range
  const [inputOne, setInputOne] = useState({ one: 5, two: 100 });
  //smooth scroll for the range input and set the value from input one p.s: thanks chatgpt, but i think that this dosn't work lol
  const smoothScrollOne = (event) => {
    const range = event.target;
    const value = range.value;
    const element = range.parentElement;
    const scrollTarget =
      (element.scrollWidth * (value - range.min)) / (range.max - range.min);

    element.scrollTo({
      left: scrollTarget,
      behavior: "smooth",
    });
    setInputOne((prev) => {
      return { one: value, two: prev.two };
    });
  };
  //set te value of input two
  const smoothScrollTwo = (event) => {
    const range = event.target;
    const value = range.value;
    const element = range.parentElement;
    const scrollTarget =
      (element.scrollWidth * (value - range.min)) / (range.max - range.min);

    element.scrollTo({
      left: scrollTarget,
      behavior: "smooth",
    });
    setInputOne((prev) => {
      return { one: prev.one, two: value };
    });
  };
  return (
    <section id="services" className="bg-second pb-10">
      <div className="services-container flex justify-center">
        <div className="w-[50%] flex items-center justify-between bg-white rounded-full shadow-md -mt-12 border-second border-2">
          <div className="flex flex-col py-5 pl-5">
            <label htmlFor="learn" className="font-bold text-xl text-[#A1A1A1]">
              What You Want To Learn?
            </label>
            <input
              className="text-xl"
              name="learn"
              type="text"
              placeholder="Ex: Math"
            ></input>
          </div>
          <p className="font-bold text-2xl text-[#A1A1A1]">|</p>
          <div className="relative flex flex-col py-5">
            <div
              id="range"
              className="transition-transform scale-0  absolute bottom-[130%] flex flex-col gap-2 items-center justify-center p-10  left-1/2  -translate-x-1/2  w-[300px] h-[200px] bg-white before:absolute before:content-[''] before:left-1/2 before:top-[100%]  before:w-[0] before:h-[0] before:-translate-x-1/2 before:border-main before:border-[20px] before:border-transparent before:border-b-[20px] before:border-t-[0] before:border-b-white before:rotate-180 shadow-2xl"
            >
              <label className="font-bold text-xl">Select The Price</label>
              <div className="flex w-full justify-evenly gap-3">
                <div className="flex flex-col items-center w-2/5">
                  <label>Min</label>
                  <input
                    type="text"
                    value={`$${inputOne.one}`}
                    className="w-full rounded-xl border-2"
                    readOnly
                  ></input>
                </div>
                <div className="flex flex-col items-center w-2/5">
                  <label>Max</label>
                  <input
                    value={`$${inputOne.two}`}
                    type="text"
                    className="w-full rounded-xl bg-gray border-2"
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
                <div className="absolute top-2/4 -translate-y-2/4 left-0 right-0 w-full h-[3px] z-[-1] bg-black"></div>
              </div>
              <button
                className="bg-main p-2 font-bold text-lg text-white rounded-xl"
                onClick={(e) => {
                  let rangePrice =
                    e.currentTarget.parentElement.parentElement.querySelector(
                      "#price-range"
                    );
                  e.currentTarget.parentElement.classList.remove("scale-1");
                  e.currentTarget.parentElement.classList.add("scale-0");
                  rangePrice.innerText = `$${inputOne.one} - $${inputOne.two}`;
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
              className="text-xl"
              onClick={(e) => {
                const classesList = Array.from(
                  e.currentTarget.parentElement.children[0].classList
                );
                let classIs;
                classesList.filter((clase) => {
                  if (clase == "scale-0") {
                    classIs = true;
                  }
                });
                if (classIs) {
                  e.currentTarget.parentElement.children[0].classList.remove(
                    "scale-0"
                  );
                  e.currentTarget.parentElement.children[0].classList.add(
                    "scale-1"
                  );
                } else {
                  e.currentTarget.parentElement.children[0].classList.remove(
                    "scale-1"
                  );
                  e.currentTarget.parentElement.children[0].classList.add(
                    "scale-0"
                  );
                }
              }}
            >
              $0 - $100
            </button>
          </div>
          <p className="font-bold text-2xl text-[#A1A1A1]">|</p>
          <div className="flex flex-col py-5">
            <label className="font-bold text-xl text-[#A1A1A1]">
              Level of Classes
            </label>
            <input type="text" placeholder="Ex:beginner"></input>
          </div>
          <button className="h-full w-[10%]  rounded-tr-full rounded-br-full text-white bg-main">
            {" "}
            <Search className="w-full h-full p-4"></Search>
          </button>
        </div>
      </div>
      <div className="services-list flex justify-center flex-col items-center mx-[135px] gap-4 mt-5 pb-14 bg-white rounded-xl shadow-lg">
        <div className="pt-14 w-[70%] text-center flex flex-col items-center font-bold text-3xl">
          <h2 className="text-gray-900 ">
            Unlock Your Full Potential: Connect with{" "}
            <strong className="text-main">Expert Teachers Today!</strong>
          </h2>
          <p className="text-xl font-medium opacity-[0.6] ">
            Empowering Students to Achieve Academic Excellence Through
            Personalized Tutoring.
          </p>
        </div>
        <div className=" w-[90%] justify-center flex flex-wrap child:p-5 gap-[0.33%] child:rounded-xl child:items-center child:gap-5 child:justify-center">
          <div className="parentsvg basis-[33%] flex transition-all duration-300">
            <svg
              className="w-[25%]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M17 3v-2c0-.552.447-1 1-1s1 .448 1 1v2c0 .552-.447 1-1 1s-1-.448-1-1zm-12 1c.553 0 1-.448 1-1v-2c0-.552-.447-1-1-1-.553 0-1 .448-1 1v2c0 .552.447 1 1 1zm13 13v-3h-1v4h3v-1h-2zm-5 .5c0 2.481 2.019 4.5 4.5 4.5s4.5-2.019 4.5-4.5-2.019-4.5-4.5-4.5-4.5 2.019-4.5 4.5zm11 0c0 3.59-2.91 6.5-6.5 6.5s-6.5-2.91-6.5-6.5 2.91-6.5 6.5-6.5 6.5 2.91 6.5 6.5zm-14.237 3.5h-7.763v-13h19v1.763c.727.33 1.399.757 2 1.268v-9.031h-3v1c0 1.316-1.278 2.339-2.658 1.894-.831-.268-1.342-1.111-1.342-1.984v-.91h-9v1c0 1.316-1.278 2.339-2.658 1.894-.831-.268-1.342-1.111-1.342-1.984v-.91h-3v21h11.031c-.511-.601-.938-1.273-1.268-2z" />
            </svg>
            <div className="w-[75%]">
              <strong className="text-lg">Flexible Scheduling</strong>
              <p className="text-sm">
                Enjoy the convenience of scheduling lessons at your preferred
                time slots, accommodating your busy schedule and ensuring
                optimal learning opportunities.
              </p>
            </div>
          </div>
          <div className="parentsvg basis-[33%] flex transition-all duration-300">
            <svg
              className="w-[25%]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M18.604 16.111c.018.276.048.531.092.758-.583.106-.606-.469-.092-.758zm-4.354.16h.996l-.498-1.43-.498 1.43zm2.75-6.105c3.697 0 7 2.465 7 5.837 0 1.196-.432 2.37-1.193 3.281-.033 1.068.596 2.6 1.162 3.715-1.518-.274-3.676-.88-4.654-1.48-5.387 1.313-9.315-1.984-9.315-5.516 0-3.39 3.326-5.837 7-5.837zm-.437 7.584l-1.44-3.792h-.76l-1.447 3.792h.812l.312-.875h1.422l.313.875h.788zm3.988-2.296l.079-.353-.642-.125-.064.292c-.215-.032-.445-.036-.679-.012l.028-.458h.717v-.608h-.631l.084-.335-.627-.188c-.046.154-.084.304-.123.523h-.715v.608h.638c-.018.196-.026.399-.03.605-.704.259-1.002.751-1.002 1.198 0 .528.416.992 1.074.932.817-.074 1.362-.691 1.682-1.45.332.19.471.511.346.807-.115.275-.455.536-1.104.523v.654c.721.011 1.429-.262 1.707-.923.27-.647-.041-1.352-.738-1.69zm-1.25 1.073c.17-.177.305-.401.407-.626-.147-.013-.306-.009-.462.012.011.22.028.425.055.614zm-10.492 2.703c-1.887-.271-3.571-1.165-4.827-2.478-.182-.189-.315-.636-.019-.819l.302-.078c.235-.199-.221-1.009-.04-1.14.561-.401.295-.893-.051-1.299-.146-.172-.948-1-1.038-.853.067-.226-.146-.772-.274-.987-.217-.362-.502-.585-.617-.982-.046-.158-.046-.64-.139-.751-.038-.045-.327-.167-.317-.233.278-1.655 1.044-3.143 2.149-4.318l.746-.301c.468-.703.495-.158.916-.341.141 0 .301-.578.452-.667.261-.169.062-.169.013-.245-.104-.168 2.191-1.003 2.229-.853.032.127-1.135.734-1.007.716-.296.039-.352.571-.297.568.147-.005 1.074-.704 1.506-.555.423.146 1.183-.336 1.48-.582.149-.125.286-.344.483-.344.909 0 2.268.374 2.579.56.474.283-.204.263-.277.447-.058.142-.19.335-.249.412-.102.133-.399.077-.341-.082.059-.167.348-.231-.086-.271-.445-.041-.568-.341-1.014.034-.134.113-.234.286-.321.433-.123.21-.42.201-.544.396-.12.192.07.512.304.371.062-.038.765.645.674.095-.059-.364.196-.612.201-.887.003-.184.28-.066.206.03-.097.121-.203.534.051.554.096.008.339-.158.425-.084-.096-.002-.315.383-.3.376-.108.048-.233-.021-.15.21.074.228-.408.201-.495.247-.037.02-.417-.114-.408-.028-.131-.109.037-.379-.072-.422-.11.168-.058.512-.294.512-.202 0-.482.229-.604.369-.087.097-.609.308-.666.302.299.031.286.25.261.437-.06.433-.995.032-.956.196.038.158-.107.586-.139.724-.029.125.402.205.378.267.002-.007.583-.199.64-.25l.131-.293c.11-.073.226-.133.35-.179l.149-.258c.05-.02.645-.112.686-.092.149.068.428.353.532.483.036.047.227.117.227.188.069.107-.051.148-.006.223.104.193.132-.401.087-.29 0-.189.142.071.174.049l-.657-.654c-.204-.342.543.183.64.247.096.063.285.629.537.501.158-.08-.004-.139.106-.229l.449-.09c-.357.261.279.602.182.556.16.074.254-.058.354-.021.057.022.663.015.566-.082.151.076.082.748-.044.851-.204.169-1.182.1-1.399-.057-.361-.262-.297.279-.473.352-.344.142-.857-.463-1.218-.482.176.026.015-.445.015-.478-.139-.171-1.02.019-1.252.05-.434.058-.89.052-1.223.324-.234.189-.237.5-.477.651-.156.095-.325.064-.456.189-.234.222-.504.552-.637.845-.054.123.072.416.041.574-.307.967.076 2.308 1.248 2.456.25.032.506.144.759.117 1.332-2.88 4.568-4.92 8.347-4.92.932 0 1.831.124 2.678.354-1.105-4.322-5.012-7.521-9.678-7.521-5.523 0-10 4.477-10 10s4.477 10 10 10l.074-.004c-.509-.533-.931-1.128-1.265-1.766zm4.778-13.035c.068-.008-.089.138-.089.138.027.212.183.327.479.435.36.129.03.375-.176.317-.114-.032-.704-.21-.725.021 0 .138-.56.001-.473-.145.061-.098.041-.319.152-.464.16-.21.313-.096.318.026.002.327.332-.306.514-.328zm-4.532-.292c.08.113.688-.163.591-.146.187-.094.024-.104-.082-.159-.035-.179-.065-.456-.177-.566l.074-.085c-.173-.249-.301.302-.301.302l.09-.026-.042.113c.071.129.019.207.007.277l-.124.077c-.045.055.215.062.217.071.009.028-.313.074-.253.142zm-.396-.286c-.069.071.002.116.073.085.104-.045.244-.044.26-.183l.066-.084c.029-.043-.057-.114-.092-.121l-.124.086-.061.016-.056.072.006.04-.072.089zm2.634 2.107c-.055 0-.369.029-.34.084.178.293.403-.076.34-.084z" />
            </svg>
            <div className="w-[75%]">
              <strong className="text-lg">Seamless Communication</strong>
              <p className="text-sm">
                Stay connected with your teachers through a built-in messaging
                system, facilitating easy and efficient communication for
                scheduling lessons, asking questions, and receiving feedback.
              </p>
            </div>
          </div>
          <div className="parentsvg basis-[33%] flex transition-all duration-300">
            <svg
              className="w-[25%]"
              xmlns="http://www.w3.org/2000/svg"
              clipRule="evenodd"
              viewBox="0 0 24 24"
            >
              <path d="M17 24h-10v-1.342c1.808-.985 2.005-2.205 2-3.658h-8c-.265 0-.52-.105-.707-.293-.188-.187-.293-.442-.293-.707v-17c0-.265.105-.52.293-.707.187-.188.442-.293.707-.293h22c.265 0 .52.105.707.293.188.187.293.442.293.707v17c0 .265-.105.52-.293.707-.187.188-.442.293-.707.293h-8c.004 1.374.155 2.66 2 3.658v1.342zm-3.984-5h-2.044c-.015.802.004 2.003-.719 3h3.493c-.757-1.02-.716-2.25-.73-3zm8.984-5h-20v3h20v-3zm-10 .537c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1zm-10-12.537v10h20v-10h-20z" />
            </svg>{" "}
            <div className="w-[75%]">
              <strong className="text-lg">Virtual Classroom Experience</strong>
              <p className="text-sm">
                Engage in interactive and immersive virtual classrooms equipped
                with innovative tools, allowing for real-time collaboration,
                screen sharing, document sharing, and multimedia integration.
              </p>
            </div>
          </div>
          <div className="parentsvg basis-[33%] flex transition-all duration-300">
            <svg
              className="w-[25%]"
              clipRule="evenodd"
              strokeMiterlimit="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m14.776 18.689 7.012-7.012c.133-.133.217-.329.217-.532 0-.179-.065-.363-.218-.515l-2.423-2.415c-.144-.143-.333-.215-.522-.215s-.378.072-.523.215l-7.027 6.996c-.442 1.371-1.158 3.586-1.265 3.952-.125.433.199.834.573.834.41 0 .696-.099 4.176-1.308zm-2.258-2.392 1.17 1.171c-.704.232-1.275.418-1.729.566zm.968-1.154 5.356-5.331 1.347 1.342-5.346 5.347zm-4.486-1.393c0-.402-.356-.75-.75-.75-2.561 0-2.939 0-5.5 0-.394 0-.75.348-.75.75s.356.75.75.75h5.5c.394 0 .75-.348.75-.75zm5-3c0-.402-.356-.75-.75-.75-2.561 0-7.939 0-10.5 0-.394 0-.75.348-.75.75s.356.75.75.75h10.5c.394 0 .75-.348.75-.75zm0-3c0-.402-.356-.75-.75-.75-2.561 0-7.939 0-10.5 0-.394 0-.75.348-.75.75s.356.75.75.75h10.5c.394 0 .75-.348.75-.75zm0-3c0-.402-.356-.75-.75-.75-2.561 0-7.939 0-10.5 0-.394 0-.75.348-.75.75s.356.75.75.75h10.5c.394 0 .75-.348.75-.75z"
                fillRule="nonzero"
              />
            </svg>{" "}
            <div className="w-[75%]">
              <strong className="text-lg">Personalized Matching</strong>
              <p className="text-sm">
                Our app utilizes advanced algorithms to match students with the
                most suitable teachers based on their individual needs,
                preferences, and learning styles.
              </p>
            </div>
          </div>
          <div className="parentsvg basis-[33%] flex transition-all duration-300">
            <svg
              className="w-[25%]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21 10c1.103 0 2 .897 2 2s-.897 2-2 2h-18c-1.103 0-2-.897-2-2s.897-2 2-2h18zm3 2c0-1.657-1.343-3-3-3h-18c-1.657 0-3 1.343-3 3s1.343 3 3 3h18c1.657 0 3-1.343 3-3zm-9-1h-12c-.552 0-1 .448-1 1s.448 1 1 1h12c.552 0 1-.448 1-1s-.448-1-1-1z" />
            </svg>
            <div className="w-[75%]">
              <strong className="text-lg">Progress Tracking</strong>
              <p className="text-sm">
                Keep track of your progress with detailed performance analytics,
                including lesson history, assessment results, and personalized
                recommendations.
              </p>
            </div>
          </div>
          <div className="parentsvg basis-[33%] flex  transition-all duration-300">
            <svg
              className="w-[25%]"
              xmlns="http://www.w3.org/2000/svg"
              clipRule="evenodd"
              viewBox="0 0 24 24"
            >
              <path d="M6 3.447h-1v-1.447h19v16h-7.731l2.731 4h-1.311l-2.736-4h-1.953l-2.736 4h-1.264l2.732-4h-2.732v-1h8v-1h3v1h3v-14h-17v.447zm2.242 17.343c-.025.679-.576 1.21-1.256 1.21-.64 0-1.179-.497-1.254-1.156l-.406-4.034-.317 4.019c-.051.656-.604 1.171-1.257 1.171-.681 0-1.235-.531-1.262-1.21l-.262-6.456-.308.555c-.241.437-.8.638-1.265.459-.404-.156-.655-.538-.655-.951 0-.093.012-.188.039-.283l1.134-4.098c.17-.601.725-1.021 1.351-1.021h4.096c.511 0 1.012-.178 1.285-.33.723-.403 2.439-1.369 3.136-1.793.394-.243.949-.147 1.24.217.32.396.286.95-.074 1.297l-3.048 2.906c-.375.359-.595.849-.617 1.381-.061 1.397-.3 8.117-.3 8.117zm-5.718-10.795c-.18 0-.34.121-.389.294-.295 1.04-1.011 3.666-1.134 4.098l1.511-2.593c.172-.295.623-.18.636.158l.341 8.797c.01.278.5.287.523.002 0 0 .269-3.35.308-3.944.041-.599.449-1.017.992-1.017.547.002.968.415 1.029 1.004.036.349.327 3.419.385 3.938.043.378.505.326.517.022 0 0 .239-6.725.3-8.124.033-.791.362-1.523.925-2.061l3.045-2.904c-.661.492-2.393 1.468-3.121 1.873-.396.221-1.07.457-1.772.457h-4.096zm16.476 1.005h-5v-1h5v1zm2-2h-7v-1h7v1zm-15.727-4.994c-1.278 0-2.315 1.038-2.315 2.316 0 1.278 1.037 2.316 2.315 2.316s2.316-1.038 2.316-2.316c0-1.278-1.038-2.316-2.316-2.316zm0 1c.726 0 1.316.59 1.316 1.316 0 .726-.59 1.316-1.316 1.316-.725 0-1.315-.59-1.315-1.316 0-.726.59-1.316 1.315-1.316zm15.727 1.994h-7v-1h7v1z" />
            </svg>
            <div className="w-[75%]">
              <strong className="text-lg">Extensive Teacher Profiles</strong>
              <p className="text-sm">
                Gain insights into teachers' qualifications, expertise, teaching
                styles, and reviews from previous students to make an informed
                decision.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
const Connected = () => {
  return (
    <section id="connected" className="bg-second pt-5">
      <div className="mx-[135px] bg-white rounded-xl shadow-lg">
        <div className="py-10 px-12 flex justify-between items-center">
          <div className="w-[40%] flex flex-col gap-3">
            <h3 className="text-2xl font-bold">
              Access the Power of Online Learning with Classpro: 4 Compelling
              Reasons to Get Connected
            </h3>
            <p className="text-sm">
              ClassPro opens the doors to your full learning potential. Our
              platform connects you with exceptional teachers who are experts in
              their fields. Whether you're seeking guidance in mathematics,
              science, languages, or any other subject, ClassPro has a diverse
              range of qualified teachers ready to help you succeed.
            </p>
            <ul className="w-full list-disc pl-5 text-sm gap-2 flex flex-col">
              <li>User-friendly interface</li>
              <li>Cutting-edge online learning resources</li>
              <li>Engaging and effective educational experience</li>
              <li>Transformative journey towards academic excellence</li>
            </ul>
            <Link
              href={"#"}
              className="bg-main px-5 py-2 w-fit font-bold text-white rounded-lg"
            >
              Join ClassPro
            </Link>
          </div>
          <div className="w-[40%]">
            <Connectad></Connectad>
          </div>
        </div>
      </div>
    </section>
  );
};
const Teachers = () => {
  const [slider, setSlider] = useState({
    left: "slider-left",
    right: "slider-right",
    center: "slider-center",
  });
  const [izquier, setIzquier] = useState("");
  const [derech, setDerech] = useState("");

  const [who, setWho] = useState("");
  const attributes = {
    left: `absolute translate-x-[-8rem] top-0 scale-90 blur-sm -rotate-12 blur ${
      izquier == true && izquier != "" ? "z-[3]" : "z-[0]"
    }`,
    right: `absolute translate-x-[8rem] top-0 scale-90 blur-sm rotate-12 blur ${
      derech && derech != "" ? "z-[3]" : "z-[0]"
    }`,
    center: "relative z-[2] top-0 unblur",
  };
  return (
    <section id="teachers" className="bg-second py-24">
      <div className="bg-white mx-[135px] px-16">
        <div className="py-12 flex justify-around items-center">
          <div className="w-[30%] flex flex-col gap-4">
            <h4 className="text-2xl font-bold">
              Look at This Top Rated Teachers!
            </h4>
            <p>
              They are passionate, knowledgeable, and dedicated to igniting the
              spark of learning in every student. With their expertise and
              unwavering commitment, they inspire, empower, and shape the minds
              of future generations. Prepare to be amazed by the incredible
              impact they make on education
            </p>
            <Link
              className="bg-main text-white px-5 py-2 rounded-lg w-fit font-bold"
              href={"#"}
            >
              See more
            </Link>
          </div>
          <div id="cards" className="w-fit relative">
            <ChevronLeft
              className="cursor-pointer absolute w-[25%] h-auto -left-[8rem] top-[50%] -translate-y-2/4 rounded-full bg-main text-white z-10"
              onClick={() => {
                switch (slider.left) {
                  case "slider-left":
                    setSlider({
                      left: "slider-center",
                      right: "slider-left",
                      center: "slider-right",
                    });
                    break;
                  case "slider-right":
                    setSlider({
                      left: "slider-left",
                      right: "slider-right",
                      center: "slider-center",
                    });
                    break;
                  case "slider-center":
                    setSlider({
                      left: "slider-right",
                      right: "slider-center",
                      center: "slider-left",
                    });
                }
                setDerech(true);
              }}
            ></ChevronLeft>
            <div
              id={slider.center}
              className={`${
                slider.center === "slider-left" ? attributes.left : ""
              } ${slider.center === "slider-right" ? attributes.right : ""} ${
                slider.center === "slider-center" ? attributes.center : ""
              } transition-transform duration-[300ms]  w-[350px] rounded-xl bg-white flex flex-col items-center gap-6 `}
              onTransitionEnd={() => {
                setIzquier("");
                setDerech("");
              }}
            >
              <div className="w-full h-full flex rounded-xl shadow-xl flex-col items-center gap-4">
                <div className="w-full h-[500px] flex flex-col items-center">
                  <div className="w-full h-[65%]">
                    <img
                      className="w-full h-full object-cover rounded-tl-xl  rounded-tr-xl "
                      src="https://images.pexels.com/photos/428328/pexels-photo-428328.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    ></img>
                  </div>
                  <div className="w-full text-center pt-5 h-[30%] px-12">
                    <p className="text-2xl font-bold opacity-[0.7]">
                      John Anderson
                    </p>
                    <p className="text-lg font-semibold">Quantum Physics</p>
                    <p className="text-sm font-normal opacity-[0.5] text">
                      Passionate about quantum physics, dedicated to inspiring
                      students to explore the mysteries of the universe.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              id={slider.right}
              className={`${
                slider.right === "slider-left" ? attributes.left : ""
              } ${slider.right === "slider-right" ? attributes.right : ""} ${
                slider.right === "slider-center" ? attributes.center : ""
              }  transition-transform duration-[300ms]  w-[350px] rounded-xl  bg-white flex flex-col items-center gap-6  `}
              onTransitionEnd={() => {
                setIzquier("");
                setDerech("");
              }}
            >
              <div className="w-full h-full flex rounded-xl shadow-xl flex-col items-center gap-4">
                <div className="w-full h-[500px] flex flex-col items-center">
                  <div className="w-full h-[65%]">
                    <img
                      className="w-full h-full object-cover rounded-tl-xl  rounded-tr-xl "
                      src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    ></img>
                  </div>
                  <div className="w-full text-center pt-5 h-[30%] px-12">
                    <p className="text-2xl font-bold opacity-[0.7]">
                      Sarah Davis
                    </p>
                    <p className="text-lg font-semibold">English literature</p>
                    <p className="text-sm font-normal opacity-[0.5] text">
                      Expert in English literature, fosters a love for reading
                      and critical analysis in my classes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              id={slider.left}
              className={`${
                slider.left === "slider-left" ? attributes.left : ""
              } ${slider.left === "slider-right" ? attributes.right : ""} ${
                slider.left === "slider-center" ? attributes.center : ""
              } transition-transform duration-[300ms]  w-[350px] rounded-xl z-[0] bg-white flex flex-col items-center gap-6`}
              onTransitionEnd={() => {
                setIzquier("");
                setDerech("");
              }}
            >
              <div className="w-full h-full flex rounded-xl shadow-xl flex-col items-center gap-4">
                <div className="w-full h-[500px] flex flex-col items-center">
                  <div className="w-full h-[65%]">
                    <img
                      className="w-full h-full object-cover rounded-tl-xl  rounded-tr-xl "
                      src="https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    ></img>
                  </div>
                  <div className="w-full text-center pt-5 h-[30%] px-12">
                    <p className="text-2xl font-bold opacity-[0.7]">
                      Emily Thompson
                    </p>
                    <p className="text-lg font-semibold">Math Teacher</p>
                    <p className="text-sm font-normal opacity-[0.5] text">
                      Dedicated math educator fostering student growth and
                      enthusiasm through engaging instruction and personalized
                      support.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <ChevronRight
              className="cursor-pointer absolute w-[25%] h-auto -right-[8rem] top-[50%] -translate-y-2/4 rounded-full bg-main text-white z-10"
              onClick={() => {
                switch (slider.right) {
                  case "slider-right":
                    setSlider({
                      left: "slider-right",
                      right: "slider-center",
                      center: "slider-left",
                    });
                    break;
                  case "slider-left":
                    setSlider({
                      left: "slider-left",
                      right: "slider-right",
                      center: "slider-center",
                    });
                    break;
                  case "slider-center":
                    setSlider({
                      left: "slider-center",
                      right: "slider-left",
                      center: "slider-right",
                    });
                }
                setIzquier(true);
              }}
            ></ChevronRight>
          </div>
        </div>
      </div>
    </section>
  );
};
