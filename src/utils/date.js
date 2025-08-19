const TZ = "Europe/Amsterdam"

export function todayAmsterdam(){
  // Locale trick om timezone toe te passen
  const s = new Date().toLocaleString("en-US", { timeZone: TZ })
  return new Date(s)
}
export function toISODate(d){
  const y = d.getFullYear()
  const m = String(d.getMonth()+1).padStart(2,"0")
  const dd = String(d.getDate()).padStart(2,"0")
  return `${y}-${m}-${dd}`
}
export function formatTime(hhmm){
  return hhmm
}

// 12 maanden structuur voor year view
export function getYearMatrix(year){
  const monthNames = [
    "Januari","Februari","Maart","April","Mei","Juni",
    "Juli","Augustus","September","Oktober","November","December"
  ]
  const today = todayAmsterdam()
  return [...Array(12)].map((_,mi)=>{
    const first = new Date(Date.UTC(year, mi, 1))
    const startDay = (first.getUTCDay()+6)%7 // maandag=0
    const daysInMonth = new Date(Date.UTC(year, mi+1, 0)).getUTCDate()
    const cells = []
    // vul lege cellen voor de 1e dag
    for(let i=0;i<startDay;i++){ cells.push(null) }
    // echte dagen
    for(let d=1; d<=daysInMonth; d++){
      const date = new Date(Date.UTC(year, mi, d))
      const local = new Date(date.toLocaleString("en-US", { timeZone: TZ }))
      const isToday = toISODate(local)===toISODate(today)
      cells.push({ date: local, inMonth:true, isToday })
    }
    // compleet tot 42 cellen
    while(cells.length<42){ cells.push({ date:new Date(), inMonth:false }) }
    // in weken van 7
    const weeks = []
    for(let i=0;i<6;i++){ weeks.push(cells.slice(i*7,(i+1)*7)) }
    return { name: monthNames[mi], weeks }
  })
}
