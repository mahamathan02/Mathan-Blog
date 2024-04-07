import React, { useMemo, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaHouse, FaUsers } from "react-icons/fa6";
import { MdContacts, MdMenu } from "react-icons/md";
import { twMerge } from "tailwind-merge";
import { Userprofilecontainer } from "../components";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";

const Header = () => {
  const [IsMenu, setIsMenu] = useState(false);

  const user = useSelector((state) => state.user.value);
  const clientRoutes = useMemo(
    () => [
      {
        label: "Home",
        Icon: FaHouse,
        uri: "/",
      },
      {
        label: "About us",
        Icon: FaUsers,
        uri: "/about",
      },
      {
        label: "contact us",
        Icon: MdContacts,
        uri: "/contact us",
      },
    ],
    []
  );

  const userRoutes = useMemo(
    () => [
      {
        label: "Favourites",
        Icon: FaHouse,
        uri: "Favourites/userId",
      },
      {
        label: "My profile",
        Icon: FaUsers,
        uri: "/profile/userId",
      },
    ],
    []
  );

  return (
    <header className="w-full flex items-center justify-between px-4 md:px-20 py-4 shadow-md bg-white relative">
      <Link to={"/"} className="text-xl font-semibold text-neutral-800">
        <span className="text-pink-500">Mathan</span> Blogs
      </Link>
      <div className="ml-auto mr-10 md:mr-0"></div>
      <nav className="ml-auto hidden md:block">
        <ul className="flex items-center justify-center gap-8">
          {clientRoutes?.map((item) => (
            <NavLink
              className={({ isActive }) =>
                twMerge(
                  "text-neutral-700 font-semibold text-lg opacity-50 px-4 py-2 hover:opacity-100",
                  isActive && "opacity-100"
                )
              }
              to={item.uri}
              key={item.uri}
            >
              {item.label}
            </NavLink>
          ))}
        </ul>
      </nav>

      <AnimatePresence>
        {IsMenu && (
          <motion.nav
            initial={{ opacity: 0.6, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 25 }}
            className="block md:hidden absolute top-[78px] bg-black/60 w-3/4 shadow-md backdrop-blur-md right-0 h-[calc(100vh-72px)]"
          >
            <ul className="flex flex-col items-start justify-start gap-8">
              {clientRoutes?.map((item) => (
                <NavLink
                  className={({ isActive }) =>
                    twMerge(
                      "text-gray-50 font-semibold text-lg opacity-50 px-4 py-2 hover:opacity-100",
                      isActive && "opacity-100"
                    )
                  }
                  to={item.uri}
                  key={item.uri}
                >
                  {item.label}
                </NavLink>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>

      {user ? (
        <Userprofilecontainer userRoute={userRoutes} />
      ) : (
        <Link
          to={"/auth"}
          className="px-6 py-2 rounded-md border border-y-sky-600 cursor-pointer text-sky-500 font-semibold text-lg"
        >
          Login
        </Link>
      )}
      <MdMenu
        className="cursor-pointer text-neutral-600 text-lg block md:hidden ml-6"
        onClick={() => setIsMenu(!IsMenu)}
      />
    </header>
  );
};

export default Header;
