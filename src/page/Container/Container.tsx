import React, { useEffect, useRef, useState } from 'react'

import ImageTile from '../ImageTile'
import './Container.css'
import Header from '../Header'
import ImageModal from '../ImageModal'
import FeedbackModal from '../FeedbackModal'

const Container: React.FC = () => {
  const [input, setInput] = useState<string>('')
  const [inputs, setInputs] = useState<string[]>([])
  const [generateClicked, setGenerateClicked] = useState<boolean>(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [numPictures, setNumPictures] = useState<number>(1)
  const [pictureSize, setPictureSize] = useState<string>('1024x1024')
  const [pictureStyle, setPictureStyle] = useState<string>('Realistic')
  const [feedbackPopup, setFeedbackPopup] = useState<boolean>(false)
  const [clickCount, setClickCount] = useState<number>(0)
  const textareaRef = useRef(null)

  useEffect(() => {
    if (generateClicked) {
      setInputs(Array(numPictures).fill(input))
      setSelectedImage(null)
      setGenerateClicked(false)
    }
  }, [generateClicked, input, numPictures])

  const handleGenerateClick = (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    event.preventDefault()
    setInputs([])
    setSelectedImage(null)
    setGenerateClicked(true)
    setClickCount((prevCount) => prevCount + 1)

    if (clickCount + 1 === 3) {
      setFeedbackPopup(true)
    }
  }

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl)
  }

  useEffect(() => {
    adjustTextareaHeight()
  }, [input])

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current
    textarea.style.height = 'auto'
    textarea.style.height = `${textarea.scrollHeight}px`
  }

  const handleCloseFeedbackPopup = () => {
    setFeedbackPopup(false)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      handleGenerateClick(event)
    }
  }

  return (
    <>
      <div className="container">
        <Header />
        <div className="container-wrapper">
          <div className="instructions">
            <h1>Write a prompt below ✍🏼</h1>
            <p>What image would you like to generate?</p>
          </div>
          <div className="example">
            <p>For example:</p>
            <text>
              a giraffe wearing sunglasses, or ancient ruins underwater
            </text>
          </div>
        </div>

        <div className="container-wrapper">
          <div className="dropdowns">
            <div className="dropdown-section">
              <label htmlFor="num-pictures">Number of pictures</label>
              <div className="dropdown-btn-section" id="num-pictures">
                {[1, 2, 3].map((num, index) => (
                  <button
                    key={index}
                    onClick={() => setNumPictures(num)}
                    className={numPictures === num ? 'active' : ''}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            <div className="dropdown-section">
              <label htmlFor="picture-size">Size of pictures</label>
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
              <label htmlFor="picture-style">Style of pictures</label>
              <select
                value={pictureStyle}
                onChange={(e) => setPictureStyle(e.target.value)}
                className="dropdown"
                id="picture-style"
              >
                {[
                  'Realistic',
                  'Abstract',
                  'Anime',
                  'Oil Painting',
                  'Cinematic',
                  'Digital Art',
                  'Cyberpank',
                  'Line Art',
                  'Photographic',
                  'Ad Poster',
                  '3D',
                ].map((style, index) => (
                  <option key={index} value={style}>
                    {style}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <form className="gen-form">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Describe the image you would like to generate here..."
              autoComplete="off"
              id="user-prompt"
              style={{
                resize: 'vertical',
                overflow: 'hidden',
                maxHeight: '81px',
              }}
            />
            <button
              onClick={handleGenerateClick}
              className="btn submit-btn"
              id="generate"
            >
              <img src="images/paper-plane.svg" alt="paper plane icon" />
            </button>
          </form>
        </div>

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
        <ImageModal
          imageUrl={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}

      {feedbackPopup && <FeedbackModal onClose={handleCloseFeedbackPopup} />}
    </>
  )
}

export default Container
