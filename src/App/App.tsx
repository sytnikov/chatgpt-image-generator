import React from 'react'
import ReactDOM from 'react-dom/client'

import './App.css'
import Container from './Container'

const App: React.FC<{}> = () => {
  return (
    <div>
      <Container />
    </div>
  )
}

const root = document.createElement('div')
document.body.appendChild(root)

const reactRoot = ReactDOM.createRoot(root)
reactRoot.render(<App />)
