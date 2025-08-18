import React from 'react'
import { Link } from 'react-router-dom'

export default function Welcome() {
  return (
    <div className="mt-16 text-center">
      <div className="mx-auto w-28 h-28 rounded-3xl mb-6" style={{ background:'#004aad' }} />
      <h1 className="text-3xl font-bold mb-2">Welcome to Chronio</h1>
      <p className="text-gray-600 mb-8">Your daily rhythm, simplified.</p>
      <Link to="/dashboard" className="btn-primary">Get Started</Link>
    </div>
  )
}
