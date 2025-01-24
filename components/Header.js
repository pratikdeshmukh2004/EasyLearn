import Link from "next/link";

const Header = ({ buttons }) => {
  return (
    <div className="p-5 z-50 max-w-sm top-0 bg-white fixed w-full flex items-center gap-2">
      <Link className="flex gap-2 items-center" href="/home">
        <img src="/logo.jpeg" alt="logo" />
        <h4 className="font-medium">EasyLearn</h4>
      </Link>
      <div className="ml-auto flex gap-2">
        {buttons?.map((button) => (
          <Link href={button.link}>
            <button className="bg-black hover:bg-gray-800 p-1 px-2 rounded-lg text-white text-xs font-medium">
              {button.title}
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Header;
