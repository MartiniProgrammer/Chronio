import React, { useMemo, useState } from 'react'
import Timeline from '../components/Timeline'
import Modal from '../components/Modal'
import useLocalTasks from '../hooks/useLocalTasks'

export default function Dashboard() {
  const { tasks, addTask } = useLocalTasks()
  const [open, setOpen] = useState(false)

  const today = useMemo(() => {
    const d = new Date()
    return d.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  }, [])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">{today}</h2>
        <button className="btn-primary" onClick={() => setOpen(true)}>+ Add Task</button>
      </div>

      <div className="card p-4">
        <Timeline tasks={tasks} />
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="Add Task">
        <TaskForm onSubmit={(t) => { addTask(t); setOpen(false) }} />
      </Modal>
    </div>
  )
}

function TaskForm({ onSubmit }) {
  const [title, setTitle] = useState('')
  const [start, setStart] = useState('09:00')
  const [end, setEnd] = useState('10:00')

  return (
    <form className="space-y-3" onSubmit={(e) => {
      e.preventDefault()
      if(!title.trim()) return
      onSubmit({ title, start, end })
    }}>
      <div>
        <label className="label">Task name</label>
        <input className="input" value={title} onChange={e=>setTitle(e.target.value)} placeholder="Focus block" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="label">Start</label>
          <input type="time" className="input" value={start} onChange={e=>setStart(e.target.value)} />
        </div>
        <div>
          <label className="label">End</label>
          <input type="time" className="input" value={end} onChange={e=>setEnd(e.target.value)} />
        </div>
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <button type="button" className="btn-outline" onClick={()=>history.back()}>Cancel</button>
        <button type="submit" className="btn-primary">Save</button>
      </div>
    </form>
  )
}
