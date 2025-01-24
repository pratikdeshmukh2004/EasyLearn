import Header from "@/components/Header";
import sheetApiContext from "@/Context/sheetApiContext";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

const Course = () => {
  const [chapters, setChapters] = useState([]);
  const { workSheetData } = useContext(sheetApiContext);

  const loadChapters = async () => {
    const chapters = await workSheetData("Chapters");
    setChapters(chapters);
  };

  useEffect(() => {
    loadChapters();
  });

  return (
    <div className="text-center">
      <Header buttons={[{ title: "Home", link: "/home" }]} />
      <div>
        <h4 className="text-black mt-20 font-medium text-xl">Chapter</h4>
        <div className="grid grid-cols-2 gap-5 my-9 mx-5">
          {[...new Set(chapters.map((l) => l.get("Chapter")))].map((l) => (
            <Link
              href={`/lesson?chapter=${l}`}
              className="border-black font-bold border-2 rounded-3xl py-4 text-md"
            >
              {l}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Course;
