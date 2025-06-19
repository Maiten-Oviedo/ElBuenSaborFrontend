import { create } from 'zustand'

type ReloadState = {
  reloadFlag: boolean
  toggleReload: () => void
}

export const useReloadStore = create<ReloadState>(set => ({
  reloadFlag: false,
  toggleReload: () => set(state => ({ reloadFlag: !state.reloadFlag })),
}))
