import Link from "next/link";

const Header = () => {
  return (
    <Link href="/">
      <div className="p-5 z-50 top-0 bg-white fixed w-full flex items-center gap-2">
        <img src="/logo.jpeg" alt="logo" />
        <h4 className="font-medium">EasyLearn</h4>
      </div>
    </Link>
  );
};

export default Header;
