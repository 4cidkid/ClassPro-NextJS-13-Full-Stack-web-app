"use client";
import React, { useEffect, useState } from "react";
import GoogleIcon from "@/public/socialMediaIcons/google";
import FacebookIcon from "@/public/socialMediaIcons/facebook";
import TwitterIcon from "@/public/socialMediaIcons/twitter";
import RegisterIlustration from "@/public/licenced/register";
import { Error } from "@/components/common/error";
import { CustomLoader } from "@/components/common/customLoader";
import Check from "@/public/other/check";
import Link from "next/link";
import { AtSign, ChevronDown, Lock } from "react-feather";
export default function Register() {
  //verify email validity on client side
  const regexExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //collections of users data
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    age: "",
    password: "",
    country: "",
    phone: "",
  });
  //different's steps of registration
  const [beginRegister, setBeginRegister] = useState(false);
  const [fillData, setFillData] = useState(false);
  const [checkView, setCheckView] = useState(false);
  //self explanatory, shows an error if user has not fill input correctly.
  const [error, setError] = useState("");

  //switch animations on elements
  const [animations, setAnimations] = useState({
    loadingCircle: false,
    scaleDown: false,
    hideCircle: false,
    checkScale: false,
    checkHidden: false,
    firstStepHidden: false,
    inputsFocus: {
      email: false,
      password: false,
    },
    phoneVisible: false,
  });
  const [countryWidth, setCountryWidth] = useState("");
  useEffect(() => {
    var countryWidth = document.getElementById("country-code");
    if (countryWidth) {
      setTimeout(() => {
        setCountryWidth(countryWidth.offsetWidth);
      }, 400);
    }
  }, [formData]);

  //get ip from client
  useEffect(() => {
    if (fillData) {
      async function getIp() {
        if (!localStorage.userCountry) {
          try {
            const IP = await fetch("http://ip-api.com/json");
            const dataIP = await IP.json();
            setFormData({ ...formData, country: dataIP.country });
            localStorage.setItem("userCountry", dataIP.country);
          } catch (err) {
            //
          }
        } else {
          setFormData({ ...formData, country: localStorage.userCountry });
        }
      }
      getIp();
    }
  }, [fillData]);

  //get country list from api
  const [countryList, setCountryList] = useState();
  const [dropDown, setDropDown] = useState(false);
  useEffect(() => {
    async function getCountryList() {
      const response = await fetch("/api/countries");
      const data = await response.json();
      setCountryList(data.countries);
    }
    getCountryList();
  }, []);

  return (
    <>
      <section className=" w-[100vw] h-[100vh]">
        <div
          id="register-container"
          className="px-[135px] py-[100px] flex justify-between items-center w-full h-full before:w-[50vw] before:h-[100vh] before:bg-second before:absolute before:left-0 before:z-[-1]"
        >
          <div className="w-[40%]">
            <RegisterIlustration></RegisterIlustration>
          </div>
          {beginRegister && !checkView && (
            <div
              className={` w-[50vw] h-[100vh] absolute right-0 flex justify-center items-center`}
            >
              <div
                className={`${
                  beginRegister && !animations.loadingCircle
                    ? "scaleTransition"
                    : animations.loadingCircle && !animations.scaleDown
                    ? "loadingCircle"
                    : animations.scaleDown
                    ? "scale-0"
                    : animations.hideCircle
                    ? "hidden"
                    : ""
                } transition-transform duration-300 relative w-[8vw] h-[8vw] bg-main rounded-full flex items-center justify-center`}
                onAnimationEnd={(e) => {
                  if (e.target.classList.contains("scaleTransition")) {
                    setAnimations({ ...animations, loadingCircle: true });
                  } else {
                    setAnimations({ ...animations, scaleDown: true });
                    setTimeout(() => setCheckView(true), 600);
                  }
                }}
                onTransitionEnd={(e) => {
                  if (e.target.classList.contains("scale-0")) {
                    setAnimations({ ...animations, hideCircle: true });
                  }
                }}
              >
                <div
                  className={` absolute w-[0.9vw] h-[0.9vw] bg-white  rounded-full top-0`}
                ></div>
                <div className={` rounded-full bg-white w-[6vw] h-[6vw]`}></div>
              </div>
            </div>
          )}
          {checkView && (
            <div
              className={`${
                checkView && !animations.checkScale
                  ? "scaleTransition"
                  : "scale-0"
              } ${
                animations.checkHidden ? "hidden" : ""
              } transition-transform duration-700 flex justify-center items-center w-[40%]`}
              onAnimationEnd={(e) => {
                if (e.target.classList.contains("scaleTransition")) {
                  setTimeout(() => {
                    setAnimations({ ...animations, checkScale: true });
                  }, 600);
                }
              }}
              onTransitionEnd={(e) => {
                if (e.target.classList.contains("scale-0")) {
                  setTimeout(() => {
                    setAnimations({ ...animations, checkHidden: true });
                  }, 200);
                  setTimeout(() => setFillData(true), 400);
                }
              }}
            >
              <Check classname={"w-[130px] h-[130px]"}></Check>
            </div>
          )}
          {fillData && (
            <div
              className={`${
                fillData ? "scaleTransition" : "scale-0"
              } transition-transform duration-700 w-[40%]`}
            >
              <div className="font-bold text-center flex flex-col self-center">
                <h1 className="text-5xl">
                  Fill The Form with The Required Data
                </h1>
                <form className="flex flex-col gap-5  align-start">
                  <input
                    className="w-full border-2 border-[rgba(0, 0, 0, 1)] text-xl p-2 "
                    type="text"
                    name="name"
                    placeholder="Name"
                    required
                  ></input>
                  <input
                    className="w-full border-2 border-[rgba(0, 0, 0, 1)] text-xl p-2 "
                    type="text"
                    name="lastname"
                    placeholder="Last Name"
                    required
                  ></input>
                  <input
                    className="w-full border-2 border-[rgba(0, 0, 0, 1)] text-xl p-2 "
                    type="number"
                    min={13}
                    max={120}
                    name="age"
                    placeholder="Age"
                    required
                  ></input>
                  <div>
                    <label htmlFor="countries"></label>
                    <select
                      name="countries"
                      className="border-2 w-full border-[rgba(0, 0, 0, 1)] text-xl p-2"
                      onChange={(e) => {
                        setFormData({ ...formData, country: e.target.value });
                      }}
                    >
                      {countryList.map((country) => {
                        if (
                          country.name.toLowerCase() ===
                          formData.country.toLowerCase()
                        ) {
                          return (
                            <option
                              key={country.iso}
                              value={country.name}
                              selected
                            >
                              {country.name}{" "}
                            </option>
                          );
                        } else {
                          return (
                            <option key={country.iso} value={country.name}>
                              {country.name}{" "}
                            </option>
                          );
                        }
                      })}
                    </select>
                  </div>
                  <div className="relative">
                    <div className="absolute h-full">
                      <ul className="h-full ">
                        {countryList.map((country) => {
                          if (
                            country.name.toLowerCase() ===
                            formData.country.toLowerCase()
                          ) {
                            return (
                              <li
                                id="country-code"
                                key={country.iso}
                                className="bg-second border-2 border-[rgba(0, 0, 0, 1)] h-full flex items-center gap-2 p-2"
                              >
                                <div className="w-[30%] h-full">
                                  <img
                                    className="w-full h-full"
                                    src={`/countriesFlags/${country.iso.toLowerCase()}.png`}
                                  ></img>
                                </div>
                                <p className="text-xl w-[30%]">
                                  +{country.phonecode}
                                </p>
                                <ChevronDown
                                  onClick={() => setDropDown(true)}
                                  className="w-[20%]"
                                ></ChevronDown>
                              </li>
                            );
                          }
                          // } else {
                          //   return (
                          //     <li
                          //       key={country.iso}
                          //       className="bg-second border-2 border-[rgba(0, 0, 0, 1)] h-full flex items-center gap-2 p-2"
                          //     >
                          //       <div className="w-[30%] h-full">
                          //         <img
                          //           className="w-full h-full"
                          //           src={`/countriesFlags/${country.iso.toLowerCase()}.png`}
                          //         ></img>
                          //       </div>
                          //       <p className="text-xl w-[30%]">
                          //         +{country.phonecode}
                          //       </p>
                          //       <ChevronDown className="w-[20%]"></ChevronDown>
                          //     </li>
                          //   );
                          // }
                        })}
                      </ul>
                    </div>
                    <input
                      style={{ paddingLeft: countryWidth + 20 + "px" }}
                      className={` w-full border-2 border-[rgba(0, 0, 0, 1)] text-xl p-2 `}
                      type="number"
                      min={13}
                      max={120}
                      name="age"
                    ></input>
                  </div>
                </form>
              </div>
            </div>
          )}
          <div
            className={`${beginRegister ? "scale-0" : "scale-1"} ${
              animations.firstStepHidden ? "hidden" : ""
            } transition-transform duration-300 flex flex-col gap-2  w-[40%] h-full justify-between`}
            onTransitionEnd={(e) => {
              if (e.target.classList.contains("scale-0")) {
                setAnimations({ ...animations, firstStepHidden: true });
              }
            }}
          >
            <div className="flex flex-col self-center pt-12">
              <h1 className="font-bold text-5xl text-center">
                Reach Your Academics<br></br>Goals
              </h1>
              <form
                className="flex flex-col gap-5  align-start"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (
                    !formData.email ||
                    !formData.password ||
                    !regexExp.test(formData.email)
                  ) {
                    if (!formData.email) {
                      setError("Email Cannot be blank");
                      setTimeout(() => setError(""), 4500);
                    } else if (!formData.password) {
                      setError("Password Cannot be blank");
                      setTimeout(() => setError(""), 4500);
                    } else {
                      setError("Email is Not Valid");
                      setTimeout(() => setError(""), 4500);
                    }
                    return false;
                  } else {
                    sessionStorage.setItem('email', formData.email);
                    sessionStorage.setItem('password',formData.password)
                    
                    setTimeout(() => setBeginRegister(true), 500);
                  }
                  return false;
                }}
              >
                <div className="w-full relative">
                  <input
                    className="w-full border-2 border-[rgba(0, 0, 0, 1)] text-xl p-2 "
                    placeholder="Email"
                    onChange={(e) =>
                      setFormData(() => ({
                        ...formData,
                        email: e.target.value,
                      }))
                    }
                    type="text"
                    name="email"
                    onFocus={() => {
                      setAnimations({
                        ...animations,
                        inputsFocus: {
                          ...animations.inputsFocus,
                          email: true,
                        },
                      });
                    }}
                    onBlur={() => {
                      setAnimations({
                        ...animations,
                        inputsFocus: {
                          ...animations.inputsFocus,
                          email: false,
                        },
                      });
                    }}
                    required
                  ></input>
                  <AtSign
                    className={`${
                      animations.inputsFocus.email
                        ? "opacity-1"
                        : "opacity-[0.4]"
                    } transition-opacity durantion-300 text-main absolute right-2 top-0 translate-x[50%] translate-y-[50%]`}
                  ></AtSign>
                </div>
                <div className="w-full relative">
                  <input
                    className="register-input w-full border-2  border-[rgba(0, 0, 0, 1)] text-xl p-2 "
                    placeholder="Password"
                    onChange={(e) =>
                      setFormData(() => ({
                        ...formData,
                        password: e.target.value,
                      }))
                    }
                    type="password"
                    name="password"
                    required
                    onFocus={(e) => {
                      setAnimations({
                        ...animations,
                        inputsFocus: {
                          ...animations.inputsFocus,
                          password: true,
                        },
                      });
                    }}
                    onBlur={(e) => {
                      setAnimations({
                        ...animations,
                        inputsFocus: {
                          ...animations.inputsFocus,
                          password: false,
                        },
                      });
                    }}
                  ></input>
                  <Lock
                    className={`${
                      animations.inputsFocus.password
                        ? "opacity-1"
                        : "opacity-[0.4]"
                    } transition-opacity durantion-300 text-main absolute right-2 top-0 translate-x[50%] translate-y-[50%]`}
                  ></Lock>
                </div>
                <button
                  type="submit"
                  className="text-2xl text-center bg-main p-2  text-white font-semibold"
                >
                  Sign Up With Email
                </button>
              </form>
              <div className="flex flex-col  gap-4 pt-5">
                <div className="flex justify-center items-center gap-5">
                  <div className="w-[20%] h-[2px] bg-[#444444]"></div>
                  <p>or continue with</p>
                  <div className="w-[20%] h-[2px] bg-[#444444]"></div>
                </div>
                <div className="flex justify-center child:w-[12%] gap-16 child:p-2 child:bg-white child:shadow-md">
                  <GoogleIcon></GoogleIcon>
                  <FacebookIcon></FacebookIcon>
                  <TwitterIcon></TwitterIcon>
                </div>
              </div>
            </div>
            <p className="text-center text-black">
              Already Have an Account?{" "}
              <Link href="/login" className="font-semibold text-main">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </section>
      {error && <Error error={error}></Error>}
    </>
  );
}
