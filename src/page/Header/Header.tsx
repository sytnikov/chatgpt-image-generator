import React, { useEffect, useState } from 'react'
import { FaArrowRightFromBracket, FaUser } from 'react-icons/fa6'

import './Header.css'
import { User } from '../../utils/types/User'

interface HeaderProps {
  generationsLeft: string | null
  user: User | null
  onSignOut: () => void
}

const Header: React.FC<HeaderProps> = ({
  generationsLeft,
  user,
  onSignOut,
}) => {
  const [loadingUser, setLoadingUser] = useState<boolean>(true)

  const userNotLoggedIn = user === null
  const userNotSubscribed =
    user && user.subscriptions && user.subscriptions.length === 0

  useEffect(() => {
    const fetchUserData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000))
      setLoadingUser(false)
    }
    fetchUserData()
  }, [])

  const handleOpenAccount = () => {
    window.open('https://onlineapp.pro/paywall/290/customer-portal/get', '_blank'); // Replace with the actual URL
  };

  return (
    <header>
      <img src="images/logo.svg" alt="extension logo" width={'248px'} />
      <div className="header-btns">
        {!loadingUser &&
          generationsLeft !== null &&
          (userNotLoggedIn || userNotSubscribed) && (
            <div className="generations-counter">
              <p>{`Free images left: ${generationsLeft}`}</p>
            </div>
          )}
        <button className="btn icon-btn" onClick={handleOpenAccount}>
          <FaUser size={16} />
        </button>
        {user && (
          <button className="btn icon-btn" onClick={onSignOut}>
          <FaArrowRightFromBracket size={16} />
        </button>
        )}
      </div>
    </header>
  )
}

export default Header
