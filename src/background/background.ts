import * as storage from '../utils/storage'
import { POSITION_KEY, MINIMIZED_KEY } from '../contentScript/Widget'

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === chrome.runtime.OnInstalledReason.INSTALL) {
    chrome.tabs.create({ url: 'https://gpt-image-generator.com/welcome/' })
  }
  storage.storageSet(POSITION_KEY, JSON.stringify({ x: 0, y: 10 }))
  storage.storageSet(MINIMIZED_KEY, true)
})

chrome.action.onClicked.addListener(() => {
  chrome.tabs.create({ url: 'page.html' })
})
