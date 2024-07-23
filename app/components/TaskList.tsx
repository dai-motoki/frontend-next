'use client'

import { useSelector, useDispatch } from 'react-redux'
import { addTask, toggleTask, removeTask } from '../store/tasksSlice'
import { useState } from 'react'
import { RootState, AppDispatch } from '../store'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'

export default function TaskList() {
  const tasks = useSelector((state: RootState) => state.tasks)
  const dispatch = useDispatch<AppDispatch>()
  const [newTask, setNewTask] = useState('')
  const session = useSession()
  const supabase = useSupabaseClient()

  const handleAddTask = () => {
    if (newTask.trim()) {
      dispatch(addTask({ title: newTask }))
      setNewTask('')
    }
  }

  if (!session) {
    return <div>Please log in to view and manage tasks.</div>
  }

  return (
    <div className="w-full max-w-md">
      <div className="mb-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="New task"
        />
        <button
          onClick={handleAddTask}
          className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Task
        </button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className="mb-2 flex items-center">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => dispatch(toggleTask(task.id))}
              className="mr-2"
            />
            <span className={task.completed ? 'line-through' : ''}>{task.title}</span>
            <button
              onClick={() => dispatch(removeTask(task.id))}
              className="ml-auto bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}