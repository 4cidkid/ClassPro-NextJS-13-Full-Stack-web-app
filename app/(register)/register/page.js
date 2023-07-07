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
import { AtSign, ChevronDown, Headphones, Lock, Unlock, XCircle } from "react-feather";
import { validate } from "email-validator";
import libphonenumber from "google-libphonenumber";
import Professor from "@/public/licenced/professor";
import Messages from "@/public/licenced/messages";
import { useRouter } from "next/navigation";
export default function Register() {
  const { push } = useRouter();
  //verify phone validity client side
  const PNF = libphonenumber.PhoneNumberFormat;
  const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
  //send data switch
  const [sendInfo, setSendInfo] = useState(false);
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
  const [countryPhone, setCountryPhone] = useState("");
  //different's steps of registration
  const [beginRegister, setBeginRegister] = useState(false);
  const [fillData, setFillData] = useState(false);
  const [checkView, setCheckView] = useState(false);
  //self explanatory, shows an error if user has not fill input correctly.
  const [error, setError] = useState("");
  //saves country phone code

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
    float: true,
    whoFloat: 1,
    fillDataOut: false,
    finalAnimation: false,
    okFinalAnimation: false,
    errorFinal: false,
    passwordRequeriments: false,
    isHeightChar: false,
    haveUpperCase: false,
    haveLowerCase: false,
    haveNumber: false,
    locked: true,
  });

  //get country code element width to apply a padding in phone section
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
          const IP = await fetch("http://ip-api.com/json");
          const dataIP = await IP.json();
          if (!IP.ok) {
            setError("Something Went Wrong... ");
          } else {
            setFormData({ ...formData, country: dataIP.country });
            localStorage.setItem("userCountry", dataIP.country);
            for (let country of countryList) {
              if (
                country.name.toLowerCase() ===
                localStorage.userCountry.toLowerCase()
              ) {
                setCountryPhone(country.phonecode);
                break;
              }
            }
          }
        } else {
          for (let country of countryList) {
            if (
              country.name.toLowerCase() ===
              localStorage.userCountry.toLowerCase()
            ) {
              setCountryPhone(country.phonecode);
              break;
            }
          }
          setFormData({ ...formData, country: localStorage.userCountry });
        }
      }
      getIp();
    }
  }, [fillData]);
  //decrypt user data on user entering the register page if data exist
  useEffect(() => {
    if (
      localStorage.getItem("userEmail") &&
      localStorage.getItem("passwordEmail")
    ) {
      async function sendData() {
        const response = await fetch("/api/auth", {
          method: "POST",
          headers: {
            user: localStorage.getItem("userEmail"),
            password: localStorage.getItem("passwordEmail"),
            co: "dec",
          },
        });

        const data = await response.json();
        if (!response.ok) {
          setError(data.msg);
        } else {
          setFormData({ ...formData, email: data.user, password: data.pass });
          setBeginRegister(true);
        }
      }
      sendData();
    }
  }, []);
  //encrypt user data and save it on the browser
  useEffect(() => {
    if (beginRegister) {
      async function sendData() {
        const response = await fetch("/api/auth", {
          method: "POST",
          headers: {
            user: formData.email,
            password: formData.password,
            co: "cry",
          },
        });
        const data = await response.json();
        if (!response.ok) {
          setError(data.msg);
          setBeginRegister(false);
        } else {
          localStorage.setItem("userEmail", data.user);
          localStorage.setItem("passwordEmail", data.pass);
        }
      }
      sendData();
      setAnimations((prev) => ({
        ...prev,
        whoFloat: imageNumber + 1,
        float: false,
      }));
      setTimeout(() => setImageNumber((prev) => prev + 1), 300);
      setTimeout(
        () => setAnimations((prev) => ({ ...prev, float: true })),
        2000
      );
    }
  }, [beginRegister]);
  //get country list from api
  const [countryList, setCountryList] = useState();
  const [dropDown, setDropDown] = useState(false);
  useEffect(() => {
    async function getCountryList() {
      const response = await fetch("/api/countries");
      const data = await response.json();
      if (!response.ok) {
        setError(data.msg);
      } else {
        setCountryList(data.countries);
      }
    }
    getCountryList();
  }, []);
  //Make sure that check animation is hidden to show fill data
  useEffect(() => {
    if (animations.checkHidden) {
      setFillData(true);
    }
  }, [animations.checkHidden]);
  //Clear error after it shows on the screen
  useEffect(() => {
    if (error !== "") {
      setTimeout(() => setError(""), 4500);
    }
  }, [error]);
  //send user info
  useEffect(() => {
    if (sendInfo) {
      async function sendInfoToApi() {
        const response = await fetch("/api/users", {
          method: "POST",
          headers: {
            userData: JSON.stringify(formData),
          },
        });
        const data = await response.json();
        if (!response.ok) {
          setError(data.msg);
          setAnimations((prev) => ({ ...prev, errorFinal: true }));
        } else {
          setAnimations((prev) => ({ ...prev, okFinalAnimation: true }));
        }
      }
      sendInfoToApi();
      setTimeout(setSendInfo(false), 2000);
      setAnimations((prev) => ({
        ...prev,
        whoFloat: imageNumber + 1,
        float: false,
      }));
      setTimeout(() => setImageNumber((prev) => prev + 1), 300);
      setTimeout(
        () => setAnimations((prev) => ({ ...prev, float: true })),
        2000
      );
    }
  }, [sendInfo]);
  //transition images
  const [imageNumber, setImageNumber] = useState(1);
  //redirect user logged
  const [redirectCount, setRedirectCount] = useState(7);
  useEffect(() => {
    if (animations.finalAnimation && animations.okFinalAnimation) {
      localStorage.clear();
      if (redirectCount > 0 && redirectCount <= 7) {
        let invervalId = setInterval(() => {
          setRedirectCount((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(invervalId);
      } else {
        push("/");
      }
    }
  }, [animations.finalAnimation, animations.okFinalAnimation, redirectCount]);
  return (
    <>
      <section className=" w-[100vw] h-[100vh]">
        <div
          id="register-container"
          className="px-[135px]  flex justify-between items-center w-full h-full before:w-[50vw] before:h-[100vh] before:bg-second before:absolute before:left-0 before:z-[-1]"
        >
          <div className="relative w-[40%] overflow-x-clip h-[65%] flex flex-col gap-12">
            <RegisterIlustration
              classname={` ${
                animations.float && animations.whoFloat === 1 ? "float" : ""
              } ${
                imageNumber === 1
                  ? "translate-x-[0px]"
                  : imageNumber === 2
                  ? "translate-x-[-600px]"
                  : "hidden"
              } transition-transform w-full h-[60%]`}
            ></RegisterIlustration>
            <Professor
              classname={`${
                animations.float && animations.whoFloat === 2 ? "float" : ""
              }
              ${
                imageNumber === 2
                  ? "translate-x-[0x]"
                  : imageNumber === 1
                  ? "translate-x-[600px]"
                  : "translate-x-[-600px] relative"
              } transition-transform  top-0 w-full h-[60%] absolute`}
            ></Professor>
            <Messages
              classname={`${
                animations.float && animations.whoFloat === 3 ? "float" : ""
              }
              ${
                imageNumber === 3
                  ? "translate-x-[0x]"
                  : imageNumber === 1
                  ? "hidden"
                  : "translate-x-[600px] "
              } transition-transform top-0 w-full h-[60%] absolute`}
            ></Messages>

            <ul className="child:text-center child:list-inside text-2xl text-main list-disc flex justify-center gap-5 child:content-['']">
              <li
                className={`${
                  imageNumber === 1 ? "scale-[1.3]" : ""
                } transition-transform duration-300`}
              ></li>

              <li
                className={`${
                  imageNumber === 2 ? "scale-[1.3]" : ""
                } transition-transform duration-300`}
              ></li>
              <li
                className={`${
                  imageNumber === 3 ? "scale-[1.3]" : ""
                } transition-transform duration-300`}
              ></li>
            </ul>
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
                    ? "hidden w-[0%]"
                    : ""
                } transition-transform duration-700 relative w-[8vw] h-[8vw] bg-main rounded-full flex items-center justify-center`}
                onAnimationEnd={(e) => {
                  if (e.target.classList.contains("scaleTransition")) {
                    setAnimations((prev) => {
                      return { ...prev, loadingCircle: true };
                    });
                  } else {
                    setAnimations((prev) => {
                      return { ...prev, scaleDown: true };
                    });
                  }
                }}
                onTransitionEnd={(e) => {
                  if (e.target.classList.contains("scale-0")) {
                    setAnimations((prev) => {
                      return { ...prev, hideCircle: true };
                    });
                  }
                  setCheckView((prev) => true);
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
                animations.checkHidden ? "hidden hidden w-[0%]" : ""
              } transition-transform duration-700 flex justify-center items-center w-[40%]`}
              onAnimationEnd={(e) => {
                if (e.target.classList.contains("scaleTransition")) {
                  setAnimations((prev) => {
                    return { ...prev, checkScale: true };
                  });
                }
              }}
              onTransitionEnd={(e) => {
                if (e.target.classList.contains("scale-0")) {
                  setAnimations((prev) => {
                    return { ...prev, checkHidden: true };
                  });
                }
              }}
            >
              <Check classname={"w-[130px] h-[130px]"}></Check>
            </div>
          )}

          {animations.finalAnimation && animations.okFinalAnimation && (
            <div className="flex flex-col items-center scaleTransition w-[40%] gap-5">
              <div>
                <h2 className="font-bold text-5xl text-center flex items-center">
                  Your Account Was Successfully Created!{" "}
                  <Check classname={"w-[130px] h-[130px]"}></Check>
                </h2>
              </div>
              <div>Redirecting you in {redirectCount}....</div>
            </div>
          )}
          {animations.finalAnimation && animations.errorFinal && (
            <div className="flex flex-col items-center scaleTransition w-[40%] gap-5">
              <div>
                <h2 className="font-bold text-5xl text-center">
                  Something Went Wrong....
                </h2>
              </div>
              <div
                className={` transition-transform duration-700 flex justify-center items-center w-[40%]`}
              >
                <XCircle
                  className={"text-[#FF0000] w-[130px] h-[130px]"}
                ></XCircle>
              </div>
              <div className="flex gap-2 items-center ">
                <Link
                  href={"/support"}
                  className="flex items-center gap-2 p-2 cursor-pointer text-xl border border-[rgba(0,0,0,0.5)]"
                >
                  Contact Support <Headphones></Headphones>
                </Link>
                <Link
                  href={"#"}
                  onClick={() => window.location.reload()}
                  className="text-2xl text-center bg-main p-2 text-white font-semibold"
                >
                  Try Again
                </Link>
              </div>
            </div>
          )}

          {fillData && (
            <div
              className={`${fillData ? "scaleTransition" : "hidden"} ${
                animations.fillDataOut ? "scale-0" : ""
              } transition-transform duration-700 w-[40%]`}
              onTransitionEnd={(e) => {
                if (e.target.classList.contains("scale-0")) {
                  setFillData(false);
                  setAnimations((prev) => ({ ...prev, finalAnimation: true }));
                }
              }}
            >
              <div className="font-bold text-center flex flex-col self-center gap-8">
                <h2 className="text-5xl">
                  Fill The Form with The Required Data
                </h2>
                <div className="flex flex-col gap-5  align-start">
                  <input
                    className="w-full border-2 border-[rgba(0, 0, 0, 1)] text-xl p-2 "
                    type="text"
                    name="name"
                    placeholder="Name"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                  ></input>
                  <input
                    className="w-full border-2 border-[rgba(0, 0, 0, 1)] text-xl p-2 "
                    type="text"
                    name="lastname"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        lastName: e.target.value,
                      }))
                    }
                    required
                  ></input>
                  <input
                    className="w-full border-2 border-[rgba(0, 0, 0, 1)] text-xl p-2 "
                    type="text"
                    name="email"
                    placeholder="Last Name"
                    value={formData.email}
                    readOnly
                  ></input>
                  <input
                    className="w-full border-2 border-[rgba(0, 0, 0, 1)] text-xl p-2 "
                    type="number"
                    min={13}
                    max={120}
                    name="age"
                    placeholder="Age"
                    value={formData.age}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, age: e.target.value }))
                    }
                    required
                  ></input>
                  <div>
                    <label htmlFor="countries"></label>
                    <select
                      name="countries"
                      className="border-2 w-full border-[rgba(0, 0, 0, 1)] text-xl p-2"
                      onChange={(e) => {
                        setFormData((prev) => ({
                          ...prev,
                          country: e.target.value,
                        }));
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
                      <ul
                        className="h-full cursor-pointer unselectable"
                        onClick={() => {
                          setDropDown((prev) => {
                            return !prev;
                          });
                          document
                            .getElementById("selected-country")
                            .scrollIntoView();
                        }}
                      >
                        {countryList.map((country) => {
                          if (country.phonecode === countryPhone) {
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
                                <ChevronDown className="w-[20%]"></ChevronDown>
                              </li>
                            );
                          } else {
                            return;
                          }
                        })}
                      </ul>

                      <ul
                        className={`${
                          dropDown ? "opacity-1" : "opacity-0 w-[0%]"
                        } transition-opacity duration-300 absolute top-[100%] h-[150px] overflow-y-scroll`}
                      >
                        {countryList.map((country) => {
                          if (country.phonecode !== countryPhone) {
                            return (
                              <li
                                key={country.iso}
                                onClick={() =>
                                  setCountryPhone(country.phonecode)
                                }
                                className="bg-second cursor-pointer hover:brightness-105 unselectable border-2 border-[rgba(0, 0, 0, 1)]  flex items-center gap-2 p-2"
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
                              </li>
                            );
                          } else {
                            return (
                              <li
                                id="selected-country"
                                key={country.iso}
                                onClick={() =>
                                  setCountryPhone(country.phonecode)
                                }
                                className="bg-second cursor-pointer brightness-105 unselectable border-2 border-[rgba(0, 0, 0, 1)]  flex items-center gap-2 p-2"
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
                              </li>
                            );
                          }
                        })}
                      </ul>
                    </div>
                    <input
                      style={{ paddingLeft: countryWidth + 20 + "px" }}
                      className={` w-full border-2 border-[rgba(0, 0, 0, 1)] text-xl p-2 `}
                      type="number"
                      max={9999999999}
                      name="phone"
                      placeholder="Phone Number"
                      onChange={(e) => {
                        setFormData((prev) => {
                          return { ...prev, phone: e.target.value };
                        });
                      }}
                      value={formData.phone}
                    ></input>
                  </div>
                  <div className="flex gap-5 justify-center child:w-full">
                    <button
                      className="cursor-pointer text-xl border border-[rgba(0,0,0,0.5)]"
                      onClick={(e) => {
                        console.log("this switch");
                        e.preventDefault();
                        localStorage.removeItem("userEmail");
                        localStorage.removeItem("passwordEmail");
                        window.location.reload();
                        return false;
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={(e) => {
                        for (let [key, value] of Object.entries(formData)) {
                          if (!value) {
                            setError(`Missing ${key}`);
                            return;
                          }
                          if (key === "name" || key === "lastName") {
                            if (/\d/.test(value)) {
                              setError(
                                `Names or last Names cannot contain numbers`
                              );
                              return;
                            }
                          }
                          if (key === "age") {
                            if (parseInt(value) < 13 || parseInt(value) > 140) {
                              if (parseInt(value) < 13) {
                                setError(
                                  "You need to have at least 13 years old"
                                );
                                return;
                              }
                              if (parseInt(value) > 140) {
                                setError("Invalid Age");
                                return;
                              }
                            }
                          }
                          if (key === "phone") {
                            for (var country of countryList) {
                              if (country.phonecode === countryPhone) {
                                let number = phoneUtil.parseAndKeepRawInput(
                                  formData.phone,
                                  `${country.iso.toUpperCase()}`
                                );
                                if (
                                  !phoneUtil.isValidNumber(number) ||
                                  !number
                                ) {
                                  setError(`Invalid Phone Number`);
                                  return;
                                }
                              }
                            }
                          }
                        }
                        setAnimations((prev) => ({
                          ...prev,
                          fillDataOut: true,
                        }));
                        setSendInfo(true);
                      }}
                      className="text-2xl text-center bg-main p-2 text-white font-semibold "
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div
            className={`${beginRegister ? "scale-0" : "scale-1"} ${
              animations.firstStepHidden ? "hidden hidden w-[0%]" : ""
            } transition-transform duration-300 flex flex-col gap-2  w-[40%] justify-between h-[80%]`}
            onTransitionEnd={(e) => {
              if (e.target.classList.contains("scale-0")) {
                setAnimations((prev) => {
                  return { ...prev, firstStepHidden: true };
                });
              }
            }}
          >
            <div className="flex flex-col self-center  pt-12 gap-5">
              <h2 className="font-bold text-5xl text-center">
                Reach Your Academics<br></br>Goals
              </h2>
              <form
                className="flex flex-col gap-5  align-start"
                onSubmit={(e) => {
                  e.preventDefault();
                  var abcMayus = /[A-Z]/.test(formData.password);
                  var abcMinus = /[a-z]/.test(formData.password);
                  var containNumbers = /\d{2,}/.test(formData.password);
                  var isHeight = formData.password.length >= 8;
                  if (
                    !formData.email ||
                    !formData.password ||
                    !validate(formData.email) ||
                    !abcMayus ||
                    !abcMinus ||
                    !containNumbers ||
                    !isHeight
                  ) {
                    if (!formData.email) {
                      setError("Email Cannot be blank");
                    } else if (!formData.password) {
                      setError("Password Cannot be blank");
                    } else if (!validate(formData.email)) {
                      setError("Email is Not Valid");
                    } else {
                      setError("Password Is not Secure");
                    }
                    return false;
                  } else {
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
                      animations.inputsFocus.email || validate(formData.email)
                        ? "opacity-1"
                        : "opacity-[0.4]"
                    } transition-opacity durantion-300 text-main absolute right-2 top-0 translate-x[50%] translate-y-[50%]`}
                  ></AtSign>
                </div>
                <div className="w-full relative">
                  <input
                    className="register-input w-full border-2  border-[rgba(0, 0, 0, 1)] text-xl p-2 "
                    placeholder="Password"
                    onChange={(e) => {
                      var passw = e.target.value;
                      var abcMayus = /[A-Z]/.test(passw);
                      var abcMinus = /[a-z]/.test(passw);
                      var containNumbers = /\d{2,}/.test(passw);
                      var isHeight = passw.length >= 8;
                      setAnimations((prev) => ({
                        ...prev,
                        isHeightChar: isHeight,
                        haveUpperCase: abcMayus,
                        haveLowerCase: abcMinus,
                        haveNumber: containNumbers,
                      }));

                      setFormData(() => ({
                        ...formData,
                        password: e.target.value,
                      }));
                    }}
                    type={animations.locked ? "password": 'text'}
                    name="password"
                    required
                    onFocus={(e) => {
                      setAnimations({
                        ...animations,
                        inputsFocus: {
                          ...animations.inputsFocus,
                          password: true,
                        },
                        passwordRequeriments: true,
                      });
                    }}
                    onBlur={(e) => {
                      setAnimations({
                        ...animations,
                        inputsFocus: {
                          ...animations.inputsFocus,
                          password: false,
                        },
                        passwordRequeriments: false,
                      });
                    }}
                  ></input>
                  <div
                    onMouseDown={() => {
                      setAnimations((prev) => ({ ...prev, locked: false }));
                    }}
                    onMouseUp={() => {
                      setAnimations((prev) => ({ ...prev, locked: true }));
                    }}
                    className={`${
                      animations.inputsFocus.password || formData.password
                        ? "opacity-1"
                        : "opacity-[0.4]"
                    } cursor-pointer transition-opacity durantion-300 text-main absolute right-2 top-0 translate-x[50%] translate-y-[50%]`}
                  >
                    {animations.locked ? <Lock></Lock> : <Unlock></Unlock>}
                  </div>
                  
                </div>
                {animations.passwordRequeriments && (
                  <ul className="text-main font-medium  list-disc list-inside flex flex-col gap-2 capitalize child:transition-color child:duration-300">
                    <p className="text-black text-lg font-semibold">
                      Make Your Password Secure:
                    </p>
                    <li
                      className={
                        !animations.isHeightChar ? "text-[rgba(0,0,0,0.5)]" : ""
                      }
                    >
                      At Least 8 characters Long
                    </li>
                    <li
                      className={
                        !animations.haveUpperCase
                          ? "text-[rgba(0,0,0,0.5)]"
                          : ""
                      }
                    >
                      Contain one upperCase letter
                    </li>
                    <li
                      className={
                        !animations.haveLowerCase
                          ? "text-[rgba(0,0,0,0.5)]"
                          : ""
                      }
                    >
                      Contain One LowerCase Letter
                    </li>
                    <li
                      className={
                        !animations.haveNumber ? "text-[rgba(0,0,0,0.5)]" : ""
                      }
                    >
                      Contain at least Two Numbers
                    </li>
                  </ul>
                )}
                <button
                  type="submit"
                  className={` text-2xl text-center bg-main p-2  text-white font-semibold`}
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
