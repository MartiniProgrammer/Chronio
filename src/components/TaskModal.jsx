import React, { useMemo, useState } from "react"
import { useUserLabels } from "../hooks/useUserLabels.js"

const DEFAULT_TAGS = ["Work", "Personal", "Health"]
const COLORS = ["grape","sky","emerald","amber","rose"]

export default function TaskModal({ onClose, onSave, dateISO }){
  const { all, add } = useUserLabels()
  const userLabels = useMemo(()=>all(), [])     // persisted custom labels
  const [title, setTitle] = useState("")
  const [start, setStart] = useState("09:00")
  const [end, setEnd] = useState("10:00")
  const [labels, setLabels] = useState([])
  const [custom, setCustom] = useState("")
  const [color, setColor] = useState("grape")

  const toggleLabel = (l)=>{
    setLabels(prev => prev.includes(l) ? prev.filter(x=>x!==l) : [...prev, l])
  }

  const addCustom = ()=>{
    const t = custom.trim()
    if(!t) return
    if(!labels.includes(t)) setLabels([...labels, t])
    add(t) // persist in localStorage
    setCustom("")
  }

  const handleSave = ()=>{
    if(!title.trim()) return
    onSave({
      id: crypto.randomUUID(),
      title: title.trim(),
      start, end, labels, color
    })
  }

  const allChoices = [...DEFAULT_TAGS, ...userLabels.filter(x=>!DEFAULT_TAGS.includes(x))]

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4">
      <div className="card w-full max-w-lg p-6">
        <h3 className="text-lg font-semibold">Add task — {dateISO}</h3>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
          <label className="text-sm">Title
            <input className="mt-1 w-full border border-ui rounded-xl px-3 py-2 bg-card"
                   value={title} onChange={e=>setTitle(e.target.value)} placeholder="e.g. Team stand-up"/>
          </label>
          <label className="text-sm">Start
            <input type="time" className="mt-1 w-full border border-ui rounded-xl px-3 py-2 bg-card"
                   value={start} onChange={e=>setStart(e.target.value)} />
          </label>
          <label className="text-sm">End
            <input type="time" className="mt-1 w-full border border-ui rounded-xl px-3 py-2 bg-card"
                   value={end} onChange={e=>setEnd(e.target.value)} />
          </label>

          {/* Labels */}
          <div className="text-sm md:col-span-2">
            Labels
            <div className="mt-1 flex flex-wrap gap-2">
              {allChoices.map(l=>(
                <button key={l} type="button"
                        onClick={()=>toggleLabel(l)}
                        className={`badge ${labels.includes(l)?"ring-2 ring-[var(--brand)]":""}`}>
                  {l}
                </button>
              ))}
            </div>
            <div className="mt-2 flex gap-2">
              <input className="flex-1 border border-ui rounded-xl px-3 py-2 bg-card"
                     placeholder="Custom label…" value={custom} onChange={e=>setCustom(e.target.value)} />
              <button type="button" className="btn" onClick={addCustom}>Add</button>
            </div>
          </div>

          {/* Task color */}
          <div className="text-sm md:col-span-2">
            Color
            <div className="mt-2 flex items-center gap-3">
              {COLORS.map(c=>(
                <button type="button" key={c}
                        className={`color-dot ${color===c?"is-active":""}`}
                        data-c={c}
                        title={c}
                        onClick={()=>setColor(c)} />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button className="btn" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  )
}
