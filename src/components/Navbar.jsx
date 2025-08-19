import React, { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { useTheme } from "../theme/ThemeContext.jsx"

const ACCENTS = ["blue","teal","purple","pink","amber","green","indigo","cyan"]

export default function Navbar(){
  const { theme, setTheme, accent, setAccent } = useTheme()
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  return (
    <header className="sticky top-0 z-10 topbar border-b border-ui">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl" style={{background:"var(--brand)"}}/>
          <Link to="/" className="font-bold">Chronio</Link>
          <nav className="ml-6 hidden md:flex gap-3">
            <Link className={`btn ${pathname==="/dashboard"?"btn-primary":""}`} to="/dashboard">Dashboard</Link>
            <Link className={`btn ${pathname==="/year"?"btn-primary":""}`} to="/year">Year</Link>
          </nav>
        </div>

        <div className="relative">
          <button className="btn" onClick={()=>setOpen(v=>!v)}>
            <span className="mr-2">User</span>
            <span className="w-2 h-2 bg-[var(--brand)] rounded-full inline-block"></span>
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-80 card p-4">
              <div className="text-sm text-muted mb-2">Theme mode</div>
              <div className="grid grid-cols-3 gap-2">
                <button className={`btn ${theme==="blue"?"btn-primary":""}`} onClick={()=>setTheme("blue")}>Light</button>
                <button className={`btn ${theme==="dark"?"btn-primary":""}`} onClick={()=>setTheme("dark")}>Dark</button>
              </div>

              <div className="text-sm text-muted mt-4 mb-2">Accent color</div>
              <div className="grid grid-cols-8 gap-2">
                {ACCENTS.map(a=>(
                  <button
                    key={a}
                    className={`accent-swatch ${accent===a?"is-active":""}`}
                    data-a={a}
                    title={a}
                    onClick={()=>setAccent(a)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
