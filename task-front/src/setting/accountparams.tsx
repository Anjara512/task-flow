import { useEffect, useState } from "react";
import Header from "../components/Header";
import Nav from "../components/nav";
import { cn } from "../util/utils";
import Api from "../components/callApi";
import { Theme, User } from "../store/store";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOffIcon, Mail, User2 } from "lucide-react";
import Input, { Button } from "../components/input";

const Accountparams = () => {
  const { theme, user } = Theme();
  const [src, setsrc] = useState<File>();
  const [type, settype] = useState("password");
  const token = localStorage.getItem("token");
  const nav = useNavigate();
  const [image, setimage] = useState<string | ArrayBuffer | null>();

  const [res, setRes] = useState<User>();
  useEffect(() => {
    const fetchUser = async () => {
      const response = await Api.get("/getUser", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data) {
        setRes(response.data);
      }
    };
    fetchUser();
  }, [nav, token]);
  useEffect(() => {
    const byteArray = new Uint8Array(res?.image.data.data);
    const blob = new Blob([byteArray], {
      type: res?.image.contentType,
    });
    const imageUrl = URL.createObjectURL(blob);
    setimage(imageUrl);
  }, [res?.image]);
  function getImage(file: File) {
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

  const change = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setsrc(e.target.files[0]);
      setimage(String(getImage(e.target.files[0])));
    }
  };
  const updateInfo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    if (res) {
      user.name = (form.get("name") as string)
        ? (form.get("name") as string)
        : res?.name;
      user.name = (form.get("password") as string)
        ? (form.get("password") as string)
        : res?.password;
      user.name = (form.get("email") as string)
        ? (form.get("email") as string)
        : res?.email;

      user.image = src ? src : res?.image;
      user.sexe = res?.sexe;
      user.age = res?.age;
      user.note = res?.note;
      user.task = res?.task;
      user.date = res?.date;
    }

    try {
      const response = await Api.patch(`/modifyUser/${res?._id}`, user, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.data) {
        console.log(response.data);
        nav("/connect");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className={cn("flex flex-col text-white  gap-0 h-screen bg-zinc-950 ", {
        "bg-zinc-300 text-black": theme !== "dark",
      })}
    >
      <Header />
      <main className={cn("flex flex-row gap-")}>
        <Nav />
        <form onSubmit={updateInfo} className="flex flex-col ml-10 gap-6">
          <label htmlFor="file">
            {res?.image ? (
              <div className="flex flex-col gap-2">
                <p>changer votre photo de profil</p>
                <img
                  className="w-40 h-40 rounded-full "
                  src={String(image)}
                ></img>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <p>changer votre photo de profil</p>
                <User2 className="w-40 h-40 rounded-full "></User2>
              </div>
            )}
          </label>
          <input
            type="file"
            onChange={change}
            className="hidden"
            name="name"
            id="file"
          />
          <Input
            size={1}
            type="text"
            name="name"
            icone={User2}
            placeholder="votre nouveau pseudo"
          />
          <Input
            size={1}
            type="email"
            name="email"
            icone={Mail}
            placeholder="votre nouveau adresse email"
          />
          <Input
            size={1}
            type={type}
            onclick={() => settype(type === "password" ? "text" : "password")}
            name="password"
            icone={type === "password" ? EyeOffIcon : Eye}
            placeholder="votre nouveau mot de passe"
          />
          <Button value="enregistrer"></Button>
        </form>
      </main>
    </div>
  );
};

export default Accountparams;
