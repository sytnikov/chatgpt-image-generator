import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'

import './page.css'
import Container from './Container'
import Header from './Header'

const App: React.FC<{}> = () => {
  const [generationsLeft, setGenerationsLeft] = useState<string | null>(null)

  useEffect(() => {
    chrome.cookies.get(
      { url: 'https://gpt-image-generator.com', name: 'generationsNumber' },
      (cookie) => {
        if (cookie && cookie.value) {
          setGenerationsLeft(cookie.value)
        } else {
          setGenerationsLeft('0')
          console.log('[WARNING LOG] generations number cookies was not found')
        }
      }
    )
  }, [])

  return (
    <div>
      <div className="oval-stain"></div>
      <Header generationsLeft={generationsLeft}/>
      <Container generationsLeft={generationsLeft} setGenerationsLeft={setGenerationsLeft}/>
    </div>
  )
}

const root = document.createElement('div')
document.body.appendChild(root)

const reactRoot = ReactDOM.createRoot(root)
reactRoot.render(<App />)
