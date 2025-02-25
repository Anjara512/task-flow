import { useEffect, useState } from "react";
import { cn } from "../util/utils";
import { Note, Theme } from "../store/store";
import Header from "../components/Header";
import Nav from "../components/nav";
import { NavLink } from "react-router-dom";
import Api from "../components/callApi";
import { Trash2 } from "lucide-react";

const GetNote = () => {
  const [option, setoption] = useState(false);
  const [id, setid] = useState([""]);
  // const [currentId, setcurrentId] = useState<string>();
  const { theme, disposition } = Theme();
  const [mynote, setmynote] = useState<Note[]>();

  const token = localStorage.getItem("token");
  // const nav = useNavigate();
  useEffect(() => {
    const fecthDate = async () => {
      try {
        const response = await Api.get("/getUser/getDate", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response) {
          setmynote(response.data.call);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fecthDate();
  }, [token, mynote]);

  const deleter = async (e: string[] | undefined) => {
    try {
      const response = await Api.delete(`/getUser/deleteNote/${e}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response) {
        setoption(false);
        setmynote(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const getCurrent = (e: string) => {
    setoption(option === true ? false : true);

    if (id.includes(e)) {
      setid(
        id.filter((el) => {
          return el != e;
        })
      );
    } else {
      setid([...id, e]);
    }
  };
  return (
    <div
      className={cn(
        "flex flex-col h-screen w-full bg-center bg-repeat-none  bg-zinc-900",
        {
          "bg-zinc-50": theme !== "dark",
        }
      )}
    >
      <Header />
      <main className="flex flex-row bg-transparent">
        <Nav></Nav>
        <div className="flex w-full h-screen flex-col flex-3   ">
          <div className={cn("flex flex-row justify-between px-5 ", {})}>
            <NavLink
              className="w-max h-max font-medium hover:bg-blue-100 focus:ring-2 
     ring-green-500 px-5 py-2.5 focus:outline-none rounded-lg bg-green-500  text-sm   ring-offset-2 cursor-pointer"
              to={"/addNotes"}
            >
              nouveaux
            </NavLink>
            {option && (
              <span>
                <Trash2
                  className="bg-red-500 text-stone-50 rounded-full p-3 h-max w-max cursor-pointer"
                  onClick={() => deleter(id)}
                />
              </span>
            )}
          </div>
          <ul
            className={cn(" ml-2 mt-4  grid gap-7 grid-cols-6", {
              "flex flex-col ": disposition !== "grille",
            })}
          >
            {mynote?.map((el) => (
              <li
                key={el._id}
                className={cn(
                  " bg-neutral-800 hover:border-2 border-pink-500 rounded-md p-5 w-max h-max  font-medium  text-white",
                  {
                    "text-zinc-800 bg-neutral-300": theme !== "dark",
                    "w-3/4  mx-4 flex flex-row gap-4": disposition !== "grille",
                  }
                )}
              >
                <input
                  onClick={() => getCurrent(el._id)}
                  // checked={id.indexOf(el._id) === -1 ? false : true}
                  type="checkbox"
                  className="peer h-6 w-6 opacity-0 absolute cursor-pointer"
                />

                <div
                  className="h-6 w-6 border-2 border-gray-300 rounded-md flex items-center justify-center
    transition-colors
    peer-checked:bg-blue-600
    peer-checked:border-blue-600
    group-hover:border-blue-400
    peer-focus:outline-none
    peer-focus:ring-2
    peer-focus:ring-blue-400"
                >
                  <svg
                    className="checkmark h-4 w-4 text-white opacity-0 transition-opacity duration-200
      peer-checked:opacity-100"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      d="M20 6L9 17l-5-5"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                  </svg>
                </div>
                {el.image && <p className="font-medium text-sm">Note image</p>}
                {el.content}
                <span className=" block">{el.createdAt}</span>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default GetNote;
