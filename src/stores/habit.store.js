import { create } from "zustand";
import { habitService } from "@/services";

const habitStore = create((set) => ({
  list: [],
  create: null,
  update: null,
  deleted: null,
  loading: false,
  error: null,
  entity: null,
  createHabit: async (body) => {
    set({ create: null, loading: true, error: null });
    try {
      const data = await habitService.createHabit(body);
      set({ create: data, loading: false });
    } catch (err) {
      set({ error: err, loading: false });
    }
  },
  updateHabit: async (id, body) => {
    set({ update: null, loading: true, error: null });
    try {
      const data = await habitService.updateHabit(id, body);
      set({ update: data, loading: false });
    } catch (err) {
      set({ error: err, loading: false });
    }
  },
  getHabit: async (id) => {
    set({ entity: null, loading: true, error: null });
    try {
      const data = await habitService.getHabit(id);
      set({ entity: data, loading: false });
    } catch (err) {
      set({ error: err, loading: false });
    }
  },
  getHabits: async () => {
    set({ list: [], loading: true, error: null });
    try {
      const data = await habitService.getHabits();
      set({ list: data, loading: false });
    } catch (err) {
      set({ error: err, loading: false });
    }
  },
  deleteHabit: async (id) => {
    set({ deleted: null, loading: true, error: null });
    try {
      const data = await habitService.deleteHabit(id);
      set({ deleted: data, loading: false });
    } catch (err) {
      set({ error: err, loading: false });
    }
  },
}));

export default habitStore;
