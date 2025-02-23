import { create } from "zustand";
import { userService } from "../services";

const userStore = create((set) => ({
  create: null,
  update: null,
  loading: false,
  error: null,
  entity: null,
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
  updateUser: async (body) => {
    set({ update: null, loading: true, error: null });
    try {
      const data = await userService.updateUser(body);
      set({ update: data, loading: false });
      setTimeout(() => set({ update: null }), 2000);
    } catch (err) {
      set({ error: err, loading: false });
      setTimeout(() => set({ error: null }), 2000);
    }
  },
  getUser: async () => {
    set({ entity: null, loading: true, error: null });
    try {
      const data = await userService.getUser();
      set({ entity: data, loading: false });
      setTimeout(() => set({ entity: null }), 2000);
    } catch (err) {
      set({ error: err, loading: false });
      setTimeout(() => set({ error: null }), 2000);
    }
  },
}));

export default userStore;
