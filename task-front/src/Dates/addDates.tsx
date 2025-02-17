import { cn } from "../util/utils";
import { Theme } from "../store/store";
import Header from "../components/Header";
import { GroupIcon, Map, User } from "lucide-react";
import { Button } from "../components/input";
import Api from "../components/callApi";
import { useNavigate } from "react-router-dom";

const AddDates = () => {
  const { theme } = Theme();
  const token = localStorage.getItem("token");
  const nav = useNavigate();

  const AddDates = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const person = form.get("person") as string;
    const motif = form.get("motif") as string;
    const lieu = form.get("lieu") as string;
    const heurre = form.get("heurre") as string;
    const date = form.get("date") as string;
    const createdAt = new Date().toLocaleTimeString();

    try {
      const response = await Api.post(
        "/getUser/addDates",
        { person, motif, lieu, heurre, date, createdAt },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.data) {
        nav("/Date");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // const week = [
  //   "lundi",
  //   "mardi",
  //   "mercredi",
  //   "jeudi",
  //   "vendredi",
  //   "samedie",
  //   "dimanche",
  // ];
  // const month = [
  //   "janvier",
  //   "fevrier",
  //   "mars",
  //   "avril",
  //   "mai",
  //   "juin",
  //   "juillet",
  //   "aôut",
  //   "septembre",
  //   "octobre",
  //   "novembre",
  //   "decembre",
  // ];

  return (
    <div
      className={cn("bg-zinc-800 text-md font-medium h-screen flex flex-col", {
        "bg-zinc-50": theme !== "dark",
      })}
    >
      <Header />
      <main className="flex flex-col">
        <form
          action=""
          onSubmit={AddDates}
          className={cn("text-white ml-2 flex gap-3 flex-col ", {
            "text-black": theme !== "dark",
          })}
        >
          <label htmlFor="" className="font-medium text-lg">
            le personne du rendez-vous:
          </label>
          <div
            className={cn(
              "flex flex-row bg-zinc-600 w-max h-max mt-4 p-1 rounded-md",
              {
                "bg-stone-100 text-zinc-800": theme !== "dark",
              }
            )}
          >
            <User size={40} className="mt-4 " />
            <input
              type="text"
              name="person"
              className={cn("input-dark", {
                "input-white": theme !== "dark",
              })}
              id=""
            />
          </div>
          <label htmlFor="" className="font-medium text-lg">
            le lieu du rendez-vous:
          </label>
          <div
            className={cn(
              "flex flex-row bg-zinc-600 w-max h-max mt-4 p-1 rounded-md",
              {
                "bg-stone-100 text-zinc-800": theme !== "dark",
              }
            )}
          >
            <Map size={40} className="mt-4 " />
            <input
              type="text"
              name="lieu"
              className={cn("input-dark", {
                "input-white": theme !== "dark",
              })}
              id=""
            />
          </div>
          <label htmlFor="" className="font-medium text-lg">
            motif du rendez-vous:
          </label>
          <div
            className={cn(
              "flex flex-row bg-zinc-600 w-max h-max mt-4 p-1 rounded-md",
              {
                "bg-stone-100 text-zinc-800": theme !== "dark",
              }
            )}
          >
            <GroupIcon size={40} className="mt-4 " />
            <input
              type="text"
              name="motif"
              className={cn("input-dark", {
                "input-white": theme !== "dark",
              })}
              id=""
            />
          </div>
          <div className="flex flex-row">
            <div className="flex flex-col">
              <label htmlFor="" className="font-medium text-lg">
                date et heurre du rendez-vous:
              </label>

              <input
                type="time"
                className={cn(
                  "flex w-max text-blue-500 border-1 border-zinc-50 h-max p-3 rounded-md bg-zinc-950",
                  {
                    "bg-zinc-50  border-zinc-800": theme !== "dark",
                  }
                )}
                name="heurre"
                id=""
              />
            </div>
            <div className={cn("flex flex-col mt-6")}>
              <input
                type="date"
                name="date"
                className={cn(
                  "flex w-max text-blue-500 border-1 border-zinc-50  h-max p-3 rounded-md bg-zinc-950",
                  {
                    "bg-zinc-50 border-zinc-8)}00 ": theme !== "dark",
                  }
                )}
                id=""
              />
            </div>
          </div>
          <Button value="Ajouter le rendez-vous"></Button>
        </form>
      </main>
      <textarea></textarea>
    </div>
  );
};

export default AddDates;
