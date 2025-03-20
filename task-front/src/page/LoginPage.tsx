import Header from "../components/Header";

import { cn } from "../util/utils";

import AnimatedTitle from "../components/anime";

const LoginPage = () => {
  return (
    <div
      style={{ backgroundSize: "cover" }}
      className={cn(
        "flex bg-[url(public/1739706903281.jpg)]  flex-col md:h-screen h-max pb-20  w-full"
      )}
    >
      <Header isconnect={true} />
      <main
        className={cn(
          "flex md:flex-col  items-center w-full  gap-10 h-screen "
        )}
      >
        <div className="flex ml-4  text-white ">
          <AnimatedTitle />
        </div>
        <div className="flex flex-row gap-2">
          <img
            src="public/Capture d’écran_20-3-2025_114640_localhost.jpeg"
            alt=""
            className="w-80 rounded-lg h-80 "
          ></img>
          <img
            src="public/Capture d’écran_20-3-2025_114715_localhost.jpeg"
            alt=""
            className="w-80 rounded-lg h-80 "
          ></img>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
