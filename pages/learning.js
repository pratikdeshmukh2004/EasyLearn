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
    </div>
  );
};

export default Learning;
