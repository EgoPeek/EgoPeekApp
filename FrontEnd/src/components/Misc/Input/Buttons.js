/* 
    filename: Buttons.js
    description: contains buttons that are reused throughout the application
*/

import React from 'react'
import { green } from '@mui/material/colors'
import { Button } from '@mui/material'
import { styled } from '@mui/material/styles'

export const GreenButton = styled(Button)(()=>({
    color:green[200],
    borderColor: green[400],
    ':hover':{
        backgroundColor:green[500],
        borderColor: green[300]
    }
}))

