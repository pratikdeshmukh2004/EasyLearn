import Link from "next/link";

const Learning = () => {
  return (
    <div>
      <div className="p-4 shadow-lg px-5 flex justify-between">
        <h1 className="text-xl font-bold">My Progress</h1>
        <Link
          href={"/home"}
          className="bg-black ml-auto text-white px-7 flex items-center text-sm rounded-md"
        >
          Home
        </Link>
      </div>
      <div className="shadow-lg rounded-sm mt-7 mx-5 w10/12 p-4">
        <h4 className="text-sm">Magnetism</h4>
        <div className=" mt-2 bg-slate-200 rounded-md ">
          <div className="bg-sky-500 w-60 h-2 rounded-md"></div>
        </div>
        <p className="text-gray-500 text-sm mt-2">75% completed</p>
      </div>
      <div className="shadow-lg rounded-sm mt-3 mx-5 w10/12 p-4">
        <h4 className="text-sm">Magnetism</h4>
        <div className=" mt-2 bg-slate-200 rounded-md ">
          <div className="bg-sky-500 w-40 h-2 rounded-md"></div>
        </div>
        <p className="text-gray-500 text-sm mt-2">50% completed</p>
      </div>
      <h1 className="mt-7 m-6 text-xl">Achievements</h1>
      <div className="grid grid-cols-2 gap-5 px-3">
        <div className="shadow-custom p-3 rounded-lg">
          <div className="m-4">
            <p className="text-sm text-gray-800">Total lessons<br />taken</p>
            <b className="font-bold text-xl">15</b>
          </div>
        </div>
        <div className="shadow-custom p-3 rounded-lg">
          <div className="m-4">
            <p className="text-sm text-gray-800">Quizzes Taken</p>
            <b className="font-bold text-xl">8</b>
          </div>
        </div>

      </div>
      <h1 className="text-lg mt-7 ml-3 font-bold">Badges won</h1>
      <div className="grid grid-cols-2 text-center gap-3 m-3">
        <div className="p-2">
          <img className="mx-auto" src="medal.jpeg" />
          <p className="text-gray-700 text-sm">Quantum Expert</p>
        </div>
        <div className="p-2">
          <img className="mx-auto" src="brain.jpeg" />
          <p className="text-gray-700 text-sm">Quantum Expert</p>
        </div>
      </div>
      <h4 className="mt-5 text-xl ml-3 font-medium">Add friends</h4>
      <div className="shadow-custom rounded-lg mt-4 mx-3 w10/12 p-4 flex justify-between">
        <p className="">Ravi</p>
        <button className="text-white bg-black rounded-md py-0.5 px-3">Add friend</button>
      </div>
      <div className="shadow-custom rounded-lg mt-7 mx-3 w10/12 p-4 flex justify-between">
        <p className="">Ravi</p>
        <button className="text-white bg-black rounded-md py-0.5 px-3">Add friend</button>
      </div>
      <h3 className="text-lg mt-14 ml-3"><b>Join a team</b></h3>
      <div className="shadow-custom mb-5 mx-3 rounded-lg mt-7  p-4 flex justify-between">
        <div>
          <p className="text-sm">Quantum Enthusiasts </p>
          <p className="text-gray-500 text-sm">top score: 95%</p>
        </div>
        <div>
          <button className="text-white bg-black rounded-md py-0.5 px-6">Join</button>
        </div>
      </div>
      <div className="shadow-custom mb-8 mx-3 rounded-lg mt-7  p-4 flex justify-between">
        <div>
          <p className="text-sm">Quantum Enthusiasts </p>
          <p className="text-gray-500 text-sm">top score: 88%</p>
        </div>
        <div>
          <button className="text-white bg-black rounded-md py-0.5 px-6">Join</button>
        </div>
      </div>
    </div>
  );
};

export default Learning;
