import { create } from "zustand";
import { markService } from "@/services";

const markStore = create((set) => ({
  list: [],
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
    } catch (err) {
      set({ error: err, loading: false });
    } finally {
      setTimeout(() => set({ create: null, error: null }));
    }
  },
  updateMark: async (id, body) => {
    set({ update: null, loading: true, error: null });
    try {
      const data = await markService.updateMark(id, body);
      set({ update: data, loading: false });
    } catch (err) {
      set({ error: err, loading: false });
    } finally {
      setTimeout(() => set({ update: null, error: null }));
    }
  },
  getMarksByHabit: async (id, query) => {
    set({ list: null, loading: true, error: null });
    try {
      const data = await markService.getMarksByHabit(id, query);
      set({ list: data, loading: false });
    } catch (err) {
      set({ error: err, loading: false });
    }
  },
  getMarksByUser: async (query) => {
    set({ list: null, loading: true, error: null });
    try {
      const data = await markService.getMarksByUser(query);
      set({ list: data, loading: false });
    } catch (err) {
      set({ error: err, loading: false });
    }
  },
  deleteMark: async (id) => {
    set({ deleted: null, loading: true, error: null });
    try {
      const data = await markService.deleteMark(id);
      set({ deleted: data, loading: false });
    } catch (err) {
      set({ error: err, loading: false });
    } finally {
      setTimeout(() => set({ deleted: null, error: null }));
    }
  },
}));

export default markStore;
