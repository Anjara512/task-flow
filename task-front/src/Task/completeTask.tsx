import React, { useEffect, useState } from "react";
import { cn } from "../util/utils";
import Header from "../components/Header";
import { Theme } from "../store/store";
import Nav from "../components/nav";
import Api from "../components/callApi";
import { taches } from "./getTask";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";

const CompleteTask = () => {
  const { theme, disposition } = Theme();
  const nav = useNavigate();
  const token = localStorage.getItem("token");
  const [taskcomplete, settaskcomplete] = useState<taches>();
  useEffect(() => {
    const fetchUser = async () => {
      const response = await Api.get("/getUser/getTaks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response) {
        settaskcomplete(response.data.complete);
      }
    };
    fetchUser();
  }, [nav, token, taskcomplete]);
  const deleter = async (e: string) => {
    try {
      const response = await Api.delete(`/getUser/deleteTask/${e}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response) {
        const nouvelleTache = await Api.get("/getUser/getTask", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (nouvelleTache) {
          settaskcomplete(response.data.complete);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div
      className={cn("flex flex-col w-full text-zinc-50 bg-zinc-700 h-screen", {
        "bg-zinc-100 text-zinc-800": theme !== "dark",
      })}
    >
      <Header />
      <main className="flex flex-row w-full bg-transparent">
        <Nav />
        <div className="flex flex-col w-full">
          <h1 className="uppercase font-medium text-lg ml-4 mt-4">
            les taches deja effectué
          </h1>
          <ul
            className={cn(" ml-2 mt-4  grid gap-7 grid-cols-6", {
              "flex flex-col w-full ": disposition !== "grille",
            })}
          >
            {taskcomplete?.map((el) => (
              <li
                key={el._id}
                className={cn(
                  " bg-neutral-800   rounded-md p-5 w-40 h-max flex justify-between   font-medium  text-white",
                  {
                    "text-zinc-800 bg-neutral-300 ": theme !== "dark",
                    "w-3/4  mx-4 flex flex-row gap-4": disposition !== "grille",
                  }
                )}
              >
                {el.content}
                <Trash2
                  onClick={() => deleter(el._id)}
                  className="cursor-pointer text-white   rounded-full p-1 w-max h-max bg-red-500 "
                />
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default CompleteTask;
