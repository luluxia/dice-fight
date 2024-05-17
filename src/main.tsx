import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import toast from 'react-hot-toast'
import { register } from 'register-service-worker'
import './index.css'
import 'virtual:uno.css'
import '@unocss/reset/tailwind.css'
import 'pattern.css/dist/pattern.min.css'

register('./sw.js', {
  registered() {
    console.log('Service worker has been registered.')
  },
  updatefound() {
    toast('游戏更新中…')
  },
  error(error) {
    console.error('Error during service worker registration:', error)
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
