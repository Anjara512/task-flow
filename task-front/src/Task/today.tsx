import { useEffect, useState } from "react";
import { Theme } from "../store/store";
import { taches } from "./getTask";
import { useNavigate } from "react-router-dom";
import { cn } from "../util/utils";
import Header from "../components/Header";
import Nav from "../components/nav";
import Api from "../components/callApi";
import { Check, Pencil, Trash2 } from "lucide-react";
import Time from "../components/time";

const Today = () => {
  const [option, setoption] = useState(false);
  const [id, setid] = useState<string[]>([]);
  const [currentId, setcurrentId] = useState<string>();

  const [days, setdays] = useState<taches>();
  let taskday: taches = [];

  const token = localStorage.getItem("token");
  const { theme, disposition } = Theme();
  const nav = useNavigate();
  useEffect(() => {
    const fetchUser = async () => {
      const response = await Api.get("/getUser/getTaks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response) {
        setdays(response.data.incomplete);
      }
    };
    fetchUser();
  }, [nav, token, days]);
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
  const navigue = (e: string | undefined) => {
    nav(`/modifytask/:${e}`);
  };
  const deleter = async (e: string[] | undefined) => {
    try {
      const response = await Api.delete(`/getUser/deleteTask/${e}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response) {
        const nouvelleTache = await Api.get("/getUser/getTaks", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (nouvelleTache) {
          taskday = nouvelleTache.data;
          setcurrentId(" ");
          setoption(false);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  const getCurrent = (e: string) => {
    setoption(option === true ? false : true);
    setcurrentId(e);
    if (id.includes(e)) {
      setid(
        id.filter((el) => {
          return el != e;
        })
      );
    } else {
      setid([...id, e]);
    }
  };

  const changeToComplete = async (el: string[] | undefined) => {
    const response = await Api.get(`/getUser/completedTask/${el}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response) {
      setdays(response.data);
      setid([]);
      setoption(false);
    }
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
          className={cn("ml-2 text-black mt-2 w-full flex flex-col", {
            "text-white": theme === "dark",
          })}
        >
          <div className={cn("flex flex-row justify-end ")}>
            <span className="flex flex-row justify-between mt-4 mr-4  gap-5">
              {id.length > 0 && id.length < 2 ? (
                <Pencil
                  onClick={() => navigue(currentId)}
                  aria-label="modifier le contenu"
                  size={40}
                  className="rounded-full text-white cursor-pointer bg-green-500 p-2"
                />
              ) : null}
              {id.length > 0 ? (
                <div className="flex flex-row gap-5">
                  <Trash2
                    onClick={() => deleter(id)}
                    size={40}
                    className="rounded-full text-slate-50 cursor-pointer bg-red-500 p-2"
                  />
                  <Check
                    onClick={() => changeToComplete(id)}
                    aria-label="modifier le contenu"
                    size={40}
                    className="rounded-full text-white cursor-pointer bg-blue-500 p-2"
                  />
                </div>
              ) : null}
            </span>
          </div>
          <h1 className="font-semibold text-2xl uppercase">
            mes tache du jour:
          </h1>
          <ul
            className={cn(" ml-2 mt-4 w-full  grid gap-7 grid-cols-6", {
              "flex flex-col ": disposition !== "grille",
            })}
          >
            {taskday?.map((el) => (
              <li
                key={el._id}
                className={cn(
                  " bg-neutral-800 hover:border-2 border-pink-500 rounded-md p-5 w-40 h-max  font-medium  text-white",
                  {
                    "text-zinc-800 bg-neutral-400": theme !== "dark",
                    "w-3/4  mx-4 flex flex-row gap-4": disposition !== "grille",
                  }
                )}
              >
                <div className="flex w-full justify-between">
                  <div className="flex flex-row gap-4">
                    <label className="inline-flex items-center cursor-pointer group">
                      <input
                        onClick={() => getCurrent(el._id)}
                        checked={id.indexOf(el._id) === -1 ? false : true}
                        type="checkbox"
                        className="peer h-6 w-6 opacity-0 absolute cursor-pointer"
                      />

                      <div
                        className="h-6 w-6 border-2 border-gray-300 rounded-md flex items-center justify-center
    transition-colors
    peer-checked:bg-blue-600
    peer-checked:border-blue-600
    group-hover:border-blue-400
    peer-focus:outline-none
    peer-focus:ring-2
    peer-focus:ring-blue-400"
                      >
                        <svg
                          className="checkmark h-4 w-4 text-white opacity-0 transition-opacity duration-200
      peer-checked:opacity-100"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                        >
                          <path
                            d="M20 6L9 17l-5-5"
                            stroke-width="2"
                            stroke-linecap="round"
                          />
                        </svg>
                      </div>
                    </label>

                    <div className="mt-2">{el.content}</div>
                  </div>
                  <span className="flex flex-row gap-3">
                    <span className=" block bg-blue-600 rounded-lg p-2 ">
                      <Time time={el.TimeToCreate} />
                    </span>
                    <span className="block bg-lime-600 rounded-lg p-2 ">
                      {el.DateToCreate}
                    </span>
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default Today;
