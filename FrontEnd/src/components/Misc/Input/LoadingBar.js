import { styled } from '@mui/system';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { deepPurple, green, lightGreen, purple } from '@mui/material/colors';

const BorderLinearProgress = styled(LinearProgress)(() => ({
    height: 5,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: 'rgb(42, 27, 65)',
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: 'rgb(51, 29, 91)',
    },
}));

export default BorderLinearProgress