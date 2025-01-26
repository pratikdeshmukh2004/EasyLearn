import Header from "@/components/Header";
import sheetApiContext from "@/Context/sheetApiContext";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

const Course = () => {
  const [chapters, setChapters] = useState(null);
  const { workSheetData } = useContext(sheetApiContext);

  const loadChapters = async () => {
    let chapters = await workSheetData("Chapters");
    const user = JSON.parse(localStorage.getItem("user"));
    chapters = chapters.filter(
      (chapter) =>
        chapter.get("Chapter") &&
        user["Medium"]?.trim() === chapter.get("Medium")?.trim() &&
        user["Standard"]?.trim() === chapter.get("Standard")?.trim()
    );
    chapters = chapters.sort(
      (a, b) => a.get("Chapter").split(" ")[1] - b.get("Chapter").split(" ")[1]
    );
    setChapters(chapters);
  };

  useEffect(() => {
    loadChapters();
  });

  return (
    <div className="text-center">
      <Header buttons={[{ title: "Home", link: "/home" }]} />
      <h4 className="text-black mt-20 font-medium text-2xl">Chapter</h4>
      {!chapters ? (
        <div className="grid grid-cols-2 gap-5 my-9 mx-5">
          {Array.from({ length: 18 }).map((l) => (
            <div
              key={l}
              className="border rounded-xl p-7 border-gray-500 bg-gray-200 animate-pulse"
            ></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-5 my-9 mx-5">
          {[...new Set(chapters.map((l) => l.get("Chapter")))].map((l) => (
            <Link
              key={l}
              href={`/lesson/${l}`}
              className="border-black font-bold border-2 rounded-xl py-4 text-md"
            >
              {l}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
export default Course;
