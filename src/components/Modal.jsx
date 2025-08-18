import React, { useEffect } from 'react'

export default function Modal({ open, onClose, title, children }){
  useEffect(() => {
    const onKey = (e) => { if(e.key === 'Escape') onClose?.() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  if(!open) return null
  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-[2px] flex items-end sm:items-center justify-center p-4 z-50" onClick={onClose}>
      <div className="card w-full max-w-md p-5" onClick={e=>e.stopPropagation()}>
        {title && <h3 className="text-lg font-semibold mb-3">{title}</h3>}
        {children}
      </div>
    </div>
  )
}
