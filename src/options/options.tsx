import React from 'react'
import ReactDOM from 'react-dom/client'

import './options.css'

const App: React.FC<{}> = () => {
  return (
    <div>
      <img src="icons/icon-48.png" />
    </div>
  )
}

const root = document.createElement('div')
document.body.appendChild(root)

const reactRoot = ReactDOM.createRoot(root)
reactRoot.render(<App />)
