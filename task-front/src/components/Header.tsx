import { NavLink, useNavigate } from "react-router-dom";
import { Theme, useConnexion } from "../store/store";
import { cn } from "../util/utils";
import { Eye, EyeOffIcon, Mail, Moon, Sun } from "lucide-react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import Input, { Button } from "./input";
import { useState } from "react";
import { loginUser } from "../util/service";

const Header = ({ isconnect }: { isconnect?: boolean }) => {
  const { theme, toggleTheme } = Theme();
  const { connexion, toogleConnexion } = useConnexion();
  const [type, settype] = useState("password");
  const nav = useNavigate();

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    const data = await loginUser(e);
    if (data) {
      localStorage.setItem("token", data.token);
      toogleConnexion();
      nav("/connect");
    }
  };
  return (
    <header
      className={cn(
        "flex bg-zinc-100  top-0 sticky z-10 shadow-lg flex-row justify-between pt-3 pb-2 ",
        {
          "bg-zinc-950": theme === "dark",
        }
      )}
    >
      <h1
        className={cn(
          "uppercase bg-clip-text text-transparent font-semibold  text-4xl font-mono bg-gradient-to-r from-sky-500 to-purple-400"
        )}
      >
        Task flow
      </h1>
      {connexion ? (
        <form
          action=""
          onSubmit={login}
          className={cn(
            "flex flex-col absolute bg-gray-950 mr-20 mt-20 gap-4 border border-blue-500 rounded-md p-4  "
          )}
        >
          <Input
            size={1}
            type="email"
            name="email"
            icone={Mail}
            placeholder="votre email"
          />
          <Input
            size={1}
            type={type}
            onclick={() => settype(type === "password" ? "text" : "password")}
            name="password"
            icone={type === "password" ? EyeOffIcon : Eye}
            placeholder="votre mot de passe"
          />

          <Button value="connexion"></Button>
          <NavLink className="text-blue-500" to={"/create1"}>
            create a new account
          </NavLink>
        </form>
      ) : null}

      <div className="flex flex-row gap-3 relative justify-evenly ">
        {isconnect && (
          <span
            onClick={toogleConnexion}
            className="px-3 relative py-2 rounded-lg bg-green-400 cursor-pointer "
          >
            connexion
          </span>
        )}
        {theme === "dark" ? (
          <Moon
            onClick={toggleTheme}
            className={cn("text-white text-3xl cursor-pointer", {
              "text-zinc-800": theme !== "dark",
            })}
          />
        ) : (
          <Sun
            onClick={toggleTheme}
            className={cn("text-white text-3xl cursor-pointer", {
              "text-zinc-800": theme !== "dark",
            })}
          />
        )}
        <FaLinkedin
          className={cn("text-white text-3xl cursor-pointer", {
            "text-zinc-800": theme !== "dark",
          })}
        />
        <FaGithub
          className={cn("text-white text-3xl cursor-pointer", {
            "text-zinc-800": theme !== "dark",
          })}
        />
      </div>
    </header>
  );
};

export default Header;
