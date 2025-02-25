import { useEffect, useState } from "react";
import { cn } from "../util/utils";
import Header from "../components/Header";
import Nav from "../components/nav";
import { NavLink, useNavigate } from "react-router-dom";
import Api from "../components/callApi";
import { Theme } from "../store/store";
import { Check, Pencil, Search, Trash2 } from "lucide-react";
import { Button } from "../components/input";
import Time from "../components/time";
export interface tache {
  _id: string;
  content: string;
  DateToCreate: string;
  TimeToCreate: string;
  complete: boolean;
}
export type taches = tache[];

const GetTask = () => {
  const [option, setoption] = useState(false);
  const [id, setid] = useState<string[]>([]);
  const [currentId, setcurrentId] = useState<string>();
  const [task, settask] = useState<taches>([]);
  const [taskFilter, settaskFilter] = useState<taches>();
  const [search, setsearch] = useState(" ");
  const nav = useNavigate();
  const token = localStorage.getItem("token");
  const { theme, disposition } = Theme();
  useEffect(() => {
    const fetchUser = async () => {
      const response = await Api.get("/getUser/getTaks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response) {
        settask(response.data.incomplete);
      }
    };
    fetchUser();
  }, [nav, token, task]);

  const navigue = (e: string | undefined) => {
    nav(`/modifytask/:${e}`);
  };
  const getSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setsearch(e.target.value);
    if (search.trim() !== " ") {
      const newBies = task?.filter((el) => {
        return el.content.startsWith(search.trim());
      });
      settaskFilter(newBies);
    }
  };
  const deleter = async (e: string[] | undefined) => {
    const response = await Api.delete(`/getUser/deleteTask/${e}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response) {
      setid([]);
      setoption(false);
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
      console.log(response.data);
      settask(response.data);
      setid([]);
      setoption(false);
    }
  };

  return (
    <div
      style={{ backgroundSize: "cover", height: "500vh" }}
      className={cn("flex flex-col flex-4 w-screen   bg-stone-950  ", {
        "bg-stone-50": theme !== "dark",
      })}
    >
      <Header></Header>
      <main className={cn("flex flex-row h-screen w-screen")}>
        <Nav />
        <div className="flex flex-col w-full   ">
          <main className="flex   justify-between mx-4   bg-zinc-transparent ">
            <div
              className={cn(
                "text-zinc-400 w-max h-max p-2 rounded-md ml-4 mt-4 bg-zinc-800 flex flex-row gap-2 ",
                {
                  "bg-slate-200": theme !== "dark",
                }
              )}
            >
              <Search
                className={cn("text-zinc-100 mt-2", {
                  "text-zinc-800": theme !== "dark",
                })}
              />
              <input
                value={search}
                onChange={getSearch}
                placeholder="Recherche..."
                className={cn(
                  "w-62 h-10 text-slate-200 rounded-md   bg-slate-950",
                  {
                    "bg-neutral-300 text-zinc-800": theme !== "dark",
                  }
                )}
              />
            </div>
            <NavLink to={"/addTask"} className=" mt-4">
              <Button value="Ajouter une nouvelle tache"></Button>
            </NavLink>

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
          </main>
          <ul
            className={cn(" ml-2 mt-4  grid gap-7 grid-cols-6", {
              "flex flex-col ": disposition !== "grille",
            })}
          >
            {search.trim()
              ? taskFilter?.map((el) => (
                  <li
                    key={el._id}
                    className={cn(
                      " bg-neutral-800   rounded-md p-5 w-40 h-max  font-medium  text-white",
                      {
                        "text-zinc-800 bg-neutral-300 ": theme !== "dark",
                        "w-3/4  mx-4 flex flex-row gap-4":
                          disposition !== "grille",
                        "border-blue-500 border-2": id.indexOf(el._id) !== -1,
                      }
                    )}
                  >
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
                    {el.content}
                    <span className="text-white block">{el.TimeToCreate}</span>
                    <span className="text-white block">{el.DateToCreate}</span>
                  </li>
                ))
              : task?.map((el) => (
                  <li
                    key={el._id}
                    className={cn(
                      " bg-neutral-800 hover:outline-none flex justify-between  rounded-md p-5 w-40 h-max  font-medium  text-white",
                      {
                        "text-zinc-800 bg-neutral-300": theme !== "dark",
                        "w-3/4 mx-2 flex flex-row gap-4  ":
                          disposition !== "grille",
                        "border-blue-500 border-2": id.indexOf(el._id) !== -1,
                      }
                    )}
                  >
                    <div className="flex flex-row gap-4">
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
                  </li>
                ))}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default GetTask;
