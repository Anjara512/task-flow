import { Eye, EyeOffIcon, Mail } from "lucide-react";
import Header from "../components/Header";
import Input, { Button } from "../components/input";
import { Theme } from "../store/store";
import { cn } from "../util/utils";
import { NavLink, useNavigate } from "react-router-dom";
import Api from "../components/callApi";
import { useState } from "react";
import AnimatedTitle from "../components/anime";

const LoginPage = () => {
  const { theme } = Theme();

  const [type, settype] = useState("password");
  const nav = useNavigate();
  const loginUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email") as string;
    const password = form.get("password") as string;

    const response = await Api.post("/login", { email, password });
    if (response) {
      localStorage.setItem("token", response.data.token);
      nav("/connect");
    }
  };
  return (
    <div
      style={{ backgroundSize: "cover" }}
      className={cn(
        "flex bg-[url(public/1739706903281.jpg)]  flex-col h-screen  w-full"
      )}
    >
      <Header />
      <main className={cn("flex flex-row h-screen ")}>
        <div className="flex flex-3 h-screen items-center ml-4  text-white ">
          <AnimatedTitle />
        </div>
        <div
          className={cn(
            "bg-transparent backdrop-blur-2xl   h-screen flex items-center justify-center",
            {
              "bg-transparent": theme === "dark",
            }
          )}
        >
          <form
            action=""
            onSubmit={loginUser}
            className={cn(
              "flex flex-col mr-20 gap-4 border backdrop-blur- border-blue-500 rounded-md p-4  "
            )}
          >
            <Input
              size={1}
              type="email"
              name="email"
              icone={Mail}
              placeholder="votre email"
            />
            <Input
              size={1}
              type={type}
              onclick={() => settype(type === "password" ? "text" : "password")}
              name="password"
              icone={type === "password" ? EyeOffIcon : Eye}
              placeholder="votre mot de passe"
            />

            <Button value="connexion"></Button>
            <NavLink className="text-blue-500" to={"/create1"}>
              create a new account
            </NavLink>
          </form>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
