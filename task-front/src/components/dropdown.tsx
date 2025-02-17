import React from "react";
import { cn } from "../util/utils";
import { Theme } from "../store/store";
import { ChevronDown } from "lucide-react";
interface propsDown {
  nbrage?: string[] | number[];
  onclick: (index: number | string) => void;
}
const Dropdown: React.FC<propsDown> = ({ nbrage, onclick }) => {
  const { theme } = Theme();
  return (
    <span
      style={{ scrollbarWidth: "none" }}
      className={cn(
        "absolute h-52 w-max p-2 overflow-x-scroll font-medium text-sm rounded-md  bg-zinc-800 scroll-m-80",
        {
          "bg-zinc-400": theme !== "dark",
        }
      )}
    >
      {nbrage?.map((index) => (
        <p
          onClick={() => onclick(index)}
          className={cn(
            "hover:border-4 flex flex-row hover:border-white text-md font-medium  p-3 rounded-md cursor-pointer text-zinc-200",
            {
              "text-slate-800 hover-border-black": theme !== "dark",
            }
          )}
        >
          {index}
          <ChevronDown />
        </p>
      ))}
    </span>
  );
};

export default Dropdown;
