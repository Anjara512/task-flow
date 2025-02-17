import { useEffect, useState } from "react";
import { cn } from "../util/utils";
import { Theme, User } from "../store/store";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import Api from "../components/callApi";
import Nav from "../components/nav";

const Connect = () => {
  const { theme } = Theme();

  const nav = useNavigate();
  const token = localStorage.getItem("token");
  const [res, setRes] = useState<User>();
  useEffect(() => {
    const fetchUser = async () => {
      const response = await Api.get("/getUser", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data) {
        setRes(response.data);
        console.log(response.data);
      }
    };
    fetchUser();
  }, [nav, token]);
  return (
    <div
      className={cn("flex flex-col bg-zinc-950 h-screen", {
        "bg-zinc-200": theme !== "dark",
      })}
    >
      <Header />
      <main className="flex flex-row">
        <Nav></Nav>
        <div className="h-screen flex flex-3   justify-center ">
          <div
            className={cn("p-2 w-80 mt-20 rounded-md  h-96 bg-zinc-800", {
              "bg-zinc-50": theme !== "dark",
            })}
          >
            <div
              className={cn(
                " w-80 rounded-md text-2xl font-medium select-none   h-96 bg-gradient-to-r from-blue-500   to-purple-800 bg-clip-text text-transparent "
              )}
            >
              bonjour {res?.sexe == "M" ? "monsieur" : "madame"} {res?.name}{" "}
              quel activités vous passionne aujourd'hui. Nous vous souhaitons
              une belle journée
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Connect;
