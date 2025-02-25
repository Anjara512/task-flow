import { ChevronDown, LogOut, Settings } from "lucide-react";
import Header from "../components/Header";
import Nav from "../components/nav";
import { Theme } from "../store/store";
import { cn } from "../util/utils";
import Api from "../components/callApi";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import Dropdown from "../components/dropdown";

const Params = () => {
  const choice: string[] | number[] = ["grille", "liste"];
  const [open, setopen] = useState(false);
  const [aff, setaff] = useState<string | number>();
  const { theme, changeDisposition, disposition } = Theme();
  const nav = useNavigate();
  const token = localStorage.getItem("token");
  const deconnexion = async () => {
    try {
      const response = await Api.post("/logout", null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data) {
        localStorage.removeItem("token");
        nav("/");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const changeAff = (e: string | number) => {
    setaff(e);
    changeDisposition(String(e));
    localStorage.setItem("dispositon", String(disposition));

    setopen(false);
  };
  return (
    <div
      className={cn("flex flex-col text-zinc-50 bg-zinc-800", {
        "bg-slate-100 text-stone-800": theme !== "dark",
      })}
    >
      <Header />
      <main className={cn("flex flex-row ")}>
        <Nav></Nav>
        <ul className="flex flex-row  mt-3 gap-5   ml-3  w-full      ">
          <NavLink
            to={"/accountparms"}
            className={cn(
              "flex flex-row p-3 shadow-2xl bg-zinc-950 w-max h-max rounded-md gap-3 cursor-pointer",
              {
                "bg-zinc-100": theme !== "dark",
              }
            )}
          >
            <Settings />
            paramétre de compte
          </NavLink>
          <li
            onClick={deconnexion}
            className={cn(
              "flex flex-row p-3 shadow-2xl bg-zinc-950 rounded-md  w-max h-max gap-3 cursor-pointer",
              {
                "bg-zinc-100": theme !== "dark",
              }
            )}
          >
            <LogOut />
            Deconnexion
          </li>
          <li
            className={cn(
              "flex flex-col shadow-2xl p-3 bg-zinc-950 w-max rounded-2xl h-max gap-3 cursor-pointer",
              {
                "bg-zinc-100": theme !== "dark",
              }
            )}
          >
            mode d'affichage:
            {open === false ? (
              <p className="flex flex-row" onClick={() => setopen(true)}>
                {aff}
                <ChevronDown />{" "}
              </p>
            ) : (
              <Dropdown onclick={changeAff} nbrage={choice}></Dropdown>
            )}
          </li>
        </ul>
      </main>
    </div>
  );
};

export default Params;
