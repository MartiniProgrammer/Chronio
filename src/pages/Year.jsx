import React, { useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { todayAmsterdam, toISODate } from "../utils/date.js"

function buildYearMatrixFast(year){
  // Build 12 * 42 cells without expensive locale conversions
  const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ]
  const weeksByMonth = []

  const todayISO = toISODate(todayAmsterdam())

  for(let m=0;m<12;m++){
    const first = new Date(year, m, 1)
    const startDay = (first.getDay()+6)%7 // Monday=0
    const daysInMonth = new Date(year, m+1, 0).getDate()
    const cells = []
    for(let i=0;i<startDay;i++) cells.push(null)
    for(let d=1; d<=daysInMonth; d++){
      const date = new Date(year, m, d)
      const iso = toISODate(date)
      cells.push({ date, inMonth:true, isToday: iso===todayISO })
    }
    while(cells.length<42) cells.push({ date:new Date(), inMonth:false })
    const weeks=[]
    for(let i=0;i<6;i++) weeks.push(cells.slice(i*7,(i+1)*7))
    weeksByMonth.push({ name: monthNames[m], weeks })
  }
  return weeksByMonth
}

export default function Year(){
  const nav = useNavigate()
  const year = todayAmsterdam().getFullYear()
  const months = useMemo(()=>buildYearMatrixFast(year), [year])

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Calendar {year}</h2>
          <p className="text-muted text-sm">Today: {toISODate(todayAmsterdam())} (Europe/Amsterdam)</p>
        </div>
        <button className="btn" onClick={()=>nav("/dashboard")}>Go to Dashboard</button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {months.map((m)=>(
          <div key={m.name} className="card p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="font-semibold">{m.name}</div>
              <div className="text-xs text-muted grid grid-cols-7 gap-1">
                {["M","T","W","T","F","S","S"].map(d=><span key={d} className="w-6 text-center">{d}</span>)}
              </div>
            </div>
            <div className="grid grid-rows-6 gap-1">
              {m.weeks.map((w,wi)=>(
                <div key={wi} className="grid grid-cols-7 gap-1">
                  {w.map((d,di)=>(
                    <button
                      key={di}
                      onClick={()=>d?.inMonth && nav(`/dashboard?date=${toISODate(d.date)}`)}
                      className={`h-8 rounded-xl text-xs border border-ui ${d?.inMonth ? "bg-card" : "opacity-40"} ${d?.isToday ? "ring-2 ring-[var(--brand)]" : ""}`}
                    >
                      {d?.date?.getDate?.() ?? ""}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
