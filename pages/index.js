import Header from "@/components/Header";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Header />
      <div className="h-screen items-center justify-center flex flex-col text-center px-5 gap-2">
        <h4 className="text-center text-3xl">
          Welcome to
          <br /> EasyLearn
        </h4>
        <p className="font-medium text-[#585858]">
          Inclusive education platform for visually impaired students with
          interactive courses and personalized learning paths.
        </p>
        <div className="flex mt-10 gap-5">
          <Link href={"/auth/login"}>
            <button className="bg-black text-white p-2 rounded-lg px-8">
              Login
            </button>
          </Link>
          <Link href={"/auth/signup"}>
            <button className="bg-black text-white p-2 rounded-lg px-8">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
