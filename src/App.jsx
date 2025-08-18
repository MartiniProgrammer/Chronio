import React from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import InstallPrompt from './components/InstallPrompt'

export default function App() {
  const { pathname } = useLocation()
  return (
    <div className="min-h-screen bg-white">
      <header className="max-w-3xl mx-auto px-4 pt-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-2xl" style={{ background:'#004aad' }} />
            <span className="font-semibold text-lg">Chronio</span>
          </Link>
          <nav className="text-sm text-gray-500">{pathname}</nav>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-4 py-6">
        <Outlet />
      </main>
      <InstallPrompt />
    </div>
  )
}
