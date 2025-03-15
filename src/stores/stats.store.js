import { create } from "zustand";
import { statsService } from "@/services";

const statsStore = create((set) => ({
  list: [],
  loading: false,
  error: null,
  getStatsByHabit: async (id, query) => {
    set({ list: null, loading: true, error: null });
    try {
      const data = await statsService.getStatsByHabit(id, query);
      set({ list: data, loading: false });
    } catch (err) {
      set({ error: err, loading: false });
    }
  },
}));

export default statsStore;
