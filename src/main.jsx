// src/main.jsx
import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./App.jsx"
import "./index.css"
import { ThemeProvider } from "./theme/ThemeContext.jsx"
// Register PWA service worker in production
if (import.meta.env.PROD) {
  // Vite PWA helper (werkt als je vite-plugin-pwa gebruikt)
  import('virtual:pwa-register').then(({ registerSW }) => {
    registerSW({ immediate: true })
  }).catch(() => {})
}


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
)
// # notes: register a very small SW in production on HTTPS
if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  });
}
