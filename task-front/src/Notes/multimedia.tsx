import React, { useEffect, useState } from "react";
import { cn } from "../util/utils";
import { DeleteIcon } from "lucide-react";
import Header from "../components/Header";
import Nav from "../components/nav";
import { NavLink, useNavigate } from "react-router-dom";
import { Note, Theme } from "../store/store";
import Api from "../components/callApi";

const Multimedia = () => {
  const [mynote, setmynote] = useState<Note[]>();
  const [mynoteImage, setmynoteImage] = useState<Note[]>();
  const { theme } = Theme();
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
        }
      } catch (error) {
        console.error(error);
      }
    };

    fecthDate();
    const getNoteImage = () => {
      if (mynote) {
        setmynoteImage(
          mynote.filter((el) => {
            return el.image;
          })
        );
      }
    };
    getNoteImage();
  }, [nav, token, mynote]);
  function getImage(el: Note) {
    if (el.image) {
      const byteArray = new Uint8Array(el?.image.data.data);
      const blob = new Blob([byteArray], {
        type: el?.image.contentType,
      });
      const imageUrl = URL.createObjectURL(blob);
      return imageUrl;
    }
  }

  return (
    <div>
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
            <h1
              className={cn("text-white uppercase font-medium text-2xl ", {
                "text-zinc-900": theme !== "dark",
              })}
            >
              les Notes avec des contenu multimedia
            </h1>
            <ul className="font-medium grid grid-cols-4 mt-4  gap-4 text-zinc-50">
              {mynoteImage?.map((el) => (
                <li
                  className={cn(
                    "font-medium text-lg p-3 rounded-md  w-max h-max bg-zinc-950 ",
                    {
                      "bg-slate-50": theme !== "dark",
                    }
                  )}
                  key={el._id}
                >
                  {el.content}
                  <img className="w-20 h-20" src={getImage(el)}></img>
                  <p className="flex flex-row justify-between">
                    <div className="text-sm ">{el.createdAt}</div>
                    <DeleteIcon className="text-red-600" />{" "}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </main>
      </div>
      ;
    </div>
  );
};

export default Multimedia;
