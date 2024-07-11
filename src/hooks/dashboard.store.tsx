import { Dashboard } from "@/app/dashboard/types";
import { create } from "zustand";

type DashboardStore = {
  data: Partial<Dashboard>;
  merge: (data: Partial<Dashboard>) => void;
};

export const DashboardStore = create<DashboardStore>(
  (set) => ({
    data: {},
    merge: (data) => set((state) => ({ data: { ...state.data, ...data } })),
  }));
