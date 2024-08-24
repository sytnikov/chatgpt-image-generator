import { MINIMIZED_KEY, POSITION_KEY, GENERATIONS_KEY } from '../utils/constants'
import * as storage from '../utils/storage'

const UNINSTALL_URL = "https://gpt-image-generator.com/uninstall-page/"

console.log('Background script is running!')

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === chrome.runtime.OnInstalledReason.INSTALL) {
    chrome.tabs.create({ url: 'https://gpt-image-generator.com/welcome/' })
  }
  storage.storageSet(POSITION_KEY, JSON.stringify({ x: '100%', y: '50%' }))
  storage.storageSet(MINIMIZED_KEY, false)
  storage.storageSet(GENERATIONS_KEY, 0)
})

chrome.action.onClicked.addListener(() => {
  chrome.tabs.create({ url: 'page.html' })
})

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'openOrCreateTab') {
    const extensionId = chrome.runtime.id
    const pageUrl = `chrome-extension://${extensionId}/page.html`

    chrome.tabs.query({currentWindow: true}, (tabs) => {
      const pageTab = tabs.find((tab) => {
        return tab.url === pageUrl
      })
      console.log('pageTab:', pageTab)

      if (pageTab) {
        chrome.tabs.update(pageTab.id, { active: true }, () => {
          sendResponse({ status: 'success', message: 'Tab activated' })
        })
      } else {
        chrome.tabs.create({ url: 'page.html' }, (tab) => {
          sendResponse({
            status: 'success',
            message: 'Tab created',
            tabId: tab.id,
          })
        })
      }
    })
    
    return true
  }
})

chrome.runtime.setUninstallURL(UNINSTALL_URL)


