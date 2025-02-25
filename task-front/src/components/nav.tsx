import { useEffect, useState } from "react";
import { cn } from "../util/utils";
import { Theme, User } from "../store/store";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Calendar,
  Database,
  Notebook,
  FileArchive,
  Home,
  Settings,
  Check,
} from "lucide-react";
import Api from "./callApi";

const Nav = () => {
  const [res, setres] = useState<User>();
  const token = localStorage.getItem("token");
  const nav = useNavigate();
  const { theme } = Theme();
  const [image, setimage] = useState(" ");

  useEffect(() => {
    const fetchUser = async () => {
      const response = await Api.get("/getUser", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data) {
        setres(response.data);
      }
    };
    fetchUser();
  }, [nav, token, res]);

  useEffect(() => {
    const byteArray = new Uint8Array(res?.image.data.data);
    const blob = new Blob([byteArray], {
      type: res?.image.contentType,
    });
    const imageUrl = URL.createObjectURL(blob);
    setimage(imageUrl);
  }, [res?.image]);

  return (
    <nav
      className={cn(
        "flex flex-col flex-0.5 sticky bottom-0  font-medium rounded-lg ml-4 shadow-2xl  text-md h-screen text-slate-200  w-52 b",
        {
          "bg-neutral-200 text-black": theme !== "dark",
        }
      )}
    >
      <header
        className={cn(
          "flex bg-stone-700 shadow-md rounded-md h-max w-max p-2  flex-row gap-3",
          {
            "bg-neutral-50": theme !== "dark",
          }
        )}
      >
        <div>
          {res?.image ? (
            <img className="w-10 h-10 rounded-full " src={image} alt="" />
          ) : (
            <div className="w-10 h-10 rounded-full uppercase bg-red-500 flex items-center justify-center ">
              {res?.name.substring(0, 1)}
            </div>
          )}
        </div>
        <div className="font-medium text-sm mt-2 capitalize ">{res?.name}</div>
        <NavLink to={"/params"} className="mt-2 cursor-pointer">
          <Settings />
        </NavLink>
      </header>
      <main className="flex flex-col">
        <label className="text-2xl" htmlFor="">
          All
        </label>
        <p className="flex flex-col gap-3 ">
          <NavLink to={"/connect"} className="flex flex-row gap-2 pl-3">
            <Home /> Acceuil
          </NavLink>
        </p>
        <p className="flex flex-col gap-3 ">
          <label className="text-2xl" htmlFor="">
            Mes taches
          </label>
          <NavLink to={"/day"} className="flex flex-row gap-2 pl-3">
            <Calendar /> Aujourdh'hui
          </NavLink>
          <NavLink to={"/getTask"} className="flex flex-row gap-2 pl-3">
            <Database /> Tous les taches
          </NavLink>
          <NavLink to={"/compltetTask"} className="flex flex-row gap-2 pl-3">
            <Check className="text-lime-100 rounded-full p-1 bg-blue-500" />{" "}
            tache effectué
          </NavLink>
        </p>
        <p className="flex flex-col gap-3 ">
          <label className="text-2xl" htmlFor="">
            Notes
          </label>
          <NavLink to={"/getNotes"} className="flex flex-row gap-2 pl-3 ">
            <Notebook /> Note
          </NavLink>
          <NavLink to={"/multimedia"} className="flex flex-row gap-2 pl-3 ">
            <FileArchive /> Multimedia
          </NavLink>
        </p>
        <p className="flex flex-col gap-3 ">
          <label className="text-2xl" htmlFor="">
            Rendez-vous
          </label>
          <NavLink to={"/Date"} className="flex flex-row gap-2 pl-3">
            <Calendar />
            important
          </NavLink>
        </p>
      </main>
    </nav>
  );
};

export default Nav;
