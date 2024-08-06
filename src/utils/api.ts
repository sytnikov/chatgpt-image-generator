export interface ImageArtifact {
  base64: string
  seed: number
  finishReason: string
}

export interface ImageModelData {
  artifacts: ImageArtifact[]
}

export async function fetchImageModelData(
  input: string
): Promise<ImageModelData> {
  const randomNum = getRandomNum(1, 1000)
  const prompt = `${input} ${randomNum}`

  try {
    const response = await fetch(
      'https://image-generator-proxy-server.vercel.app/stability-model',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      }
    )

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data: ImageModelData = await response.json()

    const base64String = data.artifacts[0].base64
    const imageUrl = `data:image/png;base64,${base64String}`

    return data
  } catch (error) {
    console.log('Error generating image:', error)
    alert('Unable to generate an image...')
  }
}

function getRandomNum(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
