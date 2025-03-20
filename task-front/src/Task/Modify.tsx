import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Api from "../util/callApi";
import { cn } from "../util/utils";
import Header from "../components/Header";
import Nav from "../components/nav";
import { tache } from "./getTask";
import { Button } from "../components/input";
import { Theme } from "../store/store";

const Modify = () => {
  const { theme } = Theme();
  const nav = useNavigate();
  const token = localStorage.getItem("token");
  const params = useParams();
  const [modTask, setmodTask] = useState<tache>();

  useEffect(() => {
    const getTaktoModify = async () => {
      const response = await Api.get(`/getUser/modify/${params.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data) {
        setmodTask(response.data[0]);
      }
    };
    getTaktoModify();
  }, [nav, token, params.id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const content = form.get("newContent") as string;
    const TimeToCreate = new Date().toLocaleTimeString();
    const DateToCreate = new Date().toLocaleDateString();
    if (content) {
      try {
        const response = await Api.patch(
          `/getUser/modifier/${params.id}`,
          { content, DateToCreate, TimeToCreate },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.data) {
          nav("/getTask");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <div className={cn("flex flex-col")}>
      <Header />
      <main
        className={cn("flex flex-row  bg-slate-50    ", {
          "text-zinc-50 bg-slate-950": theme === "dark",
        })}
      >
        <Nav />
        <div className={cn("flex flex-col ml-4   mt-4 bg-transparent ")}>
          <div
            className={cn("  w-max flex-row h-max p-2 rounded-md bg-zinc-800", {
              "bg-zinc-100 text-zinc-600": theme !== "dark",
            })}
          >
            <label htmlFor="">ancien contenu</label>
            <div
              className={cn(
                "w-max h-max p-4 rounded-md font-medium  flex-1 bg-zinc-800",
                {
                  "bg-zinc-100": theme !== "dark",
                }
              )}
            >
              {modTask?.content}
              <p>{modTask?.DateToCreate}</p>
            </div>
          </div>
          <form
            action=""
            className={cn(
              "flex flex-col gap-2 w-max h-max p-4 rounded-md mt-4  flex-1 bg-zinc-500 ",
              { "bg-amber-50": theme !== "dark" }
            )}
            onSubmit={handleSubmit}
          >
            <label htmlFor="">nouveau contenu </label>
            <input
              type="text"
              name="newContent"
              className={cn("input-dark", {
                "input-white": theme !== "dark",
              })}
            />
            <Button value="sauvegarder"></Button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Modify;
