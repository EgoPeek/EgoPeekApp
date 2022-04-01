import { CircularProgress } from "@mui/material";
import {green} from "@mui/material/colors";
import { styled } from "@mui/system";


export const GreenCircle = styled(CircularProgress)(() => ({
    color:green[400],
}))