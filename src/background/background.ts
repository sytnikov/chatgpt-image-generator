chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('👀 message: ', message)
  console.log('👀 sender: ', sender)
  sendResponse('From the background script!')
})

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === chrome.runtime.OnInstalledReason.INSTALL) {
    chrome.tabs.create({ url: 'https://gpt-image-generator.com/welcome/' })
  }
})

chrome.action.onClicked.addListener(() => {
  chrome.tabs.create({ url: 'page.html' })
})
