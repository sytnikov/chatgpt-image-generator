import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { Box } from '@mui/material'

import Widget, {
  WidgetPosition,
  getMaxDefaultX,
  widgetWidth,
  zIndexMaxValue,
  POSITION_KEY,
  MINIMIZED_KEY,
} from './Widget'
import { storageGet } from '../utils/storage'

const defaultX: number = document?.documentElement?.clientWidth
  ? document.documentElement.clientWidth - widgetWidth
  : 0

const defaultY: number = Math.round(
  (document?.documentElement?.clientHeight || 600) / 2
)

const getDefaultX = (minimized: any, x: any) => {
  const maxX: number = getMaxDefaultX(minimized)
  return x > maxX ? maxX : x
}

const WidgetWrapper = () => {
  const [defaultPosition, setDefaultPosition] = useState<WidgetPosition>()
  const [isMinimized, setIsMinimized] = useState<boolean>(false)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  useEffect(() => {
    storageGet(POSITION_KEY, (storedData: string = '{}') => {
      const parsedObj = JSON.parse(storedData)

      storageGet(MINIMIZED_KEY, (isMin: string = 'false') => {
        const parsed = JSON.parse(isMin)
        const isMinimizedValue = typeof parsed === 'boolean' ? parsed : false
        setIsMinimized(isMinimizedValue)

        const positionValue =
          parsedObj?.x >= 0 && parsedObj?.y
            ? { ...parsedObj, x: getDefaultX(isMinimizedValue, parsedObj.x) }
            : { x: defaultX, y: defaultY }
        setDefaultPosition(positionValue)
      })
    })
  }, [])
  // Handle modal open and close logic here
  const handleModalOpen = () => {
    console.log('Modal Opened')
    // Logic to handle modal open
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        zIndex: zIndexMaxValue - 1,
        left: 0,
        top: 0,
      }}
    >
      {defaultPosition && isMinimized != null && (
        <Widget
          defaultPosition={defaultPosition}
          isMinimizedDefault={isMinimized}
          handleModalOpen={handleModalOpen}
        />
      )}
    </Box>
  )
}

const root = document.createElement('div')
document.body.appendChild(root)
const reactRoot = ReactDOM.createRoot(root)
reactRoot.render(<WidgetWrapper />)
