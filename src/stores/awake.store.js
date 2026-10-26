import { create } from "zustand";
import { awakeService } from "@/services";

// Si el api tarda más que esto en responder, se asume que está dormida
const SLEEPING_DELAY = 1500;
const RETRIES = 3;

const awakeStore = create((set, get) => ({
  awake: false,
  loading: false,
  sleeping: false,
  error: null,
  wakeUp: async () => {
    if (get().awake || get().loading) return;
    set({ loading: true, error: null });
    const timer = setTimeout(() => set({ sleeping: true }), SLEEPING_DELAY);
    for (let attempt = 1; attempt <= RETRIES; attempt++) {
      try {
        await awakeService.wakeUp();
        set({ awake: true });
        break;
      } catch (err) {
        if (attempt === RETRIES) set({ error: err });
      }
    }
    clearTimeout(timer);
    set({ loading: false, sleeping: false });
  },
}));

export default awakeStore;
