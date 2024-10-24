import React, { useCallback, useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom/client'

import './page.css'
import Container from './Container'
import Header from './Header'
import { User } from '../utils/types/User'

declare global {
  interface Window {
    paywall: {
      open: () => Promise<any>
      signOut: () => Promise<any>
      getUser: () => Promise<any>
    }
  }
}

const App: React.FC<{}> = () => {
  const [generationsLeft, setGenerationsLeft] = useState<string | null>(null)
  const [isPaywallOpen, setIsPaywallOpen] = useState<boolean>(false)
  const [user, setUser] = useState<User | null>(null)

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

  useEffect(() => {
    const script = document.createElement('script')
    script.src = './wall.js'
    script.async = true
    script.onload = async () => {
      console.log('Paywall script loaded successfully')
      if (window.paywall) {
        await handleGetUser()
      }
    }
    script.onerror = () => {
      console.error('Failed to load the paywall script')
    }
    document.body.appendChild(script)
    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const handleOpenPaywall = useCallback(async () => {
    try {
      await window.paywall?.open?.()
      setIsPaywallOpen(true)
    } catch (error) {
      console.error('Error opening the paywall:', error)
    }
  }, [])

  const handleGetUser = async () => {
    console.log('Fetching user data...')
    try {
      const userData: User = await window.paywall?.getUser?.()
      if (userData.user) {
        setUser(userData)
        console.log('👀 User data from page', userData)
      } else {
        console.log('User data not found')
        setUser(null)
      }
    } catch (error) {
      console.error('Error fetching user data:', error)
      setUser(null)
    }
  }

  const handleSignOut = async () => {
    try {
      await window.paywall?.signOut?.()
      console.log('👀 Successfully signed out')
      window.location.reload()
    } catch (error) {
      console.log('Error logging out: ', error)
    }
  }

  return (
    <div>
      <div className="grid-container">
      <div className="content">
        <div className="oval-stain"></div>
        <Header
          generationsLeft={generationsLeft}
          user={user}
          onSignOut={handleSignOut}
        />
        <Container
          generationsLeft={generationsLeft}
          setGenerationsLeft={setGenerationsLeft}
          user={user}
          onPaywallOpen={handleOpenPaywall}
        />
      </div>
      {/* consider moving footer into a separate component */}
      <footer>
        <p style={{ textAlign: 'center' }}>
          Support email:{' '}
          <a
            href="mailto:aitools.extentions@gmail.com"
            style={{
              textDecoration: 'underline',
              color: 'rgba(255, 255, 255, 0.7)',
            }}
          >
            aitools.extentions@gmail.com
          </a>
        </p>
      </footer>
    </div>
    </div>
    
  )
}

const root = document.createElement('div')
document.body.appendChild(root)

const reactRoot = ReactDOM.createRoot(root)
reactRoot.render(<App />)
