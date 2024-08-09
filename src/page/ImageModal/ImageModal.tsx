import React from 'react'

import './ImageModal.css'

type ImageModalProps = {
  imageUrl: string
  onClose: () => void
}

const ImageModal: React.FC<ImageModalProps> = ({ imageUrl, onClose }) => {
  const handleDownloadClick = () => {
    if (imageUrl) {
      const link = document.createElement('a')
      link.href = imageUrl
      link.download = `image-${new Date().getTime()}.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <img
          src={imageUrl}
          alt="enlarged selected image"
          className="modal-image"
        />
        <button className="btn download-btn" onClick={handleDownloadClick}>
          <img src="images/download.svg" alt="download icon" />
        </button>
        <button className="modal-close" onClick={onClose}>
          <img src="images/close.svg" alt="close icon" />
        </button>
      </div>
    </div>
  )
}

export default ImageModal
