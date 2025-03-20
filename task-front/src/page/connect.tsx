import { useEffect, useState } from "react";
import { cn } from "../util/utils";
import { Theme, User } from "../store/store";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import Api from "../util/callApi";
import Nav from "../components/nav";
import { motion } from "framer-motion";

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

  const salutation = ` Bonjour ${res?.sexe === "M" ? "monsieur" : "madame"} ${
    res?.name
  } ,quelle activités vous passionne, aujourd'hui. Nous vous, souhaitons une belle journée`;
  const salutaionTab = salutation.split(",");

  return (
    <div
      className={cn("flex flex-col bg-zinc-950 h-screen", {
        "bg-zinc-200": theme !== "dark",
      })}
    >
      <Header />
      <main className="flex flex-row">
        <Nav></Nav>
        <div className="h-screen flex flex-3 w-full   justify-center ">
          <div
            className={cn("p-2  mt-20 rounded-md w-3/4  h-96 bg-zinc-800", {
              "bg-zinc-50": theme !== "dark",
            })}
          >
            <div
              className={cn(
                " w-full flex ml-10 mt-10 flex-col rounded-md text-4xl font-medium select-none   h-96 bg-gradient-to-r from-green-500   to-red-900 bg-clip-text text-transparent "
              )}
            >
              {salutaionTab.map((el, index) => (
                <motion.p
                  style={{ transition: "0.5s" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 1 }}
                  key={index}
                >
                  {el}
                </motion.p>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Connect;
