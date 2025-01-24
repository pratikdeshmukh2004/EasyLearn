import DataContext from "@/Context/dataContext";
import Loader from "@/components/loader";
import "@/styles/globals.css";
import { JWT } from "google-auth-library";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import sheetApiContext from "../Context/sheetApiContext";
import { useRouter } from "next/router";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  const [worksheet, setWorksheet] = useState({});
  const [loading, setLoading] = useState(true);
  const [doc, setDoc] = useState(false);

  const router = useRouter();

  const loadDoc = () => {
    console.log("Initilizing....");
    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const d = new GoogleSpreadsheet(
      process.env.GOOGLE_SPREADSHEET_ID,
      serviceAccountAuth
    );
    d.loadInfo().then(() => {
      console.log("Google Sheet Initilized...");
      setDoc(d);
      setLoading(false);
    });
  };

  const workSheetData = async (sheet, refresh = false) => {
    if (worksheet[sheet] && !refresh) {
      return worksheet[sheet];
    }
    const data = await doc.sheetsByTitle[sheet]
      .getRows()
      .then((data) => {
        setWorksheet({ ...worksheet, [sheet]: data });
        console.log("Loaded sheet:", sheet, data);
        return data;
      })
      .catch((err) => {
        console.log("Sheet Loading Error", err);
      });
    return data;
  };

  const Authorize = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user && !router.asPath.startsWith("/auth") && router.asPath !== "/") {
      router.replace("/auth/login");
    } else {
      setUser(user);
    }
  };

  useEffect(() => {
    loadDoc();
    Authorize();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="max-w-sm mx-auto">
      <Head>
        <title>EasyLearn</title>
      </Head>
      <sheetApiContext.Provider value={{ doc, workSheetData, user }}>
        <ToastContainer />
        <Component {...pageProps} />
      </sheetApiContext.Provider>
    </div>
  );
}
