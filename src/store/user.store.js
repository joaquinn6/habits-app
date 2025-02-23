import { create } from "zustand";
import { userService } from "../services";

const userStore = create((set) => ({
  create: null,
  loading: false,
  error: null,
  createUser: async (body) => {
    set({ create: null, loading: true, error: null });
    try {
      const data = await userService.createUser(body);
      set({ create: data, loading: false });
      setTimeout(() => set({ create: null }), 2000);
    } catch (err) {
      set({ error: err, loading: false });
      setTimeout(() => set({ error: null }), 2000);
    }
  },
}));

export default userStore;
