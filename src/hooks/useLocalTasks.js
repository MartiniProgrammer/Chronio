import { useEffect, useState } from 'react'

const KEY = 'chronio.tasks.v1'

export default function useLocalTasks(){
  const [tasks, setTasks] = useState([])

  // Load
  useEffect(()=>{
    try {
      const raw = localStorage.getItem(KEY)
      if(raw){ setTasks(JSON.parse(raw)) }
    } catch {}
  }, [])

  // Persist
  useEffect(()=>{
    try { localStorage.setItem(KEY, JSON.stringify(tasks)) } catch {}
  }, [tasks])

  const addTask = (t) => {
    const id = crypto?.randomUUID?.() || String(Date.now())
    const item = { id, title: t.title, start: t.start, end: t.end }
    setTasks(prev => [...prev, item])
  }

  return { tasks, addTask }
}
