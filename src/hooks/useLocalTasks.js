import { useEffect, useMemo, useState } from "react"

const KEY = "chronio_tasks_v2"

export function useLocalTasks(){
  const [tasks, setTasks] = useState([])

  useEffect(()=>{
    try{
      const raw = localStorage.getItem(KEY)
      if(raw){
        const parsed = JSON.parse(raw)
        // migratie: labels kunnen ontbreken
        setTasks(parsed.map(t=>({...t, labels: t.labels ?? []})))
      }
    }catch(e){ /* ignore */ }
  }, [])

  useEffect(()=>{
    localStorage.setItem(KEY, JSON.stringify(tasks))
  }, [tasks])

  const addTask = (t)=> setTasks(prev => [...prev, t])
  const updateTask = (id, patch)=> setTasks(prev => prev.map(t=>t.id===id? {...t, ...patch}: t))
  const moveTask = (id, dateISO, newHour)=>{
    setTasks(prev => prev.map(t=>{
      if(t.id!==id) return t
      const [sh, sm] = t.start.split(":").map(Number)
      const [eh, em] = t.end.split(":").map(Number)
      const durMin = (eh*60+em) - (sh*60+sm)
      const ns = `${String(newHour).padStart(2,"0")}:${String(sm).padStart(2,"0")}`
      const endTotal = newHour*60 + sm + durMin
      const neh = Math.floor(endTotal/60)%24
      const nem = endTotal%60
      const ne = `${String(neh).padStart(2,"0")}:${String(nem).padStart(2,"0")}`
      return {...t, date: dateISO, start: ns, end: ne}
    }))
  }

  return { tasks, addTask, updateTask, moveTask }
}
