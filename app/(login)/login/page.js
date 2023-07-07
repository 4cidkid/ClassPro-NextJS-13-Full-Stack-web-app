"use client";
import React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Lock, Unlock, AtSign } from "react-feather";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import BackgroundSVG from "@/public/other/backgrounSVG";
import { validate } from "email-validator";
import { Error } from "@/components/common/error";
import Check from "@/public/other/check";
import { XCircle, Headphones } from "react-feather";
import { useRouter } from "next/navigation";
export default function LoginPage() {
  const {push} = useRouter()
  //user data states
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  //animations state
  const [animations, setAnimations] = useState({
    inputsFocus: {
      email: false,
      password: false,
    },
    locked: true,
    loginFormVisible: true,
    accountYetVisible: true,
    googleAuthVisible: true,
    circleAnimation: '',
    loadingCircleScale: true,
    loadingOut:false
  });
  //self explanatory, shows an error if user has not fill input correctly.
  const [error, setError] = useState("");
  //login state control
  const [login, setLogin] = useState(false);
  //do fetch to api endpoint auth to login user
  useEffect(() => {
    if (
      login &&
      !animations.loginFormVisible &&
      !animations.accountYetVisible &&
      !animations.googleAuthVisible
    ) {
      setLoading(true);
      const handleLogin = async () => {
        const response = await fetch("/api/auth", {
          method: "POST",
          headers: {
            userdata: JSON.stringify(formData),
          },
        });
        const data = await response.json();
        if (!response.ok) {
          setError(data.msg);
          setLogin(false);
          setAnimations((prev) => ({
            ...prev,
            loginFormVisible: true,
            accountYetVisible: true,
            googleAuthVisible: true,
          }));
        } else {
          setTimeout(() => setAnimations((prev) => ({...prev,loadingCircleScale:''})), 3000)
        }
      };
      handleLogin();
    }
  }, [
    login,
    animations.loginFormVisible,
    animations.accountYetVisible,
    animations.googleAuthVisible,
  ]);
  //loading state
  const [loading, setLoading] = useState(false);
  //Clear error after it shows on the screen
  useEffect(() => {
    if (error !== "") {
      setTimeout(() => setError(""), 4500);
    }
  }, [error]);
  //result of login
  const [result, setResult] = useState({
    status: "",
    message: "",
  });
  //count to redirect user
  const [redirectCount, setRedirectCount] = useState(7);
  //reduce count
  useEffect(() => {
    if (result.status && redirectCount !== 0) {
      var intervalId;
      intervalId = setInterval(() => {
        setRedirectCount((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    }else if(result.status && redirectCount === 0){
      push('/tutors')
    }
  }, [result,redirectCount]);
  useEffect(() => {
    if(animations.loadingOut){
      setLoading(false)
      setTimeout(() => setResult({ message: "Successfully Logged!", status: true }),500)
    }
  },[animations.loadingOut])
  return (
    <>
      <section id="login" className="h-[100vh]">
        <div className="flex w-full h-full overflow-clip">
          <div className="relative flex flex-col w-[70%] h-full">
            <header className="pl-[20px] py-[10px] text-4xl font-black">
              <div id="logo">
                <Link className=" " href={"/"}>
                  Classpro
                </Link>
              </div>
            </header>
            {animations.loginFormVisible && (
              <div
                className={`${
                  !login ? "" : "scale-0"
                } transition-transform  flex flex-col items-center gap-5`}
                onTransitionEnd={(e) => {
                  if (e.target.classList.contains("scale-0")) {
                    setAnimations((prev) => ({
                      ...prev,
                      loginFormVisible: false,
                    }));
                    setLoading(true)
                    setAnimations((prev) => ({...prev,circleAnimation:''}) )
                  }

                  return;
                }}
              >
                <div className="flex flex-col h-full pt-24 gap-2">
                  <div className="flex items-center justify-center">
                    <h1 className="font-bold text-5xl text-center">
                      Hello Again!&nbsp;
                    </h1>
                    <img
                      className="w-[50px]"
                      src="/img/emojis/smiling-face-with-hearts_1f970.webp"
                      alt="smiling face with hearts"
                    ></img>
                  </div>
                  <p className="flex justify-center">
                    We are Happy to see you again, let's start your learning
                    journey.
                  </p>
                </div>
                <div
                  className={`w-[40%] flex flex-col gap-5 mx-auto  transition-transform `}
                >
                  <div className="w-full relative">
                    <input
                      className="w-full border-2 border-[rgba(0, 0, 0, 1)] text-xl p-2 rounded-lg"
                      placeholder="Email"
                      type="text"
                      name="email"
                      onChange={(e) => {
                        setFormData((prev) => {
                          return { ...prev, email: e.target.value };
                        });
                      }}
                      onFocus={(e) => {
                        setAnimations((prev) => ({
                          ...prev,
                          inputsFocus: {
                            ...prev.inputsFocus,
                            email: true,
                          },
                        }));
                      }}
                      onBlur={(e) => {
                        setAnimations((prev) => ({
                          ...prev,
                          inputsFocus: {
                            ...prev.inputsFocus,
                            email: false,
                          },
                        }));
                      }}
                      value={formData.email}
                      required
                    ></input>
                    <AtSign
                      className={`${
                        animations.inputsFocus.email || validate(formData.email)
                          ? "opacity-1"
                          : "opacity-[0.4]"
                      } transition-opacity durantion-300 text-main absolute right-5 top-0 translate-x-[50%] translate-y-[50%]`}
                    ></AtSign>
                  </div>
                  <div className="w-full relative">
                    <input
                      className="login-input w-full border-2  border-[rgba(0, 0, 0, 1)] text-xl p-2 rounded-lg"
                      placeholder="Password"
                      type={animations.locked ? "password" : "text"}
                      name="password"
                      onChange={(e) => {
                        setFormData((prev) => {
                          return { ...prev, password: e.target.value };
                        });
                      }}
                      onFocus={(e) => {
                        setAnimations((prev) => ({
                          ...prev,
                          inputsFocus: {
                            ...prev.inputsFocus,
                            password: true,
                          },
                        }));
                      }}
                      onBlur={(e) => {
                        setAnimations((prev) => ({
                          ...prev,
                          inputsFocus: {
                            ...prev.inputsFocus,
                            password: false,
                          },
                        }));
                      }}
                      value={formData.password}
                      required
                    ></input>
                    <div
                      onMouseDown={() => {
                        setAnimations((prev) => ({
                          ...prev,
                          locked: false,
                          inputsFocus: {
                            email: prev.inputsFocus.email,
                            password: true,
                          },
                        }));
                      }}
                      onMouseUp={() => {
                        setAnimations((prev) => ({
                          ...prev,
                          locked: true,
                          inputsFocus: {
                            email: prev.inputsFocus.email,
                            password: false,
                          },
                        }));
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
                  <div className="flex items-center w-full justify-between">
                    <div className="flex items-center font-semibold text-[rgba(0,0,0,0.7)] gap-1">
                      <input
                        type="checkbox"
                        className=" w-[1.1rem] h-[1.1rem] shadow-sm border-[rgba(0,0,0,0.5)] border rounded-sm "
                        name="remember"
                      ></input>
                      <label htmlFor="remember">Remember me?</label>
                    </div>
                    <Link href={"#"} className="text-main font-semibold">
                      Recover Your Password
                    </Link>
                  </div>
                  <button
                    className={`w-full text-2xl text-center bg-main p-2  text-white font-semibold rounded-lg`}
                    onClick={() => {
                      if (
                        !formData.email ||
                        !formData.password ||
                        !validate(formData.email)
                      ) {
                        if (!formData.email)
                          setError("You need to enter an email");

                        if (!formData.password)
                          setError("You need to enter a password");
                        if (!validate(formData.email) && formData.email)
                          setError("Invalid Email");
                        return;
                      } else {
                        setLogin(true);
                       
                        return;
                      }
                    }}
                  >
                    Login
                  </button>
                </div>
              </div>
            )}
            {animations.googleAuthVisible && (
              <div
                className={`flex justify-center w-[80%] child:w-[50%] mx-auto pt-12 ${
                  !login ? "" : "scale-0"
                } transition-transform`}
                onTransitionEnd={(e) => {
                  if (e.target.classList.contains("scale-0")) {
                    setAnimations((prev) => ({
                      ...prev,
                      googleAuthVisible: false,
                    }));
                  }
                  return;
                }}
              >
                <GoogleOAuthProvider clientId="">
                  <GoogleLogin
                    onSuccess={(credentialResponse) => {
                      console.log(credentialResponse);
                    }}
                    onError={() => {
                      console.log("Login Failed");
                    }}
                    useOneTap
                  />
                </GoogleOAuthProvider>
              </div>
            )}
            {animations.accountYetVisible && (
              <div
                className={`flex justify-center h-full items-end pb-24 ${
                  !login ? "" : "scale-0"
                } transition-transform`}
                onTransitionEnd={(e) => {
                  if (e.target.classList.contains("scale-0")) {
                    setAnimations((prev) => ({
                      ...prev,
                      accountYetVisible: false,
                    }));
                  }
                  return;
                }}
              >
                <p className="font-medium">
                  Don't Have an Account Yet?{" "}
                  <Link className="text-main font-semibold" href={"register"}>
                    Sign up
                  </Link>
                </p>
              </div>
            )}
            {loading && animations.circleAnimation === '' && (
              <div className="w-full h-full flex flex-col items-center justify-center">
              <div className="flex items-center justify-center">
                <div
                  className={`${animations.loadingCircleScale ? 'scaleTransition':animations.loadingCircleScale === false?'loadingCircleInfinite':'scale-0'} relative transition-transform duration-700 w-[8vw] h-[8vw] bg-main rounded-full flex items-center justify-center`}
                  onTransitionEnd={(e) => {
                    if(e.target.classList.contains('scale-0')){
                      setAnimations((prev) => ({...prev, loadingOut:true}))
                    }
                  }}
                  onAnimationEnd={(e) => {
                    if(e.target.classList.contains('scaleTransition')){
                      setAnimations((prev) => ({...prev,loadingCircleScale:false}))
                    }
                  }}
                  
                >
                  
                    <div
                      className={`rounded-full absolute top-0 bg-white w-[1vw] h-[1vw]`}
                    ></div>
               
                </div>
              </div>
              </div>
            )}
            {result.status && (
              <div
                id="afterLogin"
                className={`w-full h-full flex flex-col items-center justify-center origin-center scaleTransition flex flex-col items-center gap-5`}
              >
                <div>
                  <h2 className="flex gap-5 font-bold text-5xl text-center flex items-center">
                    {result.message}{" "}
                    <Check classname={"w-[50px] h-[50px]"}></Check>
                  </h2>
                </div>
                <div>Redirecting you in {redirectCount}....</div>
              </div>
            )}
          </div>

          <div className=" w-[30%] h-full bg-[url(/img/bermuda-square.svg)] bg-center flex flex-col relative gap-5 justify-center items-center">
            <h2 className="font-bold text-white text-6xl">New Here?</h2>
            <p className="text-white text-lg">
              Sign up to discover the best tutors in the entire world.
            </p>
            <Link
              href={"/register"}
              className="rounded-lg py-1 px-5 text-2xl text-white font-semibold border border-white"
            >
              Sign up
            </Link>
            <div className="absolute right-0 w-full h-[100vh] z-[-1]"></div>
          </div>
        </div>
      </section>
      {error && <Error error={error} classname={"bg-white text-main"}></Error>}
    </>
  );
}
