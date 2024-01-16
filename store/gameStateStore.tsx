import { create } from 'zustand'

const useGameState = create((set) => ({
  field: [],
  view: [],
  failed: false,
  leftRoom: 0,
  setField: (newField) => set({ field: newField.map(arr => [...arr]) }),
  setView: (newView) => set({ view: newView.map(arr => [...arr]) }),
  setFailed: (val) => set({ failed: val }),
  setLeftRoom: (newLeftRoom) => set({ leftRoom: newLeftRoom }),
}));

export default useGameState;