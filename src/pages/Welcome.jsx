import React from "react"
import { useNavigate } from "react-router-dom"

export default function Welcome(){
  const navigate = useNavigate()
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="card p-8 md:p-12">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1">
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="w-9 h-9 rounded-xl" style={{background:"var(--brand)"}} />
              <span className="font-bold tracking-wide">Chronio</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-3">
              Your daily rhythm, simplified.
            </h1>
            <p className="text-muted mb-6">
              Plan your day, view your year, and drag tasks just like in Google Calendar—without the complexity.
            </p>
            <div className="flex gap-3">
              <button className="btn btn-primary" onClick={()=>navigate("/dashboard")}>Open Dashboard</button>
              <button className="btn" onClick={()=>navigate("/year")}>Year Overview</button>
            </div>
          </div>
          <div className="flex-1 w-full">
            <div className="card p-6 min-h-[220px]">
              <div className="text-sm text-muted">Preview</div>
              <div className="mt-3 grid grid-cols-7 gap-2">
                {[...Array(14)].map((_,i)=>(
                  <div key={i} className="h-10 rounded-xl border border-ui bg-chip"/>
                ))}
              </div>
              <div className="mt-3 text-xs text-muted">Clean, modern, large rounds, subtle shadows.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
