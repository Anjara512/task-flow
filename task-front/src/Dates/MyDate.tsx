import React, { useEffect, useState } from "react";
import { cn } from "../util/utils";
import { Date, Theme } from "../store/store";
import Header from "../components/Header";
import Nav from "../components/nav";
import { DeleteIcon, PlusCircle, Star } from "lucide-react";
import { NavLink } from "react-router-dom";
import Api from "../components/callApi";

type dates = Date[];
const MyDate = () => {
  const { theme } = Theme();
  const [vip, setvip] = useState(true);
  const token = localStorage.getItem("token");
  const [mydate, setmydate] = useState<dates>();

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
  return (
    <div
      className={cn("flex flex-col h-screen bg-neutral-800", {
        "bg-neutral-50": theme !== "dark",
      })}
    >
      <Header />
      <main className="flex h-screen flex-row bg-transparent">
        <Nav></Nav>
        <div
          className={cn(
            " bg-zinc-950 flex-2 flex flex-col  text-zinc-50 shadow-lg rouded-md  h-full",
            {
              "bg-zinc-200 text-black": theme !== "dark",
            }
          )}
        >
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
          <ul className="ml-2 grid grid-cols-4 mt-2  ">
            {mydate?.map((el) => (
              <li key={el._id}>
                <p
                  className={cn(
                    " p-3  rounded-md text-sm font-medium bg-zinc-900 shadow-lg ",
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
                    <DeleteIcon
                      onClick={() => deleter(el._id)}
                      className="cursor-pointer"
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
