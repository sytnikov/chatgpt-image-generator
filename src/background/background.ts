import {
  GENERATIONS_KEY,
  MINIMIZED_KEY,
  POSITION_KEY,
} from '../utils/constants'
import * as storage from '../utils/storage'

const UNINSTALL_URL = 'https://gpt-image-generator.com/uninstall-page/'

console.log('Background script is running!')

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === chrome.runtime.OnInstalledReason.INSTALL) {
    chrome.tabs.create({ url: 'https://gpt-image-generator.com/welcome/' })
  }
  if (details.reason === chrome.runtime.OnInstalledReason.INSTALL || details.reason === chrome.runtime.OnInstalledReason.UPDATE) {

    // chrome.cookies.remove(
    //   { url: 'https://gpt-image-generator.com', name: 'generationsNumber' },
    //   (details) => {
    //     if (details) {
    //       console.log('[REMOVE] generationsNumber cookie deleted:', details)
    //     } else {
    //       console.log('[REMOVE WARNING] generationsNumber cookie was not found')
    //     }
    //   } 
    // )

    chrome.cookies.get(
      { url: 'https://gpt-image-generator.com', name: 'installationDate' },
      (cookie) => {
        if (!cookie) {
          // Set a cookie with the installation date
          chrome.cookies.set({
            url: 'https://gpt-image-generator.com',
            name: 'installationDate',
            value: new Date().toISOString(),
            expirationDate: Math.floor(Date.now() / 1000) + 365 * 24 * 60 * 60, // Set for 1 year
          })
          console.log('[SET] installationDate set')
        } else {
          console.log('[SET WARNING] installationDate already set: ', cookie.value)
        }
      }
    )

    chrome.cookies.get(
      { url: 'https://gpt-image-generator.com', name: 'generationsNumber' },
      (cookie) => {
        if (!cookie) {
          // Set a cookie with the generation number
          chrome.cookies.set({
            url: 'https://gpt-image-generator.com',
            name: 'generationsNumber',
            value: '5',
            expirationDate: Math.floor(Date.now() / 1000) + 365 * 24 * 60 * 60, // Set for 1 year
          })
          console.log('[SET] generationsNumber set')
        } else {
          console.log('[SET WARNING] generationsNumber already set: ', cookie.value)
        }
      }

    )
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

    chrome.tabs.query({ currentWindow: true }, (tabs) => {
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

// checking Chrome cookie values

// chrome.cookies.get(
//   { url: 'https://gpt-image-generator.com', name: 'installationDate' },
//   (cookie) => {
//     if (cookie) {
//       console.log('cookie', cookie)
//     } else {
//       console.log('installation cookie was not found')
//     }
//   }
// )
// chrome.cookies.get(
//   { url: 'https://gpt-image-generator.com', name: 'generationsNumber' },
//   (cookie) => {
//     if (cookie) {
//       console.log('cookie', cookie)
//     } else {
//       console.log('generations cookie was not found')
//     }
//   }
// )
