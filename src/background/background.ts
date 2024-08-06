chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('👀 message: ', message)
  console.log('👀 sender: ', sender)
  sendResponse('From the background script!')
})

chrome.action.onClicked.addListener(() => {
  chrome.tabs.create({ url: 'App.html' })
})
