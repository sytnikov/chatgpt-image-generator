import React, { useEffect, useState } from 'react'
import ImageTile from '../ImageTile'

import './Container.css'
import Header from '../Header'

const Container: React.FC = () => {
  const [input, setInput] = useState<string>('')
  const [inputs, setInputs] = useState<string[]>([])
  const [generateClicked, setGenerateClicked] = useState<boolean>(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  useEffect(() => {
    if (generateClicked) {
      setInputs([input, input])
      setSelectedImage(null)
      setGenerateClicked(false)
    }
  }, [generateClicked, input])

  const handleGenerateClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setInputs([])
    setSelectedImage(null)
    setGenerateClicked(true)
  }

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl)
  }

  return (
    <div className="container">
      <div className="left-container">
        <Header />
        <form className="gen-form">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your prompt here..."
            autoComplete="off"
            id="user-prompt"
          />
          <button
            onClick={handleGenerateClick}
            className="btn submit-btn"
            id="generate"
          >
            <img src="images/paper-plane.svg" alt="paper plane icon" />
          </button>
        </form>
        <div id="image-grid">
          {inputs.map((input, index) => (
            <ImageTile key={index} input={input} onClick={handleImageClick} />
          ))}
        </div>
      </div>

      {selectedImage && (
        <div className="right-container">
          <img
            src={selectedImage}
            alt="enlarged generated image"
            id="enlarged-image"
          />
        </div>
      )}
    </div>
  )
}

export default Container
