import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { SxProps } from '@mui/system/styleFunctionSx'
import { DebouncedFunc } from 'lodash'
import debounce from 'lodash/debounce'
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable'
import { Box } from '@mui/material'

import * as storage from '../utils/storage'
import WidgetButtons, {
  MINIMIZED_CN,
  LEFT_EDGE_CLASS_NAME,
  RIGHT_EDGE_CLASS_NAME,
} from './WidgetButtons'
import { MINIMIZED_KEY, POSITION_KEY } from '../utils/constants'

export const zIndexMaxValue = 2147483647
export const widgetWidth = 32

const HIDE_TIMEOUT = 6000
const DEBOUNCE_TIMEOUT = 200
const minimizedWidgetWidth = 12
const widgetHeight = 30

export const getMaxDefaultX = (minimized: boolean) =>
  document?.documentElement?.clientWidth
    ? document.documentElement.clientWidth -
      (minimized ? minimizedWidgetWidth : widgetWidth)
    : 0

const getTimeout = () =>
  document.fullscreenElement ? HIDE_TIMEOUT / 3 : HIDE_TIMEOUT

const widgetBoxSX: SxProps = {
  position: 'absolute',
  transition: 'opacity 500ms ease-in-out, background 500ms ease-in-out',
  zIndex: zIndexMaxValue - 1,
  justifyContent: 'center',
  width: 'auto',
  maxWidth: '50px',
  padding: '3px',
  display: 'flex',
  alignItems: 'center',
  borderRadius: '4px',
  border: 'none',
  background: 'rgba(114, 79, 223, 0.5)',
  '&:hover': {
    background: 'rgba(207, 139, 246, 0.7)',
  },
}

export type WidgetPosition = {
  x: number
  y: number
}

type WidgetProps = {
  defaultPosition: WidgetPosition
  isMinimizedDefault: boolean
  handleModalOpen: () => void
}

const Widget = ({
  defaultPosition,
  isMinimizedDefault,
  handleModalOpen,
}: WidgetProps) => {
  const [position, setPosition] = useState<WidgetPosition>({
    x: defaultPosition.x,
    y: defaultPosition.y,
  })
  const [isLeftEdge, setIsLeftEdge] = useState<boolean>(defaultPosition.x === 0)
  const [isHovered, setIsHovered] = useState<boolean>(false)
  const [isMinimized, setIsMinimized] = useState<boolean>(isMinimizedDefault)
  const [isDragged, setIsDragged] = useState<boolean>(true)
  const [isVisible, setIsVisible] = useState<boolean>(true)

  const draggableRef = useRef(null)

  const calcPosition = useCallback(
    (positionData: WidgetPosition, isWidgetMinimized: boolean) => {
      const isLeft: boolean =
        positionData.x < document.documentElement.clientWidth / 2
      const absoluteY: number = positionData.y
      const newX: number = isLeft ? 0 : getMaxDefaultX(isWidgetMinimized)
      const maxY: number =
        document.documentElement.clientHeight - 2 * widgetHeight
      const newY: number = absoluteY > maxY ? maxY : absoluteY
      return { position: { x: newX, y: newY }, isLeft }
    },
    []
  )

  const resetPosition = useCallback(
    (newPosition: WidgetPosition, newIsMinimized: boolean) => {
      const {
        position,
        isLeft,
      }: {
        position: WidgetPosition
        isLeft: boolean
      } = calcPosition(newPosition, newIsMinimized)
      setPosition(position)
      setIsLeftEdge(isLeft)

      return [position, isLeft]
    },
    [calcPosition]
  )

  useEffect(() => {
    resetPosition(position, isMinimized)
  }, [])

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    const onMouseMove = () => {
      clearTimeout(timer)
      timer = setTimeout(() => setIsVisible(false), getTimeout())
    }

    let debouncedMouseMove: DebouncedFunc<any>
    const handleMouseMove = () => {
      setIsVisible(true)

      if (debouncedMouseMove?.cancel) {
        debouncedMouseMove?.cancel()
      }

      debouncedMouseMove = debounce(onMouseMove, DEBOUNCE_TIMEOUT)
      debouncedMouseMove()
    }
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseover', handleMouseMove)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseMove)
    }
  }, [])

  useEffect(() => {
    const handleResetPosition = () => resetPosition(position, isMinimized)
    window.addEventListener('resize', handleResetPosition)

    const handleFullScreenChange = () => {
      handleResetPosition()
      if (document.fullscreenElement) {
        setIsVisible(false)
      }
    }
    document.addEventListener('fullscreenchange', handleFullScreenChange)

    return () => {
      window.removeEventListener('resize', handleResetPosition)
      document.removeEventListener('fullscreenchange', handleFullScreenChange)
    }
  }, [isMinimized, position, resetPosition])

  const handleStop = useCallback(
    (_: DraggableEvent, data: DraggableData) => {
      const { x, y }: { x: number; y: number } = position
      const isDelta = Math.abs(data.x - x) > 1 || Math.abs(data.y - y) > 1
      setIsDragged(isDelta)

      if (!isDelta) {
        return
      }

      const [newPos] = resetPosition(data, isMinimized)
      storage.storageSet(POSITION_KEY, JSON.stringify(newPos))
    },
    [isMinimized, position, resetPosition]
  )

  const handleOnWidgetClick = useCallback(() => {
    if (isDragged) {
      setIsDragged(false)
      return
    }

    handleModalOpen()
  }, [handleModalOpen, isDragged])

  const handleSetMinimized = useCallback(
    (value: boolean) => {
      setIsMinimized(value)
      storage.storageSet(MINIMIZED_KEY, value)
      const [newPos] = resetPosition(position, value)
      storage.storageSet(POSITION_KEY, JSON.stringify(newPos))
    },
    [resetPosition, position]
  )

  const handleOnMouseLeave = useCallback(() => setIsHovered(false), [])
  const handleOnMouseEnter = useCallback(() => setIsHovered(true), [])

  const widgetBoxCN = useMemo(
    () =>
      `widget ${isVisible ? '' : 'hidden'} ${
        isLeftEdge ? LEFT_EDGE_CLASS_NAME : RIGHT_EDGE_CLASS_NAME
      }`,
    [isLeftEdge, isVisible]
  )

  const widgetSX = useMemo(() => {
    let styles = { ...widgetBoxSX }

    if (!isVisible) {
      styles = {
        ...styles,
        opacity: 0,
      }
    }
    return { ...styles }
  }, [isVisible])

  return (
    <Draggable
      position={position}
      onStop={handleStop}
      enableUserSelectHack
      nodeRef={draggableRef}
      cancel={`.${MINIMIZED_CN}`}
    >
      <Box
        ref={draggableRef}
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
        className={widgetBoxCN}
        sx={widgetSX}
      >
        <WidgetButtons
          isLeft={isLeftEdge}
          hovered={isHovered}
          minimized={isMinimized}
          handleSetMinimized={handleSetMinimized}
          onLogoClick={handleOnWidgetClick}
        />
      </Box>
    </Draggable>
  )
}

export default Widget
