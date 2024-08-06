import React, { useEffect, useState } from 'react'

import { ImageModelData, fetchImageModelData } from '../../utils/api'

export type ImageTileProps = {
  input: string
}

const ImageTile: React.FC<ImageTileProps> = ({ input }) => {
  const [imageData, setImageData] = useState<ImageModelData | null>(null)

  useEffect(() => {
    fetchImageModelData(input)
      .then((data) => setImageData(data))
      .catch((err) => console.log('👀 error: ', err))
  }, [input])

  if (!imageData) {
    return <div>Loading...</div>
  }

  const base64String = imageData.artifacts[0].base64
  const imageUrl = `data:image/png;base64,${base64String}`

  return (
    <div>
      <img src={imageUrl} alt="generated image" />
    </div>
  )
}

export default ImageTile
