import React from 'react'

import './Header.css'

interface HeaderProps {
  generationsLeft: string | null
}

const Header: React.FC<HeaderProps> = ({ generationsLeft }) => {
  return (
    <header>
      <img src="images/logo.svg" alt="extension logo" width={'248px'} />
      {generationsLeft !== null && (
        <div className="generations-counter">
          <p>{`Pictures left: ${generationsLeft}`}</p>
        </div>
      )}
    </header>
  )
}

export default Header
