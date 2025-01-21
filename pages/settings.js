import InputController from "@/components/forms/InputController";
import SelectInput from "@/components/forms/SelectController";
import Link from "next/link";
import { useRouter } from "next/router";

const Settings = () => {

    const router = useRouter()

    const Signout = () => {
        localStorage.clear("user")
        router.push("/auth/login")
    }

    return <div className="">
        <div className="flex mt-2 shadow-md p-3">
            <h1 className="text-xl">Settings</h1>
            <Link href={"/home"} className="bg-black ml-auto text-white px-7 flex items-center text-sm rounded-md">Home</Link>
        </div>
        <div className="px-3">
            <h1 className="text-lg mt-5 mb-2 font-medium">App Language</h1>
            <SelectInput label={"Language"} options={["Marathi", "English"]} />
            <h1 className="text-lg mt-5 font-medium">Connect CuriO device ID</h1><br />
            <div className="flex">
                <InputController label={"Device ID"} />
                <button className="bg-black ml-auto text-white px-6 text-sm rounded-md">Update</button>
            </div>
            <h1 className="mt-4 text-lg font-medium">About App</h1>
            <p className="text-gray-700 text-sm mt-3">App Version 1.0, Developed by dVerse Technologies</p>
            <button onClick={Signout} className="bg-black w-full mt-7 text-white py-2 text-sm rounded-md">Sign Out</button>
        </div>
    </div>
}

export default Settings;