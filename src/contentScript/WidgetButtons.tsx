import React, { useCallback } from 'react'

import { Button, IconButton } from '@mui/material'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import ImageIcon from '@mui/icons-material/Image'

const CROSS_BGCOLOR = 'rgba(0, 0, 0, .4)'
export const MINIMIZED_CN = 'minimized-arrow'
export const LEFT_EDGE_CLASS_NAME = 'left-edge'
export const RIGHT_EDGE_CLASS_NAME = 'right-edge'

type Props = {
  onLogoClick: () => void
  isLeft: boolean
  hovered: boolean
  minimized: boolean
  handleSetMinimized: (value: boolean) => void
}

function WidgetButtons({
  onLogoClick,
  isLeft,
  hovered,
  minimized,
  handleSetMinimized,
}: Props) {
  const handleMinimizeWidget = useCallback(
    () => handleSetMinimized(true),
    [handleSetMinimized]
  )
  const handleOpenWidget = useCallback(
    () => handleSetMinimized(false),
    [handleSetMinimized]
  )

  const crossBtnBackground = hovered ? CROSS_BGCOLOR : ''

  return !minimized ? (
    <>
      <Button
        onClick={onLogoClick}
        sx={{
          position: 'relative',
          maxWidth: '32px',
          minWidth: '24px',
          height: '24px',
          padding: '0',
          paddingLeft: `${isLeft ? '-3px' : '0'}`,
        }}
      >
        <ImageIcon sx={{ color: 'black' }} />
      </Button>
      <IconButton
        onClick={handleMinimizeWidget}
        className={`cross-btn ${
          isLeft ? LEFT_EDGE_CLASS_NAME : RIGHT_EDGE_CLASS_NAME
        }`}
        size="small"
        sx={{
          color: hovered ? 'white' : 'transparent',
          maxHeight: '20px',
          maxWidth: '20px',
          position: 'absolute',
          top: 0,
          left: 0,
          marginTop: '-10px',
          marginLeft: `${isLeft ? '20px' : '-10px'}`,
          '&:hover': {
            color: 'white',
            bgcolor: CROSS_BGCOLOR,
          },
          background: crossBtnBackground,
        }}
      >
        <CloseOutlinedIcon fontSize="small" />
      </IconButton>
    </>
  ) : (
    <Button
      className={MINIMIZED_CN}
      onClick={handleOpenWidget}
      sx={{
        color: '#00000',
        transform: isLeft ? '' : 'rotate(180deg)',
        position: 'relative',
        maxWidth: '6px',
        minWidth: '6px',
        height: '32px',
        padding: '0',
      }}
    >
      <ArrowRightIcon sx={{ color: 'black' }} />
    </Button>
  )
}

export default WidgetButtons
