console.log('Content script started working.')

// Create a div for the widget
const widgetContainer = document.createElement('div')
widgetContainer.id = 'draggable-widget-container'
document.body.appendChild(widgetContainer)

// Inject your widget script
const script = document.createElement('script')
const scriptURL = chrome.runtime.getURL('widget.js')
console.log('Script URL:', scriptURL)
script.src = scriptURL
document.body.appendChild(script)

console.log('Content script has been injected and executed.')
