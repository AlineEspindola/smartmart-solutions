import { useState } from "react"
import { NavLink } from "react-router-dom"
import { Package, Layers, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import clsx from "clsx"

const navItems = [
  { label: "Produtos", to: "/", icon: Package },
  { label: "Categorias", to: "/categories", icon: Layers },
  { label: "Vendas", to: "/sales", icon: Package },
]

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={clsx(
        "h-screen border-r bg-background transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center justify-between p-4">
        {!collapsed && <h2 className="text-xl font-bold">SmartMart</h2>}

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      <nav className="space-y-1 px-2">
        {navItems.map(({ label, to, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              clsx(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition",
                isActive
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:bg-muted",
                collapsed && "justify-center px-0"
              )
            }
          >
            <Icon className="h-4 w-4" />
            {!collapsed && label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
