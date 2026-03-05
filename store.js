import { create } from 'zustand';

export const useSetListStore = create((set) => ({
  tareas: [],

  agregarTarea: (texto) =>
    set((state) => ({
      tareas: [...state.tareas, { id: Date.now(), texto }],
    })),

  eliminarTarea: (id) =>
    set((state) => ({
      tareas: state.tareas.filter((tarea) => tarea.id !== id),
    })),
}));