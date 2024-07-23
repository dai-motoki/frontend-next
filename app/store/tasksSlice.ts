import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Task {
  id: number
  title: string
  completed: boolean
}

const initialState: Task[] = []

let nextId = 1

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<{ title: string }>) => {
      state.push({ id: nextId++, title: action.payload.title, completed: false })
    },
    toggleTask: (state, action: PayloadAction<number>) => {
      const task = state.find(task => task.id === action.payload)
      if (task) {
        task.completed = !task.completed
      }
    },
    removeTask: (state, action: PayloadAction<number>) => {
      return state.filter(task => task.id !== action.payload)
    },
  },
})

export const { addTask, toggleTask, removeTask } = tasksSlice.actions
export default tasksSlice.reducer