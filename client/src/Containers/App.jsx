import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Blog } from "../Components";
import { getBlogs } from "../api";

const App = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBlogs();
        if (data) {
          // setBlogs(data);
        } else {
          console.log("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="w-screen h-screen grid grid-cols-1 md:grid-cols-12 gap-4">
      <div className="col-span-1 md:col-span-6 lg:col-span-8">
        <Routes>
          <Route path="/:blogId" element={<Blog />} />
        </Routes>
      </div>
      <div className="col-span-1 md:col-span-6 lg:col-span-4">right</div>
    </div>
  );
};

export default App;
