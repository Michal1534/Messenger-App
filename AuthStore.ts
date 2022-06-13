import { User } from "firebase/auth";
import createZustand from "zustand";

type AuthStore = {
  isLoggedIn: boolean;
  status: "online" | "afk" | "offline";
  user: null | User;
  logIn: (user: User) => void;
  logOut: VoidFunction;
  changeStatus: (newStatus: AuthStore["status"]) => void;
};

export const useAuth = createZustand<AuthStore>((set) => ({
  isLoggedIn: false,
  user: null,
  status: "online",
  logIn: (user) => set((state) => ({ ...state, user, isLoggedIn: true })),
  logOut: () => set((state) => ({ ...state, user: null, isLoggedIn: false })),
  changeStatus: (newStatus) =>
    set((state) => ({
      ...state,
      status: newStatus,
    })),
}));
