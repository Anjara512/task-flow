import React from "react";
import { cn } from "../util/utils";
// import { Theme } from "../store/store";

interface getParams {
  value: string;
  state: string;
  onclick: () => void;
}
const Toask: React.FC<getParams> = ({ value, state, onclick }) => {
  return (
    <div
      className={cn(
        "w-max h-max bg-blue-100 font-medium flex flex-row gap-2    focus:ring-2 border-4 border-green-600 px-5 py-2.5  rounded-lg  text-sm  ring-offset-2 cursor-pointer  "
      )}
    >
      {state}
      <div>{value}</div>
      <div
        onClick={onclick}
        className="cursor-pointer relative translate-x-1
        active:bg-amber-100  w-max h-max p-1 rounded-md select-none font-medium text-2xl "
      >
        x
      </div>
    </div>
  );
};

export default Toask;
