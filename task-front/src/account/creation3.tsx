import React from "react";
import { cn } from "../util/utils";
import Header from "../components/Header";
import { Theme } from "../store/store";
import { Button } from "../components/input";
import { useState } from "react";
import Dropdown from "../components/dropdown";
import { useNavigate } from "react-router-dom";

const creation3 = () => {
  const [opensexe, setopensexe] = useState(true);
  const [openage, setopenage] = useState(true);
  const [sexe, setsexe] = useState<number | string>("Homme");
  const [age, setage] = useState<number | string>(18);
  const nav = useNavigate();

  const { theme, user } = Theme();
  const nbrage: number[] = [];
  const tabsexe: string[] = ["Homme", "Femme", "Ne pas mentionner"];

  const ages = 90;
  for (let i = 1; i < ages; i++) {
    nbrage.push(i);
  }
  const getAge = (e: number | string) => {
    setage(e);
    setopenage(true);
  };
  const getSexe = (e: number | string) => {
    setsexe(e);
    setopensexe(true);
  };
  const handleSub = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const name = data.get("name") as string;
    if (name) {
      user.name = name;
      user.age = Number(age);
      user.sexe = String(sexe);
      console.log(user);
      nav("/finally");
    }
  };

  return (
    <div
      className={cn("flex flex-col bg-zinc-900 h-screen", {
        "bg-zinc-50 text-zinc-900": theme !== "dark",
      })}
    >
      <Header />
      <main
        className={cn("flex w-full h-full mt-15 bg-zinc-900", {
          "bg-zinc-50": theme !== "dark",
        })}
      >
        <form
          action=""
          onSubmit={handleSub}
          className="flex flex-col w-full gap-10 text-white"
        >
          <div className="w-full flex justify-center">
            <h1 className="uppercase font-medium text-3xl p-3 h-max w-max border-1 border-lime-700 rounded-md ">
              information personnel
            </h1>
          </div>
          <label htmlFor="" className="text-2xl font-medium">
            votre pseudo
          </label>
          <input
            type="text"
            className={cn("input-dark", {
              "input-white ml-2": theme !== "dark",
            })}
            name="name"
            id=""
          />
          <div className="flex flex-row gap-2">
            <div
              className={cn("text-2xl ml-4 text-stone-100", {
                "text-black": theme !== "dark",
              })}
            >
              sexe:
              {opensexe ? (
                <span
                  onClick={() => setopensexe(false)}
                  className={cn(
                    "w-max h-max p-2 ml-4 text-sm font-medium  border-4 text-white border-b-white bg-stone-900 rounded-md ",
                    {
                      "bg-black  text-zinc-800 border-zinc-800":
                        theme !== "dark",
                    }
                  )}
                >
                  {sexe}
                </span>
              ) : (
                <Dropdown
                  onclick={(e) => getSexe(e)}
                  nbrage={tabsexe}
                ></Dropdown>
              )}
            </div>
          </div>
          <div>
            <span
              className={cn("text-2xl ml-4 text-stone-100", {
                "text-black": theme !== "dark",
              })}
            >
              age:
            </span>

            {openage ? (
              <span
                onClick={() => setopenage(false)}
                className={cn(
                  "w-max h-max  ml-4 p-2 text-sm font-medium  border-4 text-white border-b-white bg-stone-900 rounded-md ",
                  {
                    "bg-black  text-zinc-800 border-zinc-800": theme !== "dark",
                  }
                )}
              >
                {age}
              </span>
            ) : (
              <Dropdown onclick={(e) => getAge(e)} nbrage={nbrage}></Dropdown>
            )}
          </div>
          <Button value="suivant"></Button>
        </form>
      </main>
    </div>
  );
};

export default creation3;
