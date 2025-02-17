import { Theme } from "../store/store";
import { cn } from "../util/utils";
import { Moon, Sun } from "lucide-react";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const Header = () => {
  const { theme, toggleTheme } = Theme();
  return (
    <header
      className={cn(
        "flex bg-zinc-100 top-0 sticky shadow-lg flex-row justify-between pt-3 pb-2 ",
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

      <div className="flex flex-row gap-3 justify-evenly ">
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
