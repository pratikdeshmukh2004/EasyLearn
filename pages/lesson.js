import AudioController from "@/components/audioPlayer";
import Header from "@/components/Header";

const Lesson = () => {
  return (
    <div>
      <Header buttons={[{ title: "Back to contents", link: "/chapters" }]} />
      <div className="mt-24 mx-5">
        <h1 className="text-2xl font-medium">Chapter 1 Magnetism</h1>
        <p className="text-sm mt-5">
          கருத்துக்களை தெளிவாகப் புரிந்துகொள்ள முதல் கோப்பைக் கேளுங்கள்
        </p>
        <div className="shadow-lg rounded-lg mt-5 p-5">
          <div className="flex justify-between">
            <button className="bg-black hover:bg-gray-700 p-3 px-6 rounded-lg text-white text-sm font-medium">
              Play
            </button>
            <button className="bg-black hover:bg-gray-700 p-3 px-6 rounded-lg text-white text-sm font-medium">
              Pause
            </button>
          </div>
          <AudioController/>
        </div>
        <button className="bg-black w-10/12 mx-6 mt-20 hover:bg-gray-700 p-3 rounded-lg text-white text-lg font-medium">
          Next Lesson
        </button>
      </div>
    </div>
  );
};

export default Lesson;
