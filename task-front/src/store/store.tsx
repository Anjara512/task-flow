import { create } from "zustand";

interface Task {
  content: string;
  DateToCreate: string;
  TimeToCreate: string;
  conplete: boolean;
}

export interface Note {
  _id: string;
  content: string;
  createdAt: string;
  image: any;
}
export interface Date {
  _id: string;
  person: string;
  motif: string;
  lieu: string;
  date: string;
  heurre: string;
  createdAt: string;
}
export interface User {
  _id: string | undefined;
  email: string;
  password: string;
  age: number;
  sexe: string;
  name: string;
  image: any;
  note: Note[] | [];
  task: Task[] | [];
  date: Date[] | [];
}
interface toastI {
  value: string;
  state: string;
  closed: boolean;
}

type UseConnexion = {
  connexion: boolean;
  toogleConnexion: () => void;
};
type useTheme = {
  disposition: string | null;
  changeDisposition: (el: string) => void;
  theme: string;
  toggleTheme: () => void;
  user: UserI;
  toast: toastI;
};
type Scan = {
  Utilisateur: User;
  getter: (e: User) => void;
};

interface UserI {
  _id: string | undefined;
  email: string;
  password: string;
  age: number;
  sexe: string;
  name: string;
  image: File | string;
  note: Note[] | [];
  task: Task[] | [];
  date: Date[] | [];
}

export const Theme = create<useTheme>((set) => ({
  disposition: localStorage.getItem("disposition"),
  changeDisposition: (el) => set({ disposition: el }),
  theme: "dark",
  toggleTheme: () =>
    set((state) => ({ theme: state.theme === "dark" ? "light" : "dark" })),

  user: {
    _id: undefined,
    email: "",
    password: "",
    name: " ",
    sexe: "",
    age: 18,
    image: " ",
    task: [],
    note: [],
    date: [],
  },
  toast: {
    value: "",
    state: "",
    closed: false,
  },
}));

export const useUser = create<Scan>((set) => ({
  Utilisateur: {
    _id: undefined,
    email: "",
    password: "",
    name: " ",
    sexe: "",
    age: 18,
    image: " ",
    task: [],
    note: [],
    date: [],
  },
  getter: (newBies) => {
    set(() => ({ Utilisateur: newBies }));
  },
}));

export const useConnexion = create<UseConnexion>((set) => ({
  connexion: false,
  toogleConnexion: () => {
    set((state) => ({ connexion: state.connexion === true ? false : true }));
  },
}));
