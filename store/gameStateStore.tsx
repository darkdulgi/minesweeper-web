import { create } from 'zustand'

const useGameState = create((set) => ({
  field: [],
  view: [],
  failed: false,
  setField: (newField) => set({ field: newField.map(arr => [...arr]) }),
  setView: (newView) => set({ view: newView.map(arr => [...arr]) }),
  setFailed: (val) => set({ failed: val }),
}));

export default useGameState;