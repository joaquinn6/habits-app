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
    } catch (err) {
      set({ error: err, loading: false });
    } finally {
      set({ create: null, loading: false, error: null });
    }
  },
}));

export default userStore;
