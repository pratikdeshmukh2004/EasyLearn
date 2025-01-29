import Loader from "@/components/loader";
import sheetApiContext from "@/Context/sheetApiContext";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const Quiz = () => {
  const { chapter } = useParams();
  const nextChapter = parseInt(chapter.split(" ")[1]) + 1;
  const router = useRouter();
  const { workSheetData, user, doc, setUser } = useContext(sheetApiContext);
  const [quiz, setQuiz] = useState(null);
  const [activeQuiz, setActiveQuiz] = useState(null);
  const activeIndex = quiz?.indexOf(activeQuiz);
  const [answers, setAnswers] = useState({});
  const [startTime, setStartTime] = useState(null);

  const getChapter = async () => {
    let quiz = await workSheetData("Quiz");
    quiz = quiz.filter(
      (l) =>
        l.get("Chapter") === chapter &&
        user["Medium"]?.trim() === l.get("Medium")?.trim() &&
        user["Standard"]?.trim() === l.get("Standard")?.trim()
    );
    quiz = quiz.sort(
      (a, b) =>
        a.get("Question").split(" ")[1] - b.get("Question").split(" ")[1]
    );
    setQuiz(quiz);
    setActiveQuiz(quiz[0]);
    setStartTime(new Date());
  };

  const nextquiz = async () => {
    if (activeIndex == quiz.length - 1) {
      if (quiz.length !== Object.keys(answers).length) {
        return toast.error("Answer all questions.");
      }
      let c_ans = quiz.filter(
        (q) => answers[q.get("Question")] === q.get("Answer")
      );
      console.log(c_ans);
      setQuiz(null);
      await doc.sheetsByIndex[3].addRows([
        {
          Username: user["Username"],
          Chapter: chapter,
          Questions: quiz.length,
          "Correct Answer": c_ans.length,
          "Time Taken": Math.floor((new Date() - startTime) / 1000),
          Date: new Date(),
        },
      ]);
      const users = await workSheetData("Users");
      const userd = users.filter(
        (u) => u.get("Username") == user["Username"]
      )[0];
      userd.set("Chapter", `Chapter ${nextChapter}`);
      await userd.save();
      setUser({ ...user, Chapter: `Chapter ${nextChapter}` });
      router.push(`/score/${chapter}`);
      return;
    }
    setActiveQuiz(quiz[activeIndex + 1]);
  };

  const prequiz = () => {
    if (activeIndex == 0) {
      router.push(`/lesson/${chapter}`);
    }
    setActiveQuiz(quiz[activeIndex - 1]);
  };

  useEffect(() => {
    getChapter();
  }, []);

  if (!chapter) {
    return router.push("/chapters");
  }
  if (quiz == null) {
    return <Loader />;
  }
  console.log(answers);

  return (
    <div>
      <div className="p-3 shadow-lg">
        <h1 className="text-2xl font-bold text-center">{chapter}</h1>
      </div>
      {!quiz.length && (
        <div className="mx-4">
          <p className="p-3 border border-rose-600 mt-16 rounded-lg text-rose-400 bg-rose-50">
            No quiz found for this chapter.
          </p>
          <button
            onClick={() => router.push(`/lesson/${chapter}`)}
            className="bg-black w-full mt-10 hover:bg-gray-700 p-3 px-8 rounded-lg text-white text-sm font-bold"
          >
            Back to lesson
          </button>
        </div>
      )}
      {quiz.length > 0 && (
        <div className="mx-4">
          <div className="shadow-custom w-full mt-5 p-5 rounded-lg">
            <h3 className="text-xl">
              Question {activeIndex + 1}: {activeQuiz?.get("Question")}
            </h3>
            <div className="flex flex-col space-y-4 mt-5">
              <button
                onClick={() =>
                  setAnswers({
                    ...answers,
                    [quiz[activeIndex]?.get("Question")]: activeQuiz.get("A"),
                  })
                }
                className={
                  "text-md text-left p-3 rounded-lg border border-gray-500 bg-gray-300 " +
                  (answers[quiz[activeIndex]?.get("Question")] ===
                  activeQuiz?.get("A")
                    ? "bg-gray-700 text-white"
                    : "")
                }
              >
                A. {activeQuiz?.get("A")}
              </button>
              <button
                onClick={() =>
                  setAnswers({
                    ...answers,
                    [quiz[activeIndex]?.get("Question")]: activeQuiz?.get("B"),
                  })
                }
                className={
                  "text-md text-left p-3 rounded-lg border border-gray-500 bg-gray-300 " +
                  (answers[quiz[activeIndex]?.get("Question")] ===
                  activeQuiz?.get("B")
                    ? "bg-gray-700 text-white"
                    : "")
                }
              >
                B. {activeQuiz?.get("B")}
              </button>
              <button
                onClick={() =>
                  setAnswers({
                    ...answers,
                    [quiz[activeIndex]?.get("Question")]: activeQuiz?.get("C"),
                  })
                }
                className={
                  "text-md text-left p-3 rounded-lg border border-gray-500 bg-gray-300 " +
                  (answers[quiz[activeIndex]?.get("Question")] ===
                  activeQuiz?.get("C")
                    ? "bg-gray-700 text-white"
                    : "")
                }
              >
                C. {activeQuiz?.get("C")}
              </button>
              <button
                onClick={() =>
                  setAnswers({
                    ...answers,
                    [quiz[activeIndex]?.get("Question")]: activeQuiz?.get("D"),
                  })
                }
                className={
                  "text-md text-left p-3 rounded-lg border border-gray-500 bg-gray-300 " +
                  (answers[quiz[activeIndex]?.get("Question")] ===
                  activeQuiz?.get("D")
                    ? "bg-gray-700 text-white"
                    : "")
                }
              >
                D. {activeQuiz?.get("D")}
              </button>
            </div>
          </div>
          <p className="m-8 text-center">
            {activeIndex + 1} of {quiz?.length}
          </p>
          <div className="flex mt-5 flex-col-reverse gap-10 items-center justify-between">
            <button
              onClick={prequiz}
              className="bg-black hover:bg-gray-700 w-full p-3 px-8 rounded-lg text-white text-md font-bold"
            >
              {activeIndex == 0 ? "Lesson" : "Prev"}
            </button>
            <button
              onClick={nextquiz}
              className="bg-black hover:bg-gray-700 w-full p-3 px-8 rounded-lg text-white text-md font-bold"
            >
              {activeIndex != quiz?.length - 1 ? "Next" : "Complete"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default Quiz;
