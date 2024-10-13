import React, { useEffect, useState } from 'react'

import './Header.css'
import { User } from '../../utils/types/User'

interface HeaderProps {
  generationsLeft: string | null,
  user: User | null,
  onSignOut: () => void
}


const Header: React.FC<HeaderProps> = ({ generationsLeft, user, onSignOut }) => {
  const [loadingUser, setLoadingUser] = useState<boolean>(true)
  
  const userNotLoggedIn = user === null;
  const userNotSubscribed = user && user.subscriptions && user.subscriptions.length === 0;
  
  useEffect(() => {
    const fetchUserData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setLoadingUser(false);
    };
    fetchUserData();
  }, []);

  return (
    <header>
      <img src="images/logo.svg" alt="extension logo" width={'248px'} />
      {!loadingUser && generationsLeft !== null && (userNotLoggedIn || userNotSubscribed) && (
        <div className="generations-counter">
          <p>{`Free images left: ${generationsLeft}`}</p>
        </div>
      )}
      {/* <button className='btn upgrade-btn' onClick={onSignOut}>Sign out</button> */}
    </header>
  )
}

export default Header
