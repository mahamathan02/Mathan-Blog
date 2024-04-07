import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import {
  Authentication,
  DashboardBlogs,
  DashboardCreate,
  DashboardLayout,
  DashboardUser,
  Home,
} from "../pages";
import { Blog, Blogs } from "../containers";
import { auth } from "../config/firebase.config";
import { useDispatch } from "react-redux";
import { saveUser } from "../context/reducers/userReducer";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    auth.onAuthStateChanged((userCred) => {
      if (userCred) {
        console.log(userCred.providerData[0]);
        dispatch(saveUser(userCred.providerData[0]));
        navigate("/", { replace: true });
      }
    });
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-start overflow-x-hidden">
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Blogs />} />
          <Route path=":blogId" element={<Blog />} />
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
