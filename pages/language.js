import { useRouter } from "next/router";

const Language = () => {
  const router = useRouter();
  const changeLanguage = () => {
    router.push("/home");
  };
  return (
    <div className="h-screen flex flex-col items-center text-center justify-center">
      <div>
        <h1 className="font-bold text-2xl">Choose App Language</h1>
        <button
          onClick={changeLanguage}
          className="text-black mt-10 border-2 border-black py-3 px-8 rounded-full font-medium"
        >
          English
        </button>
        <br />
        <button
          onClick={changeLanguage}
          className="text-black mt-5 border-2 border-black py-3 px-9 rounded-full font-medium"
        >
          Tamil
        </button>
      </div>
    </div>
  );
};
export default Language;
