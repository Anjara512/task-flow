import { useEffect, useState } from "react";
import { cn } from "../util/utils";
import { Note, Theme } from "../store/store";
import Header from "../components/Header";
import Nav from "../components/nav";
import { NavLink, useNavigate } from "react-router-dom";
import Api from "../components/callApi";
import { DeleteIcon } from "lucide-react";

const GetNote = () => {
  const { theme } = Theme();
  const [mynote, setmynote] = useState<Note[]>();

  const token = localStorage.getItem("token");
  const nav = useNavigate();
  useEffect(() => {
    const fecthDate = async () => {
      try {
        const response = await Api.get("/getUser/getDate", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response) {
          setmynote(response.data.call);
          console.log(response.data.call);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fecthDate();
  }, [nav, token]);
  const deleter = async (e: string) => {
    try {
      const response = await Api.delete(`/getUser/deleteNote/${e}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response) {
        const nouvelleTache = await Api.get("/getUser/getNote", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (nouvelleTache) {
          setmynote(nouvelleTache.data.call);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className={cn("flex flex-col h-screen bg-neutral-900", {
        "bg-neutral-50": theme !== "dark",
      })}
    >
      <Header />
      <main className="flex flex-row bg-transparent">
        <Nav></Nav>
        <div className="flex h-screen flex-col flex-3   ">
          <NavLink
            className="w-max h-max font-medium hover:bg-blue-100 focus:ring-2 
     ring-green-500 px-5 py-2.5 focus:outline-none rounded-lg bg-green-500  text-sm   ring-offset-2 cursor-pointer"
            to={"/addNotes"}
          >
            nouveaux
          </NavLink>
          <ul className="font-medium grid grid-cols-4 mt-4  gap-4 text-zinc-50">
            {mynote?.map((el) => (
              <li
                className={cn(
                  "font-medium text-lg p-3 rounded-md  w-max h-max bg-zinc-950 ",
                  {
                    "bg-slate-50": theme !== "dark",
                  }
                )}
                key={el._id}
              >
                {el.image && <p className="font-medium text-sm">Note image</p>}
                {el.content}
                <p className="flex flex-row justify-between">
                  <div className="text-sm ">{el.createdAt}</div>
                  <DeleteIcon
                    onClick={() => deleter(el._id)}
                    className="text-red-600"
                  />{" "}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default GetNote;
