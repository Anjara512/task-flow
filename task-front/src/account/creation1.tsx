import React from "react";
import { cn } from "../util/utils";
import Header from "../components/Header";
import Input, { Button } from "../components/input";
import { Mail } from "lucide-react";
import { Theme } from "../store/store";
import { useNavigate } from "react-router-dom";
import Api from "../util/callApi";

const Creation1 = () => {
  const nav = useNavigate();
  const { theme, user } = Theme();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email") as string;
    if (email) {
      try {
        const response = await Api.post("/send-code", { email });
        if (response) {
          console.log(response.data);
          nav("/email");
          user.email = email;
        }
      } catch (error) {
        console.error(error);
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
        <form action="" onSubmit={handleSubmit} className="flex flex-col gap-3">
          <label
            className={cn("text-3xl font-semibold text-lime-50", {
              "text-zinc-800": theme !== "dark",
            })}
            htmlFor=""
          >
            votre adresse email
          </label>
          <Input
            type="email"
            name="email"
            icone={Mail}
            placeholder="@gmail.com"
            size={2}
          />
          <Button value="suivant"></Button>
        </form>
      </main>
    </div>
  );
};

export default Creation1;
