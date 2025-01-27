import InputController from "@/components/forms/InputController";
import SelectInput from "@/components/forms/SelectController";
import Header from "@/components/Header";
import DataContext from "@/Context/dataContext";
import sheetApiContext from "@/Context/sheetApiContext";
import { hashPassword } from "@/utils/passwordManager";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const Signup = () => {
  const { doc, workSheetData } = useContext(sheetApiContext);
  const [dataSheet, setDataSheet] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadDataSheet = async () => {
    const d = await workSheetData("DataSheet");
    setDataSheet(d);
  };

  useEffect(() => {
    loadDataSheet();
  });

  // const users = workSheetData("Users");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = event.target; // Get the form element
    const formData = new FormData(form); // Create a FormData object
    const formObject = {};

    // Iterate over FormData and populate the object
    formData.forEach((value, key) => {
      formObject[key] = value;
    });

    const username = formObject["Username"];
    const password = formObject["Password"];
    const email = formObject["Email ID"];
    setLoading(true);
    const users = await workSheetData("Users");
    let user = users.filter((user) => user.get("Username") == username);
    if (user.length) {
      setLoading(false);
      return toast.error("Username is not available.");
    }
    user = users.filter((user) => user.get("Email ID") == email);
    if (user.length) {
      setLoading(false);
      return toast.error("User already exists. Please Login.");
    }
    if (formObject["Confirm Password"] != password) {
      setLoading(false);
      return toast.error("Confirm password doesn't match.");
    }
    delete formObject["Confirm Password"];
    formObject["Password"] = await hashPassword(formObject["Password"]);
    doc.sheetsByIndex[0].addRows([formObject]).then((data) => {
      console.log("data...", data);
      localStorage.setItem("user", JSON.stringify(formObject));
      router.push("/home");
    });
    setLoading(false);
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
              options={dataSheet
                ?.map((item) => item.get("Standard"))
                .filter((item) => item)}
              label="Standard"
            />
            <SelectInput
              options={dataSheet
                ?.map((item) => item.get("Board"))
                .filter((item) => item)}
              label="Board"
            />
            <SelectInput
              options={dataSheet
                ?.map((item) => item.get("Medium"))
                .filter((item) => item)}
              label="Medium"
            />
            <button
              disabled={loading}
              type="submit"
              className="w-full disabled:cursor-wait mb-3 px-4 py-2 text-white font-medium bg-black rounded-lg duration-150"
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
