import React, { useState } from "react"
import { formatTime } from "../utils/date.js"
import LabelPill from "./labels/LabelPill.jsx"

export default function Timeline({ dateISO, tasks, onMove }){
  const [dragId, setDragId] = useState(null)

  const onDragStart = (id)=> (e)=>{
    setDragId(id)
    e.dataTransfer.setData("text/plain", id)
    e.dataTransfer.effectAllowed = "move"
  }
  const onDropHour = (hour)=> (e)=>{
    e.preventDefault()
    const id = dragId || e.dataTransfer.getData("text/plain")
    if(id) onMove(id, hour)
    setDragId(null)
  }
  const allowDrop = (e)=> e.preventDefault()

  return (
    <div>
      {[...Array(24)].map((_,h)=>(
        <div key={h} className="hour-row" onDragOver={allowDrop} onDrop={onDropHour(h)}>
          <div className="hour-label">{String(h).padStart(2,"0")}:00</div>
          <div className="min-h-[44px]">
            {tasks.filter(t=>Number(t.start.split(":")[0])===h).map(t=>(
              <div key={t.id}
                   className="task-box mb-2 cursor-grab"
                   data-color={t.color || "grape"}
                   draggable
                   onDragStart={onDragStart(t.id)}>
                <div className="flex justify-between items-start gap-2">
                  <div className="font-medium">{t.title}</div>
                  <div className="text-xs text-muted">{formatTime(t.start)}–{formatTime(t.end)}</div>
                </div>
                {t.labels?.length ? (
                  <div className="mt-1 flex flex-wrap gap-1">
                    {t.labels.map(lb => <LabelPill key={lb} label={lb} />)}
                  </div>
                ): null}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
