import { create } from "zustand"
import { nanoid } from "nanoid"
import { createJSONStorage, persist } from "zustand/middleware"

export interface ITodo {
  id: string
  title: string
  completed: boolean
  icon: string
}

interface ITodoStore {
  todos: ITodo[]
  add: (title: string) => void
  delete: (id: string) => void
  toggle: (id: string) => void
  edit: (title: string, id: string) => void
  setFilter: (filter: string) => void
  filter: string
}

const icons: string[] = [
  "🍉",
  "🍌",
  "🍎",
  "🍊",
  "🍒",
  "🍙",
  "🍪",
  "🥝",
  "🍓",
  "🍋",
]

export const useTodos = create(
  persist<ITodoStore>(
    (set): ITodoStore => ({
      filter: "",
      todos: [],
      setFilter(filter) {
        set(() => ({
          filter,
        }))
      },
      add(title: string) {
        console.log("Add todo")
        set((store) => {
          return {
            todos: [
              ...store.todos,
              {
                id: nanoid(),
                title,
                completed: false,
                icon: icons[Math.floor(Math.random() * 10)],
              },
            ],
          }
        })
      },
      toggle(id) {
        set((state) => ({
          todos: state.todos.map((t) =>
            t.id === id ? { ...t, completed: !t.completed } : t,
          ),
        }))
      },
      delete(id) {
        set((state) => ({
          todos: state.todos.filter((t) => t.id !== id),
        }))
      },
      edit(title, id) {
        set((state) => ({
          todos: state.todos.map((t) => (t.id === id ? { ...t, title } : t)),
        }))
      },
    }),
    { name: "todo-store", storage: createJSONStorage(() => sessionStorage) },
  ),
)
