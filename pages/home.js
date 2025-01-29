import Header from "@/components/Header";
import sheetApiContext from "@/Context/sheetApiContext";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

const Course = () => {
  const { user } = useContext(sheetApiContext);

  return (
    <div className="text-center">
      <Header
        buttons={[
          { title: "My Learning", link: "/learning" },
          { title: "Settings", link: "/settings" },
        ]}
      />
      <h5 className="font-bold mt-32 text-2xl">Home</h5>
      <Link href={`/lesson/${user.Chapter || "Chapter 1"}`}>
        <button className="mt-14 bg-black text-white rounded-md py-3 px-5">
          Self Guided Course{" "}
          <span className="bg-white text-black rounded-lg p-0.5 px-2 ml-3 text-sm">
            {user?.Chapter || "Chapter 1"}
          </span>
        </button>
      </Link>
      <br />
      <Link href={"/chapters"}>
        <button className="mt-14 bg-black text-white rounded-md py-3 px-5">
          Direct Courses
        </button>
      </Link>
    </div>
  );
};
export default Course;
