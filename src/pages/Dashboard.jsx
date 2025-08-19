import React, { useMemo, useState } from "react"
import Timeline from "../components/Timeline.jsx"
import TaskModal from "../components/TaskModal.jsx"
import { useLocalTasks } from "../hooks/useLocalTasks.js"
import { todayAmsterdam, toISODate } from "../utils/date.js"

export default function Dashboard(){
  const { tasks, addTask, moveTask } = useLocalTasks()
  const [open, setOpen] = useState(false)

  const dateISO = useMemo(()=> toISODate(todayAmsterdam()), [])
  const dayTasks = tasks.filter(t=>t.date===dateISO).sort((a,b)=>a.start.localeCompare(b.start))

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Today: {dateISO}</h2>
          <p className="text-muted text-sm">Europe/Amsterdam</p>
        </div>
        <button className="btn btn-primary" onClick={()=>setOpen(true)}>+ Add Task</button>
      </div>

      <div className="card p-4">
        <Timeline
          dateISO={dateISO}
          tasks={dayTasks}
          onMove={(id, newHour)=>moveTask(id, dateISO, newHour)}
        />
      </div>

      {open && (
        <TaskModal
          onClose={()=>setOpen(false)}
          onSave={(t)=>{ addTask({...t, date: dateISO}); setOpen(false)}}
          dateISO={dateISO}
        />
      )}
    </div>
  )
}
