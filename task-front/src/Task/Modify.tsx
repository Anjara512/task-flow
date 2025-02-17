import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Api from "../components/callApi";
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
      <main className="flex flex-row">
        <Nav />
        <div className="flex flex-row">
          <div
            className={cn(
              " flex-2 w-max flex-row h-max p-2 rounded-md bg-zinc-800",
              {
                "bg-zinc-50 text-zinc-600": theme !== "dark",
              }
            )}
          >
            <div
              className={cn("w-1/2 h-screen flex-1 bg-zinc-800", {
                "bg-zinc-100": theme !== "dark",
              })}
            >
              {modTask?.content}
            </div>
          </div>
          <form
            action=""
            className={cn("flex flex-col gap-2 flex-1 bg-zinc-500 ")}
            onSubmit={handleSubmit}
          >
            <input type="text" name="newContent" className="input-dark  " />
            <Button value="sauvegarder"></Button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Modify;
