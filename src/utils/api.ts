import { getRandomNum } from "./utils"

export interface ImageArtifact {
  base64: string
  seed: number
  finishReason: string
}

export interface ImageModelData {
  artifacts: ImageArtifact[]
}

export async function fetchImageModelData(
  input: string,
  size: string,
  style: string
): Promise<ImageModelData> {
  const randomNum = getRandomNum(1, 1000)
  const prompt = `${input} in the ${style} style ${randomNum}`

  const measurements = size.split('x')
  const width = Number(measurements[0])
  const height = Number(measurements[1])

  try {
    const response = await fetch(
      // 'https://image-generator-proxy-server.vercel.app/stability-model',
      'http://localhost:8000/stability-model',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, width, height }),
      }
    )

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data: ImageModelData = await response.json()

    return data
  } catch (error) {
    console.log('Error generating image:', error)
    alert('Unable to generate an image...')
  }
}
