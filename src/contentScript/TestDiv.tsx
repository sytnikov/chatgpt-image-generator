import { Box } from '@mui/material'
import React from 'react'

const TestDiv = () => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 5,
        left: 70,
        width: 80,
        height: 80,
        border: 4,
        zIndex: 9999999,
      }}
    >
      This is a test div
    </Box>
  )
}

export default TestDiv
