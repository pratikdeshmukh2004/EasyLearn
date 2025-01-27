import Header from "@/components/Header";
import sheetApiContext from "@/Context/sheetApiContext";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

const Course = () => {
  const { workSheetData, user } = useContext(sheetApiContext);
  const [activeChapter, setActiveChapter] = useState(null);

  const getChapter = async () => {
    let chapters = await workSheetData("Chapters");
    chapters = chapters.filter(
      (chapter) =>
        chapter.get("Chapter") &&
        user?.Medium?.trim() === chapter.get("Medium")?.trim() &&
        user?.Standard?.trim() === chapter.get("Standard")?.trim()
    );
    chapters = chapters.sort(
      (a, b) => a.get("Chapter").split(" ")[1] - b.get("Chapter").split(" ")[1]
    );
    setActiveChapter(chapters[0]);
  };

  useEffect(() => {
    getChapter();
  }, []);

  return (
    <div className="text-center">
      <Header
        buttons={[
          { title: "My Learning", link: "/learning" },
          { title: "Settings", link: "/settings" },
        ]}
      />
      <h5 className="font-bold mt-32 text-xl">Home</h5>
      <Link href={`/lesson/${activeChapter?.get("Chapter")}`}>
        <button className="mt-14 bg-black text-white rounded-md py-3 px-5">
          Self Guided Course
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
