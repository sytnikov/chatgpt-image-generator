import React from 'react'
import ReactDOM from 'react-dom/client'

import './page.css'
import ImageTile from './ImageTile'

const App: React.FC<{}> = () => {
  const numberOfImages = 2
  const input = 'a blue goat'
  const inputs = Array(numberOfImages).fill(input)

  return (
    <div>
      {inputs.map((input, index) => (
        <ImageTile key={index} input={input} />
      ))}
    </div>
  )
}

const root = document.createElement('div')
document.body.appendChild(root)

const reactRoot = ReactDOM.createRoot(root)
reactRoot.render(<App />)
