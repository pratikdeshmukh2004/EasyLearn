import React, { useContext, useState } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useGoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Header from "@/components/Header";
import Link from "next/link";
import InputController from "@/components/forms/InputController";
import DataContext from "@/Context/dataContext";
import { toast } from "react-toastify";
import sheetApiContext from "@/Context/sheetApiContext";

const LoginForm = () => {
  const { workSheetData } = useContext(sheetApiContext);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSuccess = async (credentialResponse) => {
    const users = await workSheetData("Users");
    const token = credentialResponse.access_token;
    fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((userInfo) => {
        console.log(userInfo);
        const user = users.filter(
          (user) => user.get("Email ID") == userInfo.email
        );
        if (user.length) {
          const obj = {};
          user[0]._worksheet.headerValues.forEach((header) => {
            obj[header] = user[0].get(header);
          });
          localStorage.setItem("user", JSON.stringify(obj));
          router.push("/home");
        } else {
          toast.error("User doesn't exists. Please Signup.");
        }
      })
      .catch((error) => {
        console.error("Failed to fetch user info: ", error);
      });
  };

  const login = useGoogleLogin({
    onSuccess: handleSuccess,
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      router.replace("/");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const users = await workSheetData("Users");
    console.log(users, "users....");
    const username = e.target.username.value;
    const password = e.target.password.value;
    const user = users.filter((user) => user.get("Username") == username);
    setLoading(false);
    if (user.length == 0) {
      return toast.error("User doesn't exists. Please Signup.");
    }
    if (user[0].get("Password") == password) {
      const obj = {};
      user[0]._worksheet.headerValues.forEach((header) => {
        obj[header] = user[0].get(header);
      });
      localStorage.setItem("user", JSON.stringify(obj));
      router.push("/home");
      return;
    }
    return toast.error("Invalid username/password");
  };

  return (
    <div>
      <Header />
      <main className="h-screen px-5 items-center justify-center flex flex-col">
        <div className="max-w-sm w-full text-gray-600 space-y-8">
          <h4 className="text-3xl font-bold text-black text-center">Login</h4>
          <form onSubmit={handleSubmit} className="space-y-5">
            <InputController required name="username" label={"Username"} />
            <InputController
              required
              type="password"
              name="password"
              label={"Password"}
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full disabled:bg-gray-900 disabled:cursor-wait mb-3 px-4 py-2 text-white font-medium bg-black rounded-lg duration-150"
            >
              Sign in
            </button>
          </form>
          <div class="inline-flex items-center justify-center w-full">
            <hr class="w-10/12 h-px my-5 bg-gray-200 border-0 dark:bg-gray-700" />
            <span class="absolute px-3 text-center font-medium text-gray-900 bg-white">
              OR
            </span>
          </div>
          {/* Google Login Button */}
          <div className="google-login">
            <button
              onClick={login}
              className="w-full flex items-center justify-center gap-x-3 py-2.5 border rounded-lg text-sm font-medium hover:bg-gray-50 duration-150 active:bg-gray-100"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_17_40)">
                  <path
                    d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.9181H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z"
                    fill="#4285F4"
                  />
                  <path
                    d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z"
                    fill="#34A853"
                  />
                  <path
                    d="M11.0051 28.6006C9.99973 25.6199 9.99973 22.3922 11.0051 19.4115V13.2296H3.03298C-0.371021 20.0112 -0.371021 28.0009 3.03298 34.7825L11.0051 28.6006Z"
                    fill="#FBBC04"
                  />
                  <path
                    d="M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6866 13.0973L40.5387 6.24523C36.2 2.17101 30.4414 -0.068932 24.48 0.00161733C15.4055 0.00161733 7.10718 5.11644 3.03296 13.2296L11.005 19.4115C12.901 13.7235 18.2187 9.49932 24.48 9.49932Z"
                    fill="#EA4335"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_17_40">
                    <rect width="48" height="48" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              Continue with Google
            </button>
          </div>
          <p className="text-center font-medium text-[#474747]">
            Don't have an account? <Link href="/auth/signup">Sign Up</Link>
          </p>
        </div>
      </main>
    </div>
  );
};

const authProvider = () => {
  return (
    <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID}>
      <LoginForm />
    </GoogleOAuthProvider>
  );
};

export default authProvider;
