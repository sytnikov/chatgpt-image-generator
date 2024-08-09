import React, { useEffect, useState } from 'react'
import ImageTile from '../ImageTile'

import './Container.css'
import Header from '../Header'
import ImageModal from '../ImageModal'

const Container: React.FC = () => {
  const [input, setInput] = useState<string>('')
  const [inputs, setInputs] = useState<string[]>([])
  const [generateClicked, setGenerateClicked] = useState<boolean>(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [numPictures, setNumPictures] = useState<number>(1)
  const [pictureSize, setPictureSize] = useState<string>('1024x1024')
  const [pictureStyle, setPictureStyle] = useState<string>('anime')

  useEffect(() => {
    if (generateClicked) {
      setInputs(Array(numPictures).fill(input))
      setSelectedImage(null)
      setGenerateClicked(false)
    }
  }, [generateClicked, input, numPictures])

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
        <div className="instructions">
          <h1>Hi 👋</h1>
          <p>
            Choose your preferable settings from the dropdown lists and write a
            prompt to generate images!
          </p>
        </div>
        <div className="dropdowns">
          <div className="dropdown-section">
            <label htmlFor="num-pictures">Number of pictures:</label>
            <select
              value={numPictures}
              onChange={(e) => setNumPictures(Number(e.target.value))}
              className="dropdown"
              id="num-pictures"
            >
              {[1, 2, 3, 4].map((num, index) => (
                <option key={index} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          <div className="dropdown-section">
            <label htmlFor="picture-size">Size of pictures:</label>
            <select
              value={pictureSize}
              onChange={(e) => setPictureSize(e.target.value)}
              className="dropdown"
              id="picture-size"
            >
              {['1024x1024', '1152x896', '896x1152'].map((size, index) => (
                <option key={index} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          <div className="dropdown-section">
            <label htmlFor="picture-style">Style of pictures:</label>
            <select
              value={pictureStyle}
              onChange={(e) => setPictureStyle(e.target.value)}
              className="dropdown"
              id="picture-style"
            >
              {['anime', 'realistic', 'abstract'].map((style, index) => (
                <option key={index} value={style}>
                  {style}
                </option>
              ))}
            </select>
          </div>
        </div>

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
            <ImageTile
              key={index}
              input={input}
              onClick={handleImageClick}
              size={pictureSize}
              style={pictureStyle}
            />
          ))}
        </div>
      </div>

      {selectedImage && (
        // <div className="right-container">
        //   <img
        //     src={selectedImage}
        //     alt="enlarged generated image"
        //     id="enlarged-image"
        //   />
        //   <button className="btn download-btn" onClick={handleDownloadClick}>
        //     <img src="images/download.svg" alt="download icon" />
        //   </button>
        // </div>
        <ImageModal
          imageUrl={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  )
}

export default Container
