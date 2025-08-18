import React, { useMemo } from 'react'

function parseHM(hm){
  const [h, m] = hm.split(':').map(Number)
  return h*60 + m
}

export default function Timeline({ tasks = [] }){
  const sorted = useMemo(() => [...tasks].sort((a,b)=>parseHM(a.start)-parseHM(b.start)), [tasks])

  // Simple hourly grid from 06:00 to 22:00
  const hours = Array.from({length:17}, (_,i)=>i+6)

  return (
    <div className="grid grid-cols-[80px,1fr] gap-x-4">
      <div className="flex flex-col gap-6 pt-8">
        {hours.map(h=> (
          <div key={h} className="text-xs text-gray-500">{String(h).padStart(2,'0')}:00</div>
        ))}
      </div>
      <div className="relative border-l border-gray-200">
        {/* Hour lines */}
        {hours.map((h, i)=> (
          <div key={h} className="absolute left-0 right-0 border-t border-gray-100" style={{ top: i*48 }} />
        ))}

        {/* Tasks as blocks */}
        {sorted.map(t => {
          const startMin = parseHM(t.start)
          const endMin = parseHM(t.end)
          const top = ((startMin - 6*60) / 60) * 48
          const height = Math.max(32, ((endMin - startMin)/60) * 48)
          return (
            <div key={t.id}
              className="absolute left-3 right-3 bg-brand/10 border border-brand/40 rounded-2xl px-3 py-2"
              style={{ top, height }}
            >
              <div className="text-xs text-brand font-semibold">{t.start}–{t.end}</div>
              <div className="font-medium">{t.title}</div>
            </div>
          )
        })}

        <div style={{ height: hours.length*48 }} />
      </div>
    </div>
  )
}
