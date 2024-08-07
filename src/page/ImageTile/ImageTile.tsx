import React, { useEffect, useState } from 'react'

import { ImageModelData, fetchImageModelData } from '../../utils/api'

export type ImageTileProps = {
  input: string
  onClick: (imageUrl: string) => void
  size: string
  style: string
}

const ImageTile: React.FC<ImageTileProps> = ({
  input,
  onClick,
  size,
  style,
}) => {
  const [imageData, setImageData] = useState<ImageModelData | null>(null)

  useEffect(() => {
    fetchImageModelData(input, size, style)
      .then((data) => setImageData(data))
      .catch((err) =>
        console.log(
          '👀 Error in fetching an ImageTile (in the component): ',
          err
        )
      )
  }, [input])

  if (!imageData) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    )
  }

  const base64String = imageData.artifacts[0].base64
  const imageUrl = `data:image/png;base64,${base64String}`

  return (
    <div onClick={() => onClick(imageUrl)}>
      <img src={imageUrl} alt="generated image" />
    </div>
  )
}

export default ImageTile
