import { useEffect, useState } from "react";
import { cn } from "../util/utils";
import Header from "../components/Header";
import Nav from "../components/nav";
import { NavLink, useNavigate } from "react-router-dom";
import Api from "../components/callApi";
import { Theme } from "../store/store";
import { DeleteIcon, MoveUpLeftIcon, Search } from "lucide-react";
import { Button } from "../components/input";
export interface tache {
  _id: string;
  content: string;
  DateToCreate: string;
  TimeToCreate: string;
  complete: boolean;
}
export type taches = tache[];

const GetTask = () => {
  const [task, settask] = useState<taches>();
  const [taskFilter, settaskFilter] = useState<taches>();
  const [search, setsearch] = useState(" ");
  const nav = useNavigate();
  const token = localStorage.getItem("token");
  const { theme } = Theme();
  useEffect(() => {
    const fetchUser = async () => {
      const response = await Api.get("/getUser/getTaks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response) {
        settask(response.data);
      }
    };
    fetchUser();
  }, [nav, token]);

  const navigue = (e: string) => {
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
  const deleter = async (e: string) => {
    try {
      const response = await Api.delete(`/getUser/deleteTask/${e}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response) {
        const nouvelleTache = await Api.get("/getUser/getTaks", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (nouvelleTache) {
          settask(nouvelleTache.data);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className={cn("flex flex-col flex-4 bg-zinc-950 h-screen", {
        "bg-red-50": theme !== "dark",
      })}
    >
      <Header></Header>
      <main className={cn("flex flex-row ")}>
        <Nav />
        <div className="flex flex-col ">
          <main className="flex   justify-between">
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
            <NavLink to={"/addTask"} className="">
              <Button value="Ajouter une nouvelle tache"></Button>
            </NavLink>
          </main>
          <ul className=" ml-2 mt-4  grid gap-7 grid-cols-6">
            {search.trim()
              ? taskFilter?.map((el) => (
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
                    <span className="flex flex-row justify-between">
                      <MoveUpLeftIcon
                        onClick={() => navigue(el._id)}
                        size={40}
                        className="rounded-full bg-blue-500 p-2"
                      />
                      <DeleteIcon
                        onClick={() => deleter(el._id)}
                        size={30}
                        className="rounded-full cursor-pointer bg-blue-500 p-2"
                      />
                    </span>
                  </li>
                ))
              : task?.map((el) => (
                  <li
                    key={el._id}
                    className={cn(
                      " bg-neutral-800 hover:border-2 border-pink-500 rounded-md p-5 w-40 h-max  font-medium  text-white",
                      {
                        "text-zinc-800 bg-neutral-300": theme !== "dark",
                      }
                    )}
                  >
                    terminer:{" "}
                    <input
                      type="checkbox"
                      checked={el.complete}
                      name=""
                      id=""
                    />
                    {el.content}
                    <span className=" block">{el.TimeToCreate}</span>
                    <span className=" block">{el.DateToCreate}</span>
                    <span className="flex flex-row gap-3">
                      <MoveUpLeftIcon
                        onClick={() => navigue(el._id)}
                        size={30}
                        className="rounded-full cursor-pointer bg-blue-500 p-2"
                      />

                      <DeleteIcon
                        onClick={() => deleter(el._id)}
                        size={30}
                        className="rounded-full cursor-pointer bg-blue-500 p-2"
                      />
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
