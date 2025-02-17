import { cn } from "../util/utils";
import Header from "../components/Header";
import Input, { Button } from "../components/input";
import { Eye, EyeOffIcon } from "lucide-react";
import { Theme } from "../store/store";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Creation2 = () => {
  const { theme, user } = Theme();
  const [type2, settype2] = useState("password");
  const [type1, settype1] = useState("password");

  const seepass1 = () => {
    settype1(type1 === "text" ? "password" : "text");
  };

  const seepass2 = () => {
    settype2(type2 === "text" ? "password" : "text");
  };

  const nav = useNavigate();
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const pass1 = form.get("password") as string;
    const pass2 = form.get("password2") as string;
    if (pass1 && pass2) {
      if (pass1 === pass2) {
        user.password = pass1;
        nav("/create3");
        console.log(user);
      }
    }
  };
  return (
    <div className={cn("flex flex-col")}>
      <Header />
      <main
        className={cn("flex  h-screen gap-5 justify-center pt-20 bg-black", {
          "bg-amber-50": theme !== "dark",
        })}
      >
        <form onSubmit={submit} action="" className="flex flex-col gap-3">
          <label
            className={cn("text-3xl font-semibold text-lime-50", {
              "text-zinc-800": theme !== "dark",
            })}
            htmlFor=""
          >
            votre mot de passe
          </label>
          <Input
            type={type1}
            onclick={seepass1}
            name="password"
            icone={type1 === "password" ? Eye : EyeOffIcon}
            placeholder=""
            size={2}
          />
          <label
            className={cn("text-3xl font-semibold text-lime-50", {
              "text-zinc-800": theme !== "dark",
            })}
            htmlFor=""
          >
            confirmer votre mot de passe
          </label>
          <Input
            type={type2}
            name="password2"
            icone={type2 === "password" ? Eye : EyeOffIcon}
            placeholder=""
            onclick={seepass2}
            size={2}
          />
          <Button value="suivant"></Button>
        </form>
      </main>
    </div>
  );
};

export default Creation2;
