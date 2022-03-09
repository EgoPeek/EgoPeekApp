/* 
    filename: Buttons.js
    description: custom textfield for log in screen
*/

import { TextField } from '@mui/material'
import { styled } from '@mui/material/styles'
import { green } from '@mui/material/colors'

//updated version of using mui styles
export const TextInputStandard = styled(TextField)(() => ({
    backgroundColor: '#171621',
    color:'white',
    'fieldset':'white',
    'label':{
        color:'grey'
    },
    '& label.Mui-focused': {
        color: 'white',
    },

    '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'grey',
        },
        '&:hover fieldset': {
          borderColor: green[400],
        },
        '&.Mui-focused fieldset': {
            borderColor: green[400],
        },
        'input':{
            color:'white'
        }
      },

}))
