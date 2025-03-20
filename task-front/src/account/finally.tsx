import Header from "../components/Header";
import { cn } from "../util/utils";
import { Theme } from "../store/store";
import { UserCircleIcon } from "lucide-react";
import { Button } from "../components/input";
import Api from "../util/callApi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Finally = () => {
  const { theme, user, toast } = Theme();

  const [image, setimage] = useState<string | ArrayBuffer | null>();

  const nav = useNavigate();
  const getPic = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      user.image = file;
      const allowed: string[] = ["jpeg", "png", "gif", "jpg"];
      let filler: string | string[] = file.name;
      filler = filler.split(".");
      filler = filler[filler.length - 1];
      if (allowed.indexOf(filler) !== -1) {
        // createThumbnaile(file);
        const reader = new FileReader();
        reader.onload = function () {
          setimage(this.result);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const createAccount = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await Api.post("/createUser", user, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response) {
        toast.value = response.data;
        toast.state = "succés";
        nav("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className={cn("flex flex-col bg-zinc-900 h-screen w-full", {
        "bg-zinc-100": theme !== "dark",
      })}
    >
      <Header />
      <main
        className={cn("bg-transparent flex pt-20 h-screen justify-center ")}
      >
        <form
          action=""
          onSubmit={createAccount}
          className={cn(
            "w-max h-max p-4 rounded-lg bg-neutral-800 shadow-lg text-white",
            {
              "bg-slate-400 text-black": theme !== "dark",
            }
          )}
        >
          {!image ? (
            <label htmlFor="file">
              <UserCircleIcon
                className="text-blue-400 cursor-pointer"
                size={200}
              />
            </label>
          ) : (
            <img className="w-80 h-80 rounded-full  " src={String(image)}></img>
          )}
          <input
            type="file"
            onChange={getPic}
            name=""
            style={{ display: "none" }}
            id="file"
          />
          <Button value="creér le compte"></Button>
        </form>
      </main>
    </div>
  );
};

export default Finally;
