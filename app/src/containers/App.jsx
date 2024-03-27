import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import {
  Authentication,
  DashboardBlogs,
  DashboardCreate,
  DashboardLayout,
  DashboardUser,
  Home,
} from "../pages";
import { Blogs } from "../containers";
import { auth } from "../config/firebase.config";
import { useDispatch } from "react-redux";
import { saveUser } from "../context/reducers/userReducer";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    auth.onAuthStateChanged((userCred) => {
      if (userCred) {
        console.log(userCred.providerData[0]);
        dispatch(saveUser(userCred.providerData[0]));
      }
    });
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-start">
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path=":blogId" element={<Blogs />} />
        </Route>

        <Route path="/auth" element={<Authentication />} />

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="blogs" element={<DashboardBlogs />} />
          <Route path="users" element={<DashboardUser />} />
          <Route path="create" element={<DashboardCreate />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
