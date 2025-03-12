import AudioController from "@/components/audioPlayer";
import Header from "@/components/Header";
import Loader from "@/components/loader";
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
  const [isPlayingTN, setIsPlayingTN] = useState(false);
  const [isPlayingEN, setIsPlayingEN] = useState(false);

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

  useEffect(()=>{
    if (isPlayingEN){
      setIsPlayingTN(false)
    }
    if (isPlayingTN){
      setIsPlayingEN(false)
    }
  }, [isPlayingEN, isPlayingTN])

  if (!chapter) {
    return router.push("/chapters");
  }


  if (lesson == null) return <Loader />;

  return (
    <div>
      <Header buttons={[{ title: "Home", link: "/home" }]} />
      {activeLesson && (
        <div className="mt-24 mx-5">
          <p className="text-center">{activeLesson.get("Chapter")}</p>
          <h1 className="text-2xl mt-5 text-center font-medium">
            {activeLesson.get("Topic Title")}
          </h1>
          <>
            <p className="text-sm text-center mt-5">
              {user.Medium == "English"
                ? "To clearly understand the concepts, listen to the first file."
                : "கருத்துக்களை தெளிவாகப் புரிந்துகொள்ள முதல் கோப்பைக் கேளுங்கள்"}
            </p>
            <AudioController
              isPlaying={isPlayingTN}
              setIsPlaying={setIsPlayingTN}
              link={activeLesson.get("Audio_TAxEN")}
            />
          </>
          <>
            <p className="text-sm text-center mt-5">
              {user.Medium == "English"
                ? "to prepare for exam, listen to the following audio lesson"
                : "கருத்துக்களை தெளிவாகப் புரிந்துகொள்ள முதல் கோப்பைக் கேளுங்கள்"}
            </p>
            <AudioController
              isPlaying={isPlayingEN}
              setIsPlaying={setIsPlayingEN}
              link={activeLesson.get("Audio_EN")}
            />
          </>
          <p className="mt-5 text-center">
            {lesson.indexOf(activeLesson) + 1} / {lesson.length}
          </p>
          <button
            onClick={nextLesson}
            className="bg-black w-10/12 mx-6 mt-5 hover:bg-gray-700 p-3 rounded-lg text-white text-lg font-medium"
          >
            {activeIndex != lesson.length - 1 ? "Next Topic" : "Complete"}
          </button>
          {activeIndex != 0 && (
            <button
              onClick={() => setActiveLesson(lesson[activeIndex - 1])}
              className="bg-black w-10/12 mx-6 mt-5 hover:bg-gray-700 p-3 rounded-lg text-white text-lg font-medium"
            >
              Previous Topic
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Lesson;
