/* 
    filename: Buttons.js
    description: custom textfield for log in screen
*/

import { TextField, makeStyles } from '@material-ui/core'
import { green, blue } from '@material-ui/core/colors'

const letStyles = makeStyles({
    txt: {
        '& input:valid + fieldset': {
            borderColor: 'white',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'white',
        },
        '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
                borderColor: 'white',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'white',
            }
        },
        '& .MuiFormLabel-root': {
            color: 'grey'
        },
        '& .MuiInputBase-root': {
            color: 'white'
        },
        '& .MuiFormLabel-root.Mui-focused': {
            color: 'white',
        },
        '& :hover': {
            borderColor: "blue"
        },
        backgroundColor: '#171621'

    }
})

export const TextInputStandard = (props) => {
    const classes = letStyles()

    return <TextField className={classes.txt}
        margin={props.margin}
        label={props.label}
        variant={props.variant}
        size={props.size}
        type={props.type}
        required
        onChange={props.onChange}
        />
}