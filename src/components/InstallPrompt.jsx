import React, { useEffect, useState } from 'react'

export default function InstallPrompt(){
  const [deferred, setDeferred] = useState(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault()
      setDeferred(e)
      setVisible(true)
    }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  if(!visible) return null

  return (
    <div className="fixed bottom-4 left-0 right-0 flex justify-center">
      <div className="card px-4 py-3 flex items-center gap-3">
        <div className="h-6 w-6 rounded-md" style={{ background:'#004aad' }} />
        <div>
          <div className="font-medium">Install Chronio</div>
          <div className="text-xs text-gray-500">Add to your home screen for a faster experience.</div>
        </div>
        <div className="ml-2 flex gap-2">
          <button className="btn-outline" onClick={()=>setVisible(false)}>Not now</button>
          <button className="btn-primary" onClick={async()=>{
            if(!deferred) return
            deferred.prompt()
            const { outcome } = await deferred.userChoice
            if(outcome) setVisible(false)
          }}>Install</button>
        </div>
      </div>
    </div>
  )
}
