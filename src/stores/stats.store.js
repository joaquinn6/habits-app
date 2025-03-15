import { create } from "zustand";
import { statsService } from "@/services";

const statsStore = create((set) => ({
  list: null,
  loading: false,
  error: null,
  getStatsByHabit: async (id, query) => {
    set({ list: null, loading: true, error: null });
    try {
      const data = await statsService.getStatsByHabit(id, query);
      set({ list: data, loading: false });
      setTimeout(() => set({ list: null }), 2000);
    } catch (err) {
      set({ error: err, loading: false });
      setTimeout(() => set({ error: null }), 2000);
    }
  },
}));

export default statsStore;
