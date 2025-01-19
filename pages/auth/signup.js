import InputController from "@/components/forms/InputController";
import SelectInput from "@/components/forms/SelectController";
import Header from "@/components/Header";
import Link from "next/link";

const Signup = () => {
  return (
    <div>
      <Header />
      <main className="px-5 items-center justify-center flex flex-col">
        <div className="max-w-sm w-full text-gray-600 space-y-8 mt-20 mb-3">
          <h4 className="text-3xl font-bold text-black text-center">Sign Up</h4>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
            <InputController type="text" label={"Name"} />
            <InputController type="email" label={"Email ID"} />
            <InputController type="username" label={"Username"} />
            <InputController type="password" label={"Password"} />
            <InputController type="password" label={"Confirm Password"} />
            <SelectInput options={[{"label": "1st", "value": "1"}]} label="Standard"/>
            <SelectInput options={[{"label": "1st", "value": "1"}]} label="Board"/>
            <SelectInput options={[{"label": "1st", "value": "1"}]} label="Medium"/>
            <button className="w-full mb-3 px-4 py-2 text-white font-medium bg-black rounded-lg duration-150">
              Sign Up
            </button>
          </form>
          <p className="text-center font-medium text-[#474747]">
            Already have an account? <Link href="/auth/login">Login</Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Signup;
