/* 
    filename: Buttons.js
    description: contains buttons that are reused throughout the application
*/

import React from 'react'
import { deepPurple, green, purple } from '@mui/material/colors'
import { Button, IconButton } from '@mui/material'
import { styled } from '@mui/material/styles'

export const GreenButton = styled(Button)(() => ({
    color: green[200],
    borderColor: green[400],
    ':hover': {
        backgroundColor: green[500],
        borderColor: green[300]
    }
}))
export const GreenIconButton = styled(IconButton)(() => ({
    color: green[200],
    borderColor: green[600],
    ':hover': {
        backgroundColor: green[500],
        borderColor: green[300]
    },
    ":disabled": {
        color: green[900],

    }
}))

export const PurpleIconButton = styled(IconButton)(() => ({
    color: deepPurple[400],
    borderColor: purple[600],
    ':hover': {
        backgroundColor: deepPurple[700],
        borderColor: purple[300]
    },
    ":disabled": {
        color: deepPurple[900],

    }
}))

export const PurpleButton = styled(Button)(() => ({
    color: 'white',
    borderColor: purple[600],
    backgroundColor: deepPurple[500],
    borderRadius:'50px',
    ':hover': {
        backgroundColor: deepPurple[700],
        borderColor: purple[300]
    },
    ":disabled": {
        color: deepPurple[900],

    }
}))