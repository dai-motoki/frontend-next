import TaskList from './components/TaskList'
import LoginButton from './components/LoginButton'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Task Manager</h1>
      <LoginButton />
      <TaskList />
    </main>
  )
}