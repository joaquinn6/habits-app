import { create } from "zustand";
import { markService } from "@/services";

const markStore = create((set) => ({
  list: null,
  create: null,
  update: null,
  deleted: null,
  loading: false,
  error: null,
  createMark: async (id, body) => {
    set({ create: null, loading: true, error: null });
    try {
      const data = await markService.createMark(id, body);
      set({ create: data, loading: false });
      setTimeout(() => set({ create: null }), 2000);
    } catch (err) {
      set({ error: err, loading: false });
      setTimeout(() => set({ error: null }), 2000);
    }
  },
  updateMark: async (id, body) => {
    set({ update: null, loading: true, error: null });
    try {
      const data = await markService.updateMark(id, body);
      set({ update: data, loading: false });
      setTimeout(() => set({ update: null }), 2000);
    } catch (err) {
      set({ error: err, loading: false });
      setTimeout(() => set({ error: null }), 2000);
    }
  },
  getMarksByHabit: async (id) => {
    set({ list: null, loading: true, error: null });
    try {
      const data = await markService.getMarksByHabit(id);
      set({ list: data, loading: false });
      setTimeout(() => set({ list: null }), 2000);
    } catch (err) {
      set({ error: err, loading: false });
      setTimeout(() => set({ error: null }), 2000);
    }
  },
  deleteMark: async (id) => {
    set({ deleted: null, loading: true, error: null });
    try {
      const data = await markService.deleteMark(id);
      set({ deleted: data, loading: false });
      setTimeout(() => set({ deleted: null }), 2000);
    } catch (err) {
      set({ error: err, loading: false });
      setTimeout(() => set({ error: null }), 2000);
    }
  },
}));

export default markStore;
