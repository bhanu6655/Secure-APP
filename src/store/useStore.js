import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import Cookies from "js-cookie";
const cookieStorage = {
  getItem: (name) => Cookies.get(name) || null,
  setItem: (name, value) => Cookies.set(name, value, { expires: 7 }), 
  removeItem: (name) => Cookies.remove(name),
};
export const useStore = create(
  persist(
    (set) => ({
      user: {
        name: "",
        username: "",
        email: "",
        mobile: "",
      },
      categories: [],
      notes: "",
      setUser: (userData) => set({ user: userData }),
      setCategories: (categoryArray) => set({ categories: categoryArray }),
      setNotes: (noteText) => set({ notes: noteText }),
      resetStore: () => set({
        user: { name: "", username: "", email: "", mobile: "" },
        categories: [],
        notes: ""
      })
    }),
    {
      name: "super-app-session", 
      storage: createJSONStorage(() => cookieStorage),
    }
  )
);
