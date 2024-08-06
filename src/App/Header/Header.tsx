import React from 'react'

import './Header.css'

const Header = () => {
  return (
    <header>
      <img src="images/logo.svg" alt="extension logo" />
      <button className="btn upgrade-btn">
        Go to Pro
        <img src="images/arrow.svg" alt="arrow icon" />
      </button>
      <button className="btn icon-btn">
        <img src="images/burger.svg" alt="burger icon" />
      </button>
    </header>
  )
}

export default Header
