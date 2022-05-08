import { Switch } from '@mui/material'
import { deepPurple } from '@mui/material/colors'
import { styled } from "@mui/material/styles";

export const PurpleSwitch = styled(Switch)(() => ({
    '& .MuiSwitch-switchBase': {
        '&.Mui-checked': {
            '& + .MuiSwitch-track': {
                backgroundColor: deepPurple[600],
            },
            '& .MuiSwitch-thumb': {

                backgroundColor: deepPurple[400]
            }
        },
    }
}))