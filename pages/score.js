import Link from "next/link";

const Score = () => {
  return (
    <div>
      <h1 className="text-center shadow-md p-5 text-xl font-bold">
        Congratulations
      </h1>
      <div className="h-72 w-10/12 shadow-2xl mt-16 mx-auto rounded-lg">
        <h1 className="text-center text-5xl p-6 ">Your Score</h1>
        <h5 className="text-center text-3xl ">85%</h5>
        <div className="m-5">
          <h4 className="font-semibold mt-9">Score Breakdown:</h4>
          <p className="text-sm mt-3 text-gray-800">Correct Answers: 17</p>
          <p className="text-sm text-gray-800">Wrong Answers: 3</p>
          <p className="text-sm text-gray-800">Time Taken: 12 minutes</p>
        </div>
      </div>
      <div className="flex justify-center">
        <Link href={"/chapters"}>
          <button className="bg-black text-white mt-28 p-2 rounded-md px-10">
            Next Lesson
          </button>
        </Link>
      </div>
    </div>
  );
};
export default Score;
