import Header from "@/components/Header";
import Link from "next/link";

const Course = () => {
  const lesson = [
    {
      title: "Lesson 1",
      link: "/lesson?lesson=1",
    },
    {
      title: "Lesson 2",
      link: "/lesson?lesson=1",
    },
    {
      title: "Lesson 3",
      link: "/lesson?lesson=1",
    },
    {
      title: "Lesson 4",
      link: "/lesson?lesson=1",
    },
  ];
  return (
    <div className="text-center">
      <Header buttons={[{ title: "Home", link: "/home" }]} />
      <div>
        <h4 className="text-black mt-20 font-medium text-xl">Chapter</h4>
        <div className="grid grid-cols-2 gap-5 my-9 mx-5">
          {lesson.map((l) => (
            <Link
              href={l.link}
              className="border-black font-bold border-2 rounded-3xl py-4 text-md"
            >
              {l.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Course;
