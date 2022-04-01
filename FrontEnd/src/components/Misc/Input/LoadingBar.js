import { styled } from '@mui/system';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { deepPurple, green, lightGreen, purple } from '@mui/material/colors';

const BorderLinearProgress = styled(LinearProgress)(() => ({
    height: 5,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: green[900],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: green[400],
    },
}));

export default BorderLinearProgress