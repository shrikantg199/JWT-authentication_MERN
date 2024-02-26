import clsx from "clsx";
import { useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const userSignIn = !!localStorage.getItem("token");
  const navigate = useNavigate();
  const [menu, setMenu] = useState(false);
  const nav = [
    {
      label: "Home",
      link: "/home",
    },
    {
      label: "about",
      link: "/about",
    },
    {
      label: "contact us",
      link: "/contact",
    },
    {
      label: "Follow",
      link: "#",
    },
  ];
  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <>
      {/*for desktop */}
      <div className="flex mt-3 justify-center ">
        <div className="flex cursor-pointer ">
          <button onClick={() => setMenu(false)}>
            <IoMdMenu className="ml-3 text-3xl transition-all lg:hidden" />
          </button>
          <div className="flex items-center justify-between gap-7">
            <div className="ml-3 text-xl">Logo</div>
            <nav className="flex justify-center items-center gap-20      ">
              {nav.map((data) => (
                <ul className="hidden lg:block" key={data.label}>
                  <li>
                    <a href={data.link} className="">
                      {data.label}
                    </a>
                  </li>
                </ul>
              ))}
            </nav>
            <div className="flex justify-end gap-2">
              {userSignIn ? (
                <>
                  {" "}
                  <button
                    to="/signup"
                    onClick={handleLogOut}
                    className="bg-blue-700 px-4 py-1 rounded-lg text-white"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  {" "}
                  <Link
                    to="/"
                    className="bg-blue-700 px-2 py-1 rounded-lg text-white"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-blue-700 px-2 py-1 rounded-lg text-white"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/*for Mobile */}
      <div
        className={clsx(
          "fixed top-0 right-0 w-screen h-screen bg-black/50 lg:hidden  translate-x-0",
          menu && "translate-x-full"
        )}
      >
        <div className="h-full bg-white w-60">
          <RxCross2
            className="text-3xl cursor-pointer "
            onClick={() => setMenu(false)}
          />
          <nav>
            {nav.map((data) => (
              <ul
                className="flex items-center justify-between mb-4"
                key={data.label}
              >
                <li>
                  <a href={data.link} className="items-center text-2xl">
                    {data.label}
                  </a>
                </li>
              </ul>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}

export default Navbar;
