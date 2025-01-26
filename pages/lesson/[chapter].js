import AudioController from "@/components/audioPlayer";
import Header from "@/components/Header";
import sheetApiContext from "@/Context/sheetApiContext";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

const Lesson = () => {
  const { chapter } = useParams();
  const router = useRouter();
  const { workSheetData, user } = useContext(sheetApiContext);
  const [lesson, setLesson] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null);
  const activeIndex = lesson?.indexOf(activeLesson);

  const getChapter = async () => {
    let lesson = await workSheetData("Chapters");
    lesson = lesson.filter(
      (l) =>
        l.get("Chapter") === chapter &&
        user["Medium"]?.trim() === l.get("Medium")?.trim() &&
        user["Standard"]?.trim() === l.get("Standard")?.trim()
    );
    lesson = lesson.sort(
      (a, b) => a.get("Lesson").split(" ")[1] - b.get("Lesson").split(" ")[1]
    );
    setLesson(lesson);
    setActiveLesson(lesson[0]);
  };

  const nextLesson = () => {
    if (activeIndex == lesson.length - 1) {
      router.push(`/quiz/${activeLesson.get("Chapter")}`);
    }
    setActiveLesson(lesson[activeIndex + 1]);
  };

  useEffect(() => {
    getChapter();
  }, []);

  if (!chapter) {
    return router.push("/chapters");
  }

  return (
    <div>
      <Header buttons={[{ title: "Home", link: "/home" }]} />
      {activeLesson && (
        <div className="mt-24 mx-5">
          <h1 className="text-2xl font-medium">
            {activeLesson.get("Chapter")} : {activeLesson.get("Topic Title")}
          </h1>
          <>
            <p className="text-sm mt-5">
              கருத்துக்களை தெளிவாகப் புரிந்துகொள்ள முதல் கோப்பைக் கேளுங்கள்
            </p>
            <AudioController
              link={
                activeLesson.get("Audio_EN") ||
                activeLesson.get("Audio_TAxEN") ||
                activeLesson.get("Audio_TA") ||
                activeLesson.get("Audio_IF_TAxEN") ||
                activeLesson.get("Audio_IF_TA")
              }
            />
          </>
          {/* <p className="text-sm mt-10">
          கருத்துக்களை தெளிவாகப் புரிந்துகொள்ள முதல் கோப்பைக் கேளுங்கள்
        </p>
        <AudioController /> */}
          <p className="mt-10 text-center">
            {lesson.indexOf(activeLesson) + 1} / {lesson.length}
          </p>
          <button
            onClick={nextLesson}
            className="bg-black w-10/12 mx-6 mt-10 hover:bg-gray-700 p-3 rounded-lg text-white text-lg font-medium"
          >
            {activeIndex != lesson.length - 1 ? "Next Lesson" : "Complete"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Lesson;
