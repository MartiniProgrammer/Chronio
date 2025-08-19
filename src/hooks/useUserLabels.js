const KEY = "chronio_user_labels"

export function useUserLabels(){
  const stored = JSON.parse(localStorage.getItem(KEY) || "[]")
  const save = (arr)=> localStorage.setItem(KEY, JSON.stringify(arr))
  const add = (label)=>{
    const t = String(label || "").trim()
    if(!t) return stored
    if(!stored.includes(t)){
      const next = [...stored, t]
      save(next)
      return next
    }
    return stored
  }
  const all = ()=> JSON.parse(localStorage.getItem(KEY) || "[]")
  return { add, all }
}
