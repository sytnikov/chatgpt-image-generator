import React, { useEffect, useState } from 'react'

import { ImageModelData, fetchImageModelData } from '../../utils/api'

export type ImageTileProps = {
  input: string
  onClick: (imageUrl: string) => void
}

const ImageTile: React.FC<ImageTileProps> = ({ input, onClick }) => {
  const [imageData, setImageData] = useState<ImageModelData | null>(null)

  useEffect(() => {
    fetchImageModelData(input)
      .then((data) => setImageData(data))
      .catch((err) =>
        console.log(
          '👀 Error in fetching an ImageTile (in the component): ',
          err
        )
      )
  }, [input])

  if (!imageData) {
    return <div>Loading...</div>
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
