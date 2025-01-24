import Header from "@/components/Header";
import Link from "next/link";

const Course = () => {
  return (
    <div className="text-center">
      <Header
        buttons={[
          { title: "My Learning", link: "/learning" },
          { title: "Settings", link: "/settings" },
        ]}
      />
      <h5 className="font-bold mt-32 text-xl">Home</h5>
      <Link href={"/lesson"}>
        <button className="mt-14 bg-black text-white rounded-md py-2 px-2">
          Self Guided Course
        </button>
      </Link>
      <br />
      <Link href={"/chapters"}>
        <button className="mt-14 bg-black text-white rounded-md py-2 px-3">
          Direct Courses
        </button>
      </Link>
    </div>
  );
};
export default Course;
