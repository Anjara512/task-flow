import Api from "./callApi";

export const loginUser = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const form = new FormData(e.currentTarget);
  const email = form.get("email") as string;
  const password = form.get("password") as string;

  const response = await Api.post("/login", { email, password });
  if (!response) throw new Error("erreur ");
  const data = response.data;
  return data;
};
