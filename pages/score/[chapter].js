import Loader from "@/components/loader";
import sheetApiContext from "@/Context/sheetApiContext";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

const Score = () => {
  const { workSheetData, user } = useContext(sheetApiContext);
  const [activeScore, setActiveScore] = useState(null);
  const { chapter } = useParams();
  const nextChapter = parseInt(chapter.split(" ")[1]) + 1;
  const router = useRouter();
  const percentage = Math.floor(
    (activeScore?.get("Correct Answer") / activeScore?.get("Questions")) * 100
  );

  const getChapter = async () => {
    let lesson = await workSheetData("Score", true);
    lesson = lesson.filter(
      (l) =>
        l.get("Chapter") === chapter &&
        user["Username"]?.trim() === l.get("Username")?.trim()
    );
    setActiveScore(lesson[lesson.length - 1]);
    console.log(activeScore, user, lesson);
  };

  useEffect(() => {
    getChapter();
  }, []);

  if (!activeScore) return <Loader />;

  return (
    <div>
      <h1 className="text-center shadow-md p-5 text-xl font-bold">
        Congratulations
      </h1>
      <div className="h-72 w-10/12 shadow-custom mt-10 mx-auto rounded-lg">
        <h1 className="text-center text-5xl p-6 ">Your Score</h1>
        <h5 className="text-center text-3xl ">{percentage || 0}%</h5>
        <div className="m-5">
          <h4 className="font-semibold mt-9">Score Breakdown:</h4>
          <p className="text-md mt-3 text-gray-800">
            Correct Answers: {activeScore?.get("Correct Answer")}
          </p>
          <p className="text-md text-gray-800">
            Wrong Answers:{" "}
            {activeScore?.get("Questions") - activeScore?.get("Correct Answer")}
          </p>
          <p className="text-md text-gray-800">
            Time Taken:{" "}
            {Math.floor((activeScore?.get("Time Taken") / 60) * 100) / 100}{" "}
            minutes
          </p>
        </div>
      </div>
      <button
        onClick={() => router.push("/chapters")}
        className="bg-black w-10/12 mx-7 mt-8 hover:bg-gray-700 p-3 rounded-lg text-white text-lg font-medium"
      >
        Back to Contents
      </button>

      <button
        onClick={() =>
          percentage >= 75
            ? router.push(`/lesson/Chapter ${nextChapter}`)
            : router.push(`/quiz/${chapter}`)
        }
        className="bg-black w-10/12 mx-7 mt-5 hover:bg-gray-700 p-3 rounded-lg text-white text-lg font-medium"
      >
        {percentage >= 75 ? "Next Lesson" : "Reatempt Quiz"}
      </button>
    </div>
  );
};
export default Score;
