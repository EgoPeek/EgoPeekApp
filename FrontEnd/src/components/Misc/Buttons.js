/* 
    filename: Buttons.js
    description: contains buttons that are reused throughout the application
*/

import React from 'react'
import { green, blue } from '@material-ui/core/colors'
import { Button, Menu, MenuItem, withStyles, Fade, alpha } from '@material-ui/core'


export const GreenButton = withStyles(({marginTop})=>({
    root: {
        borderColor:green[400]
        ,'&:hover': {
            backgroundColor: green[500],
        },
        color:'white'
    }
}))(Button)

export const BlueButton = withStyles({
    root: {
        backgroundColor: blue[400],
        '&:hover': {
            backgroundColor: blue[500]
        }
    }
})(Button)

