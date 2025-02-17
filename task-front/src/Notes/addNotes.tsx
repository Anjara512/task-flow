import React, { useState } from "react";
import { cn } from "../util/utils";
import { Theme } from "../store/store";
import Header from "../components/Header";
import Nav from "../components/nav";
import { FaPhotoVideo } from "react-icons/fa";
import Api from "../components/callApi";
import { Button } from "../components/input";
import { useNavigate } from "react-router-dom";

const AddNotes = () => {
  const { theme } = Theme();
  const nav = useNavigate();
  const token = localStorage.getItem("token");
  const [imageAfficher, setimageAfficher] = useState<
    string | ArrayBuffer | null
  >();
  const [image, setimage] = useState<File>();
  const getImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setimage(file);
      const allowed: string[] = ["jpeg", "png", "gif", "jpg"];
      let filler: string | string[] = file.name;
      filler = filler.split(".");
      filler = filler[filler.length - 1];
      if (allowed.indexOf(filler) !== -1) {
        // createThumbnaile(file);
        const reader = new FileReader();
        reader.onload = function () {
          setimageAfficher(this.result);
        };
        reader.readAsDataURL(file);
      }
    }
  };
  const envoie = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const content = form.get("content") as string;
    const createdAt = new Date().toLocaleTimeString();
    if (content) {
      try {
        const response = await Api.post(
          "/getUser/postNotes",
          { content, createdAt, image },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response) {
          console.log(response.data);
          nav("/getNotes");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <div
      className={cn("flex flex-col h-screen bg-neutral-800", {
        "bg-neutral-50": theme !== "dark",
      })}
    >
      <Header />
      <main className="flex flex-row bg-transparent">
        <Nav></Nav>
        <div className="flex h-screen flex-3  flex-col  items-center gap-3">
          <form
            onSubmit={envoie}
            action=""
            className={cn(
              "mt-4 w-max h-max p-4 rounded-md flex flex-col gap-3 text-zinc-50  bg-stone-950",
              {
                "bg-indigo-50 text-zinc-800": theme !== "dark",
              }
            )}
          >
            <label className="font-medium text-sm  ">
              le contenu de la note
            </label>
            <input type="text" name="content" id="" className="input-dark" />
            <label className="font-medium  text-sm ">image si neccesaire</label>
            {!imageAfficher ? (
              <label
                htmlFor="id"
                className={cn(
                  "flex flex-col w-max h-max p-4 rounded-md bg-zinc-500"
                )}
              >
                <FaPhotoVideo size={100} />
              </label>
            ) : (
              <img
                className={cn(
                  "flex flex-col w-42 h-42  p-4 rounded-md bg-zinc-500"
                )}
                src={String(imageAfficher)}
              ></img>
            )}
            <input
              type="file"
              onChange={getImage}
              name=""
              id="id"
              className="hidden"
            />
            <Button value="Ajouter"></Button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddNotes;
