import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

const Home = () => {
  const user = useSelector((state) => state.user.value);
  return (
    <div>
      Home
      {user?.displayName}
      <Outlet />
    </div>
  );
};

export default Home;
