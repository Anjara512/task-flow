import Header from "../components/Header";
import Nav from "../components/nav";
import { cn } from "../util/utils";
import { Theme } from "../store/store";
import { SendHorizontalIcon } from "lucide-react";
import Api from "../util/callApi";
import { useNavigate } from "react-router-dom";

const AddTask = () => {
  const { theme } = Theme();
  const nav = useNavigate();
  const token = localStorage.getItem("token");
  const addTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const content = form.get("content") as string;
    const DateToCreate = new Date().toLocaleDateString();
    const TimeToCreate = new Date().toLocaleTimeString();
    const complete = false as boolean;
    e.currentTarget.reset();
    const response = await Api.post(
      "/getUser/addTasks",
      { content, DateToCreate, TimeToCreate, complete },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (response) {
      console.log(response.data);
      nav("/getTask");
    }
  };
  return (
    <div
      className={cn("flex flex-col bg-zinc-950 h-screen", {
        "bg-red-50": theme !== "dark",
      })}
    >
      <Header></Header>
      <main className={cn("flex flex-row ")}>
        <Nav />
        <main className="flex flex-col h-screen items-center  w-full">
          <h1 className="text-lg font-medium uppercase text-zinc-50 mt-10">
            Ajouter votre tache ici
          </h1>
          <form
            action=""
            onSubmit={addTask}
            className="flex flex-row mt-10 gap-6"
          >
            <textarea
              name="content"
              className={cn(
                "h-42 w-80 text-md text-white font-medium rounded-md shadow-lg outline-none  bg-neutral-900 focus:outline-none focus:ring-2   p-2 ring-lime-500",
                {
                  "bg-neutral-200 text-zinc-800": theme !== "dark",
                }
              )}
              id=""
            />
            <button>
              <SendHorizontalIcon
                size={50}
                className="w-max mt-5 h-max font-medium hover:bg-blue-100 focus:ring-2 
   ring-green-500 px-5 py-2.5 focus:outline-none rounded-lg  text-sm  ring-offset-2 cursor-pointer     bg-blue-800"
              />
            </button>
          </form>
        </main>
      </main>
    </div>
  );
};

export default AddTask;
