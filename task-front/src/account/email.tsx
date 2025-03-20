import { cn } from "../util/utils";
import { Theme } from "../store/store";
import Header from "../components/Header";
import { Button } from "../components/input";
import Api from "../util/callApi";
import { useNavigate } from "react-router-dom";

const Email = () => {
  const { theme, user } = Theme();
  const nav = useNavigate();
  const verifyCode = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const code = Number(form.get("code"));
    try {
      const response = await Api.post("/verifyCode", { code });
      if (response) {
        console.log(response.data);
        nav("/create2");
      }
    } catch (error) {
      console.error(error);
      user.email = " ";
    }
  };

  return (
    <div
      className={cn("flex flex-col h-screen bg-zinc-950", {
        "bg-zinc-50": theme !== "dark",
      })}
    >
      <Header />
      <main className="flex items-center mt-10 justify-center h-screen">
        <form
          action=""
          onSubmit={verifyCode}
          className="w-1/2 flex flex-col gap-4"
        >
          <input
            type="text"
            className="w-full h-10 bg-zinc-800 text-white font-medium"
            name="code"
            id=""
          />
          <Button value="envoyer le code"></Button>
        </form>
      </main>
    </div>
  );
};

export default Email;
