import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { auth } from "../config/firebase.config";
import { AnimatePresence, motion } from "framer-motion";

const Userprofilecontainer = ({ userRoute }) => {
  const user = useSelector((state) => state.user.value);
  const [isopen, setisopen] = useState(false);

  const handleLogout = () => {
    auth.signOut().then(() => {
      window.location.reload();
    });
  };

  return (
    <div
      onMouseEnter={() => setisopen(true)}
      className="w-10 h-10 cursor-pointer rounded-full flex items-center justify-center relative bg-gray-300 "
    >
      <img
        src={
          user?.photoURL
            ? user?.photoURL
            : "https://cdn.pixabay.com/photo/2016/09/22/16/38/avatar-1687700_960_720.jpg"
        }
        className="w-full h-full object-cover rounded-full"
        alt=""
      />
      <AnimatePresence>
        {isopen && (
          <motion.div
            initial={{ opacity: 0.5, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            onMouseLeave={() => setisopen(false)}
            className="w-auto px-4 py-5 rounded-md bg-neutral-200 cursor-pointer absolute top-14 right-0 flex-col items-start gap-4"
          >
            <div className="w-52 flex items-center justify-center flex-col gap-4">
              <div className="w-20 h-20 rounded-md flex items-center justify-center">
                <img
                  src={
                    user?.photoURL
                      ? user?.photoURL
                      : "https://cdn.pixabay.com/photo/2016/09/22/16/38/avatar-1687700_960_720.jpg"
                  }
                  className="w-full h-full object-cover rounded-full"
                  alt=""
                />
              </div>
              <p className="text-lg capitalize text-neutral-600 tracking-wide font-semibold">
                {user?.displayName}
              </p>
              <ul className="flex flex-col w-full gap-3">
                {userRoute?.map((item) => (
                  <Link
                    className="text-neutral-600 opacity-75 hover:opacity-100 hover:bg-gray-100 px-2 py-1 rounded-md"
                    to={item?.uri.replace("userId", user.uid)}
                    key={item.uri}
                  >
                    {item.label}
                  </Link>
                ))}
              </ul>
              <button
                onClick={handleLogout}
                type="button"
                className="bg-gray-100 w-full px-4 py-3 rounded-md text-neutral-600 opacity-75 hover:opacity-100"
              >
                Sign out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Userprofilecontainer;

// <div >
//         <div >
//           <div >
//
//
//             {userRoute && (
//               <ul>
//                 {userRoute?.map((item) => (
//                   <Link key={item.uri}>{item.label}</Link>
//                 ))}
//               </ul>
//             )}
//           </div>
//         </div>
// </div>
