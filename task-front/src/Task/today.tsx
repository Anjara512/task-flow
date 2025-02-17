import { useEffect, useState } from "react";
import { Theme } from "../store/store";
import { taches } from "./getTask";
import { useNavigate } from "react-router-dom";
import { cn } from "../util/utils";
import Header from "../components/Header";
import Nav from "../components/nav";
import Api from "../components/callApi";
import { MoveUpLeftIcon } from "lucide-react";

const Today = () => {
  const [days, setdays] = useState<taches>();
  const taskday: taches = [];

  const token = localStorage.getItem("token");
  const { theme } = Theme();
  const nav = useNavigate();
  useEffect(() => {
    const fetchUser = async () => {
      const response = await Api.get("/getUser/getTaks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response) {
        setdays(response.data);
      }
    };
    fetchUser();
  }, [nav, token]);
  const roller = () => {
    if (days) {
      for (const day of days) {
        if (day.DateToCreate === new Date().toLocaleDateString()) {
          taskday.push(day);
        }
      }
    }
  };
  roller();
  const navigue = (e: string) => {
    nav(`/modifytask/:${e}`);
  };

  return (
    <div
      className={cn("flex flex-col bg-zinc-950", {
        "bg-zinc-300": theme !== "dark",
      })}
    >
      <Header></Header>
      <main className="flex flex-row">
        <Nav />

        <div
          className={cn("ml-2 text-black mt-2 flex flex-col", {
            "text-white": theme === "dark",
          })}
        >
          <h1 className="font-semibold text-2xl uppercase">
            mes tache du jour:
          </h1>
          <ul className="grid grid-cols-6 gap-4 text-white font-medium text-sm">
            {taskday?.map((el) => (
              <li
                key={el._id}
                className={cn(
                  " bg-neutral-800 hover:border-2 border-pink-500 rounded-md p-5 w-40 h-max  font-medium  text-white",
                  {
                    "text-zinc-800 bg-neutral-300": theme !== "dark",
                  }
                )}
              >
                {el.content}
                <span className="text-white block">{el.TimeToCreate}</span>
                <span className="text-white block">{el.DateToCreate}</span>
                <span>
                  <MoveUpLeftIcon
                    onClick={() => navigue(el._id)}
                    size={40}
                    className="rounded-full bg-blue-500 p-2"
                  />
                </span>
                <span></span>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default Today;
