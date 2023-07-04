import Link from "next/link";
export default function Layout({ children }) {
    return (
      <>
        <header className="relative">
          <div
            id="header-container"
            className={`${
              "currentPath" === "/" ? undefined : "bg-main "
            } py-[10px] px-[135px] flex items-center justify-between text-white`}
          >
            <div className="flex items-center gap-5">
              <div id="logo">
                <h1 className="text-4xl font-black">ClassPro</h1>
              </div>
              <nav>
                <ul className="flex before:content-['|'] text-xl gap-10">
                  <li>
                    <Link href={"/tutors"}>Find Tutors</Link>
                  </li>
                  <li>
                    <Link href={"#"}>Became a Tutor</Link>
                  </li>
                  <li>
                    <Link href={"#"}>Blog</Link>
                  </li>
                  <li>
                    <Link href={"#"}>Resources</Link>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="flex items-center text-xl font-bold gap-8">
              <Link
                href={"#"}
                className={`${
                  "currentPath" === "/" ? "text-main" : "text-white"
                }`}
              >
                Login
              </Link>
              <Link
                href={"#"}
                className="bg-main rounded-lg text-white px-5 py-2  border-2 boder-black"
              >
                Sign up
              </Link>
            </div>
          </div>
        </header>
        {children}
        <footer className="bg-main pt-40 pb-2 w-full">
          <div
            id="container-footer"
            className="w-[80%] mx-auto flex flex-col gap-12 pb-12"
          >
            <div id="logo-container" className="flex justify-between">
              <div id="logo">
                <p className="text-5xl text-white font-black">ClassPro</p>
              </div>
              <div id="social-media">
                <ul className="flex gap-5">
                  <li>
                    <Link target="_blank" href={"https://icons8.com"}>
                      <img src="https://img.icons8.com/color/48/facebook-new.png"></img>
                    </Link>
                  </li>
                  <li>
                    <Link target="_blank" href={"https://icons8.com"}>
                      <img src="https://img.icons8.com/color/48/instagram-new--v1.png"></img>
                    </Link>
                  </li>
                  <li>
                    <Link target="_blank" href={"https://icons8.com"}>
                      <img
                        src="https://img.icons8.com/color/48/twitter--v1.png"
                        alt="twitter--v1"
                      />
                    </Link>
                  </li>
                  <li>
                    <Link target="_blank" href={"https://icons8.com"}>
                      <img
                        src="https://img.icons8.com/color/48/youtube-play.png"
                        alt="youtube-play"
                      />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex justify-between w-full">
              <div>
                <p className="text-2xl text-white font-medium">Resources</p>
                <ul className=" text-white">
                  <li>
                    <Link href={"#"}>Articles</Link>
                  </li>
                  <li>
                    <Link href={"#"}>Blog</Link>
                  </li>
                  <li>
                    <Link href={"#"}></Link>
                  </li>
                  <li>
                    <Link href={"#"}></Link>
                  </li>
                </ul>
              </div>
              <div>
                <p className="text-2xl text-white font-medium">Company</p>
                <ul className=" text-white">
                  <li>
                    <Link href={"#"}>About us</Link>
                  </li>
                  <li>
                    <Link href={"#"}>Careers</Link>
                  </li>
                  <li>
                    <Link href={"#"}>NewsRoom</Link>
                  </li>
                </ul>
              </div>
              <div>
                <p className="text-2xl text-white font-medium">Support</p>
                <ul className=" text-white">
                  <li>
                    <Link href={"#"}>Contact</Link>
                  </li>
                  <li>
                    <Link href={"#"}>FAQ</Link>
                  </li>
                </ul>
              </div>
              <div>
                <p className="text-2xl text-white font-medium">Subjects</p>
                <ul className="text-white">
                  <li>
                    <Link href={"#"}>Learn Spanish Online</Link>
                  </li>
                  <li>
                    <Link href={"#"}>Learn Mathematics Online</Link>
                  </li>
                  <li>
                    <Link href={"#"}>Learn English Online</Link>
                  </li>
                  <li>
                    <Link href={"#"}>Learn Quantum Physics Online</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="w-full border-t-2 border-white border-opacity-60">
            <div className="w-[80%] mx-auto pt-4 text-white justify-between flex">
              <p>© ClassPro 2023 All Rights Reserved</p>
              <div className="flex gap-4">
                <Link href={""}>Terms & Conditions</Link>
                <Link href={""}>Privacy Policy</Link>
              </div>
            </div>
          </div>
        </footer>
      </>
    );
  }
  