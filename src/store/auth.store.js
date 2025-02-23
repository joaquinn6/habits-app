import { create } from "zustand";
import { authService } from "../services";

const userStore = create((set) => ({
  logged: null,
  loading: false,
  error: null,
  login: async (body) => {
    set({ logged: null, loading: true, error: null });
    try {
      const data = await authService.loginRequest(body);
      set({ logged: data, loading: false });
      setTimeout(() => set({ logged: null }), 2000);
    } catch (err) {
      set({ error: err, loading: false });
      setTimeout(() => set({ error: null }), 2000);
    }
  },
}));

export default userStore;
