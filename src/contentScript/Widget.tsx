import React from 'react'
import ReactDOM from 'react-dom/client'

console.log('Widget script loaded') // Verify that the script is running

// Add a slight delay to ensure the element is in the DOM
document.addEventListener('DOMContentLoaded', () => {
  const widgetCont = document.getElementById('draggable-widget-container')

  if (widgetCont) {
    console.log('Container found, initializing React...')
    const reactRoot = ReactDOM.createRoot(widgetCont)
    reactRoot.render(<Widget />)
  } else {
    console.error('Container not found!')
  }
})

const Widget: React.FC = () => {
  return <div>Hello, I am a simple widget.</div>
}
