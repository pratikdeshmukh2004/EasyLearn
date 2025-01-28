import sheetApiContext from "@/Context/sheetApiContext";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const Quiz = () => {
  const { chapter } = useParams();
  const router = useRouter();
  const { workSheetData, user, doc } = useContext(sheetApiContext);
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

  const nextquiz = () => {
    if (activeIndex == quiz.length - 1) {
      if (quiz.length !== Object.keys(answers).length) {
        return toast.error("Answer all questions.");
      }
      let c_ans = quiz.filter(
        (q) => answers[q.get("Question")] === q.get("Answer")
      );
      console.log(c_ans);
      setAnswers({});
      doc.sheetsByIndex[3]
        .addRows([
          {
            Username: user["Username"],
            Chapter: chapter,
            Questions: quiz.length,
            "Correct Answer": c_ans.length,
            "Time Taken": Math.floor((new Date() - startTime) / 1000),
            Date: new Date(),
          },
        ])
        .then(() => {
          router.push(`/score/${activeQuiz.get("Chapter")}`);
        });
      return;
    }
    setActiveQuiz(quiz[activeIndex + 1]);
  };

  const prequiz = () => {
    if (activeIndex == 0) {
      router.push(`/lesson/${activeQuiz.get("Chapter")}`);
    }
    setActiveQuiz(quiz[activeIndex - 1]);
  };

  const handleOptoinSelect = (e) => {
    setAnswers({
      ...answers,
      [quiz[activeIndex].get("Question")]: e.target.value,
    });
  };

  useEffect(() => {
    getChapter();
  }, []);

  if (!chapter) {
    return router.push("/chapters");
  }
  if (!activeQuiz) {
    return;
  }
  return (
    <div>
      <div className="p-3 shadow-lg">
        <h1 className="text-2xl font-bold">{activeQuiz?.get("Chapter")}</h1>
      </div>
      <div className="mx-4">
        <div className="shadow-lg w-full mt-5 p-3 rounded-lg">
          <h3 className="text-xl">
            Question {activeIndex + 1}: {activeQuiz?.get("Question")}
          </h3>
          <form onChange={handleOptoinSelect}>
            <div className="flex flex-col space-y-4 mt-3">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id={activeQuiz?.get("A")}
                  name="options"
                  checked={
                    activeQuiz?.get("A") == answers[activeQuiz?.get("Question")]
                  }
                  value={activeQuiz?.get("A")}
                  className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                />
                <label htmlFor={activeQuiz?.get("A")} className="text-gray-700">
                  A) {activeQuiz?.get("A")}
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id={activeQuiz?.get("B")}
                  checked={
                    activeQuiz?.get("B") == answers[activeQuiz?.get("Question")]
                  }
                  name="options"
                  value={activeQuiz?.get("B")}
                  className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                />
                <label htmlFor={activeQuiz?.get("B")} className="text-gray-700">
                  B) {activeQuiz?.get("B")}
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id={activeQuiz?.get("C")}
                  checked={
                    activeQuiz?.get("C") == answers[activeQuiz?.get("Question")]
                  }
                  name="options"
                  value={activeQuiz?.get("C")}
                  className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                />
                <label htmlFor={activeQuiz?.get("C")} className="text-gray-700">
                  C) {activeQuiz?.get("C")}
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id={activeQuiz?.get("D")}
                  name="options"
                  checked={
                    activeQuiz?.get("D") == answers[activeQuiz?.get("Question")]
                  }
                  value={activeQuiz?.get("D")}
                  className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                />
                <label htmlFor={activeQuiz?.get("D")} className="text-gray-700">
                  D) {activeQuiz?.get("D")}
                </label>
              </div>
            </div>
          </form>
        </div>
        <div className="flex mt-5 items-center justify-between">
          <button
            onClick={prequiz}
            className="bg-black hover:bg-gray-700 p-3 px-8 rounded-lg text-white text-sm font-bold"
          >
            {activeIndex == 0 ? "Lesson" : "Prev"}
          </button>
          <p>
            {activeIndex + 1} of {quiz?.length}
          </p>
          <button
            onClick={nextquiz}
            className="bg-black hover:bg-gray-700 p-3 px-8 rounded-lg text-white text-sm font-bold"
          >
            {activeIndex != quiz?.length - 1 ? "Next" : "Complete"}
          </button>
        </div>
      </div>
    </div>
  );
};
export default Quiz;
