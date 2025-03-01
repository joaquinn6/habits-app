import { create } from "zustand";
import { habitService } from "@/services";

const habitStore = create((set) => ({
  list: null,
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
      setTimeout(() => set({ create: null }), 2000);
    } catch (err) {
      set({ error: err, loading: false });
      setTimeout(() => set({ error: null }), 2000);
    }
  },
  updateHabit: async (id, body) => {
    set({ update: null, loading: true, error: null });
    try {
      const data = await habitService.updateHabit(id, body);
      set({ update: data, loading: false });
      setTimeout(() => set({ update: null }), 2000);
    } catch (err) {
      set({ error: err, loading: false });
      setTimeout(() => set({ error: null }), 2000);
    }
  },
  getHabit: async (id) => {
    set({ entity: null, loading: true, error: null });
    try {
      const data = await habitService.getHabit(id);
      set({ entity: data, loading: false });
      setTimeout(() => set({ entity: null }), 2000);
    } catch (err) {
      set({ error: err, loading: false });
      setTimeout(() => set({ error: null }), 2000);
    }
  },
  getHabits: async () => {
    set({ list: null, loading: true, error: null });
    try {
      const data = await habitService.getHabits();
      set({ list: data, loading: false });
      setTimeout(() => set({ list: null }), 2000);
    } catch (err) {
      set({ error: err, loading: false });
      setTimeout(() => set({ error: null }), 2000);
    }
  },
  deleteHabit: async (id) => {
    set({ deleted: null, loading: true, error: null });
    try {
      const data = await habitService.deleteHabit(id);
      set({ deleted: data, loading: false });
      setTimeout(() => set({ deleted: null }), 2000);
    } catch (err) {
      set({ error: err, loading: false });
      setTimeout(() => set({ error: null }), 2000);
    }
  },
}));

export default habitStore;
