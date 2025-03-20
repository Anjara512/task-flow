import React, { useEffect, useState } from "react";
import { cn } from "../util/utils";
import { Date, Theme } from "../store/store";
import Header from "../components/Header";
import Nav from "../components/nav";
import { PlusCircle, Search, Star, Trash2 } from "lucide-react";
import { NavLink } from "react-router-dom";
import Api from "../util/callApi";
import Dropdown from "../components/dropdown";

type dates = Date[];
const MyDate = () => {
  const [search, setsearch] = useState("");
  const { theme, disposition } = Theme();
  const [vip, setvip] = useState(true);
  const token = localStorage.getItem("token");
  const [mydate, setmydate] = useState<dates>();
  const [datefilter, setmydatefilter] = useState<dates>();
  const [searchmode, setsearchmode] = useState<string | number>("motif");
  const [opendrop, setopendrop] = useState(false);

  const mode = ["motif", "personne", "lieu"];

  useEffect(() => {
    const fecthDate = async () => {
      try {
        const response = await Api.get("/getUser/getDate", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response) {
          setmydate(response.data.etc);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fecthDate();
  });
  const deleter = async (e: string) => {
    try {
      const response = await Api.delete(`/getUser/deleteDate/${e}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response) {
        const nouvelleTache = await Api.get("/getUser/getDate", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (nouvelleTache) {
          setmydate(nouvelleTache.data.etc);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  const getFilterDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setsearch(e.target.value);
    if (search.trim() !== " ") {
      setmydatefilter(
        mydate?.filter((el) => {
          switch (searchmode) {
            case "motif":
              return el.motif.startsWith(search);

            case "personne":
              return el.person.startsWith(search);

            default:
              return el.lieu.startsWith(search);
          }
        })
      );
    }
  };
  return (
    <div
      className={cn("flex flex-col  h-screen bg-neutral-800", {
        "bg-neutral-50": theme !== "dark",
      })}
    >
      <Header />
      <main className="flex h-screen flex-row bg-transparent">
        <Nav></Nav>
        <div
          className={cn(
            " bg-zinc-950 flex-2 flex flex-col gap-5  text-zinc-50 shadow-lg rouded-md  h-full",
            {
              "bg-zinc-200 text-black": theme !== "dark",
            }
          )}
        >
          <div className="flex flex-row gap-10">
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
                onChange={getFilterDate}
                placeholder="Recherche..."
                className={cn(
                  "w-62 h-10 text-slate-200 rounded-md   bg-slate-950",
                  {
                    "bg-neutral-300 text-zinc-800": theme !== "dark",
                  }
                )}
                type="search"
              />
            </div>
            <div
              className={cn("text-lg  font-medium ml-4 mt-4 text-stone-100", {
                "text-black": theme !== "dark",
              })}
            >
              rechercher par:
              {!opendrop ? (
                <span
                  onClick={() => setopendrop(true)}
                  className={cn(
                    "w-max h-max p-2 ml-4 text-sm font-medium  border-4 text-white border-b-white bg-stone-900 rounded-md ",
                    {
                      "bg-black  text-zinc-800 border-zinc-800":
                        theme !== "dark",
                    }
                  )}
                >
                  {searchmode}
                </span>
              ) : (
                <Dropdown
                  nbrage={mode}
                  onclick={(e: string | number) => {
                    setopendrop(false);
                    setsearchmode(e);
                  }}
                ></Dropdown>
              )}
            </div>
          </div>
          <NavLink
            to={"/addDates"}
            className={cn(
              "bg-stone-900 flex flex-row cursor-pointer hover:ring-2 ring-offset-2 focus:ring-1 ring-blue-800 focus:outline-none rounded-md p-3 text-md font-medium h-max w-max ",
              {
                "bg-stone-100 text-stone-800": theme !== "dark",
              }
            )}
          >
            <PlusCircle />
            nouvelles rendez vous
          </NavLink>
          <ul
            className={cn(" ml-2 mt-4  grid gap-7 grid-cols-6", {
              "flex flex-col ": disposition !== "grille",
            })}
          >
            {search.trim()
              ? datefilter?.map((el) => (
                  <li className="" key={el._id}>
                    <p
                      className={cn(
                        " p-3  rounded-md text-sm flex flex-col gap-2 font-medium bg-zinc-900 shadow-lg ",
                        {
                          "bg-slate-50": theme !== "dark",
                        }
                      )}
                    >
                      Vous avez rendez-vous avec {el.person} le {el.date} a
                      {el.heurre} pour parler du {el.motif}
                      <span className="flex flex-row justify-between">
                        <Star
                          onClick={() => setvip(!vip)}
                          style={{
                            color: vip === false ? "white" : "yellow",
                          }}
                        />
                        <Trash2
                          onClick={() => deleter(el._id)}
                          size={20}
                          className="cursor-pointer w-max h-max p-2 rounded-full text-white bg-red-500 "
                        />
                      </span>
                    </p>
                  </li>
                ))
              : mydate?.map((el) => (
                  <li className="" key={el._id}>
                    <p
                      className={cn(
                        " p-3  rounded-md text-sm flex flex-col gap-2 font-medium bg-zinc-900 shadow-lg ",
                        {
                          "bg-slate-50": theme !== "dark",
                        }
                      )}
                    >
                      Vous avez rendez-vous avec {el.person} le {el.date} a
                      {el.heurre} pour parler du {el.motif}
                      <span className="flex flex-row justify-between">
                        <Star
                          onClick={() => setvip(!vip)}
                          style={{
                            color: vip === false ? "white" : "yellow",
                          }}
                        />
                        <Trash2
                          onClick={() => deleter(el._id)}
                          size={20}
                          className="cursor-pointer w-max h-max p-2 rounded-full text-white bg-red-500 "
                        />
                      </span>
                    </p>
                  </li>
                ))}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default MyDate;
