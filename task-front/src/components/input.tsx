import { Theme } from "../store/store";
import { cn } from "../util/utils";
import { LucideProps } from "lucide-react";

interface input {
  name: string;
  type: string;
  icone: React.ComponentType<LucideProps> | string;
  placeholder: string;
  size: number;
  onclick?: () => void;
  change?: () => void;
}

interface buttonProps {
  value: string;
}
const Input = ({ type, name, icone: Icon, placeholder, onclick }: input) => {
  const { theme } = Theme();
  return (
    <div
      className={cn(
        "text-zinc-400 w-full h-max p-2 rounded-md  mt-4 bg-transparent flex flex-row gap-2 "
      )}
    >
      <Icon
        onClick={onclick}
        className={cn("text-zinc-100 mt-2", {
          "text-zinc-800": theme !== "dark",
        })}
      />
      <input
        placeholder={placeholder}
        className={cn(
          "w-full bg-transparent  px-4 py-2 border border-gray-300 rounded-lg  shadow-sm focus-outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400",
          {
            "text-black": theme !== "dark",
          }
        )}
        type={type}
        name={name}
        id=""
      />
    </div>
  );
};

export const Button = ({ value }: buttonProps) => {
  return (
    <button
      className={cn(
        "bg-blue-500 hover:bg-blue-700 text-white font-bold  py-2 px-4 rounded-full shadow-lg transform transition-all duation-300 hover:scle-105 focus:outline-none focus:ring-2 focus-ring-blue-500 focus:ring-opacity-50 "
      )}
    >
      {value}
    </button>
  );
};
export default Input;
