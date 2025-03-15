import { create } from "zustand";
import { statsService } from "@/services";

const statsStore = create((set) => ({
  entity: null,
  loading: false,
  error: null,
  getStatsByHabit: async (id, query) => {
    set({ entity: null, loading: true, error: null });
    try {
      const data = await statsService.getStatsByHabit(id, query);
      set({ entity: data, loading: false });
    } catch (err) {
      set({ error: err, loading: false });
    }
  },
}));

export default statsStore;
