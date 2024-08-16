import React, { useCallback } from 'react'

import { Button, IconButton, Stack } from '@mui/material'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'

import Logo from '../static/images/logo-widget.svg';

const CROSS_BGCOLOR = 'rgba(0, 0, 0, .4)'
export const MINIMIZED_CN = 'minimized-arrow'
export const LEFT_EDGE_CLASS_NAME = 'left-edge'
export const RIGHT_EDGE_CLASS_NAME = 'right-edge'

type Props = {
  onLogoClick: () => void,
  isLeft: boolean,
  hovered: boolean,
  minimized: boolean,
  handleSetMinimized: (value: boolean) => void
}

function WidgetButtons({ onLogoClick, isLeft, hovered, minimized, handleSetMinimized }: Props) {
  const handleMinimizeWidget = useCallback(() => handleSetMinimized(true), [handleSetMinimized])
  const handleOpenWidget = useCallback(() => handleSetMinimized(false), [handleSetMinimized])

  const crossBtnBackground = hovered ? CROSS_BGCOLOR : ''

  const imageUrl = new URL(`${Logo}#id`, import.meta.url)

  return (
    !minimized
      ? (
        <>
          <Button
            onClick={onLogoClick}
            sx={{
              position: 'relative',
              maxWidth: '32px',
              minWidth: '24px',
              padding: '0',
              marginLeft: `${isLeft ? '-3px' : '0'}`,
            }}
          >
            <Stack color={'white'}>
              <img alt="logo" src={imageUrl.href} style={{ pointerEvents: 'none' }} width={'32px'} height={'32px'} />
            </Stack>
          </Button>
          <IconButton
            onClick={handleMinimizeWidget}
            className={`cross-btn ${isLeft ? LEFT_EDGE_CLASS_NAME : RIGHT_EDGE_CLASS_NAME}`}
            size="small"
            sx={{
              color: hovered ? 'white' : 'transparent',
              maxHeight: '20px',
              maxWidth: '20px',
              position: 'absolute',
              top: 0,
              left: 0,
              marginTop: '-10px',
              marginLeft: `${isLeft ? '32px' : '-10px'}`,
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
      )
      : (
        <Button
          className={MINIMIZED_CN}
          onClick={handleOpenWidget}
          sx={{
            color: '#10a37f',
            transform: isLeft ? '' : 'rotate(180deg)',
            position: 'relative',
            maxWidth: '6px',
            minWidth: '6px',
            height: '32px',
            padding: '0',
          }}
        >
          <ArrowRightIcon />
        </Button>
      )
  )
}

export default WidgetButtons
