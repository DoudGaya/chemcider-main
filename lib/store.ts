import { create } from "zustand"
import { persist } from "zustand/middleware"

interface AdminState {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  toggleSidebar: () => void
  currentView: string
  setCurrentView: (view: string) => void
}

export const useAdminStore = create<AdminState>()(
  persist(
    (set) => ({
      sidebarOpen: true,
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      currentView: "dashboard",
      setCurrentView: (view) => set({ currentView: view }),
    }),
    {
      name: "admin-storage",
    },
  ),
)

interface UserDashboardState {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export const useUserDashboardStore = create<UserDashboardState>()(
  persist(
    (set) => ({
      activeTab: "overview",
      setActiveTab: (tab) => set({ activeTab: tab }),
    }),
    {
      name: "user-dashboard-storage",
    },
  ),
)

