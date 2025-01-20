import InputController from "@/components/forms/InputController";
import SelectInput from "@/components/forms/SelectController";
import Header from "@/components/Header";
import DataContext from "@/Context/dataContext";
import Link from "next/link";
import { useContext } from "react";
import { toast } from "react-toastify";

const Signup = () => {
  const { users, dataSheet, doc } = useContext(DataContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = event.target; // Get the form element
    const formData = new FormData(form); // Create a FormData object
    const formObject = {};

    // Iterate over FormData and populate the object
    formData.forEach((value, key) => {
      formObject[key] = value;
    });
    console.log(formObject);

    const username = formObject["Username"];
    const password = formObject["Password"];
    const email = formObject["Email ID"];
    let user = users.filter((user) => user.get("Username") == username);
    if (user.length) {
      return toast.error("Username is not available.");
    }
    user = users.filter((user) => user.get("Email ID") == email);
    if (user.length) {
      return toast.error("User already exists. Please Login.");
    }
    if (formObject["Confirm Password"] != password) {
      return toast.error("Confirm password doesn't match.");
    }
    delete formObject["Confirm Password"];
    doc.sheetsByIndex[0].addRows([formObject]).then((data) => {
      console.log("data...", data);
      localStorage.setItem("user", JSON.stringify(formObject));
      window.location.href = "/language";
    });
    return;
  };

  return (
    <div>
      <Header />
      <main className="px-5 items-center justify-center flex flex-col">
        <div className="max-w-sm w-full text-gray-600 space-y-8 mt-20 mb-3">
          <h4 className="text-3xl font-bold text-black text-center">Sign Up</h4>
          <form onSubmit={handleSubmit} className="space-y-5">
            <InputController required type="text" label={"Name"} />
            <InputController required type="email" label={"Email ID"} />
            <InputController required type="username" label={"Username"} />
            <InputController required type="password" label={"Password"} />
            <InputController
              required
              type="password"
              label={"Confirm Password"}
            />
            <SelectInput
              options={dataSheet?.map((item) => item.get("Standard")).filter((item)=>item)}
              label="Standard"
            />
            <SelectInput
              options={dataSheet?.map((item) => item.get("Board")).filter((item)=>item)}
              label="Board"
            />
            <SelectInput
              options={dataSheet?.map((item) => item.get("Medium")).filter((item)=>item)}
              label="Medium"
            />
            <button
              type="submit"
              className="w-full mb-3 px-4 py-2 text-white font-medium bg-black rounded-lg duration-150"
            >
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
