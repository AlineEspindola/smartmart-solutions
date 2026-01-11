import { Outlet } from "react-router-dom"
import { Sidebar } from "./sidebar"

export function AppLayout() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto bg-muted/40">
        <Outlet />
      </main>
    </div>
  )
}
