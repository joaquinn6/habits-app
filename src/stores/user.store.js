import { create } from "zustand";
import { userService } from "@/services";

const userStore = create((set) => ({
  create: null,
  update: null,
  loading: false,
  error: null,
  entity: null,
  password: null,
  deleted: null,
  isTestUser: false,
  createUser: async (body) => {
    set({ create: null, loading: true, error: null });
    try {
      const data = await userService.createUser(body);
      set({ create: data, loading: false });
    } catch (err) {
      set({ error: err, loading: false });
    } finally {
      setTimeout(() => set({ create: null, error: null }));
    }
  },
  deleteUser: async () => {
    set({ deleted: null, loading: true, error: null });
    try {
      const data = await userService.deleteUser();
      set({ deleted: data, loading: false });
    } catch (err) {
      set({ error: err, loading: false });
    } finally {
      setTimeout(() => set({ deleted: null, error: null }));
    }
  },
  updateUser: async (body) => {
    set({ update: null, loading: true, error: null });
    try {
      const data = await userService.updateUser(body);
      set({ update: data, loading: false });
    } catch (err) {
      set({ error: err, loading: false });
    } finally {
      setTimeout(() => set({ update: null, error: null }));
    }
  },
  getUser: async () => {
    set({ entity: null, loading: true, error: null });
    try {
      const data = await userService.getUser();
      set({ entity: data, loading: false });
    } catch (err) {
      set({ error: err, loading: false });
    }
  },
  putPassword: async (body) => {
    set({ password: null, loading: true, error: null });
    try {
      const data = await userService.changePassword(body);
      set({ password: data, loading: false });
    } catch (err) {
      set({ error: err, loading: false });
    } finally {
      setTimeout(() => set({ password: null, error: null }));
    }
  },
  changeTestUser: (email) => {
    set({ isTestUser: email == "test@test.com" });
  },
}));

export default userStore;
