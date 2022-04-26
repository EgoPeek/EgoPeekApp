/*
FileName: ResetPassword.js
Description: Reset password request screen
*/

import '../Login/Login.css'

import { useEffect, useState } from 'react'
import { FormControl, Alert } from '@mui/material'
import { GreenButton } from '../Misc/Input/Buttons'
import { makeStyles } from '@mui/styles'
import { TextInputStandard } from '../Misc/Input/TextFields'
import TitleAndLogo from '../Misc/CustomComponents/TitleAndLogo'
import { useNavigate } from 'react-router'
import axios from "axios";

const useStyles = makeStyles({
    fields: {
        marginTop: '15px'
    }
})

// main password reset request component
const ResetPassword = () => {
    // continuing the hacky color stuff bc I don't know any better
    useEffect(() => {
        document.body.style.backgroundColor = 'rgb(2,0,36)'
        document.body.style.background = 'linear-gradient(42deg, rgba(2,0,36,1) 0%, rgba(19,16,39,1) 51%, rgba(33,28,65,1) 100%)'
        return () => {
            document.body.style.background = "#171621"
        }
    }, [])
    const classes = useStyles()

    // hooks to keep track of reset data
    const [newPassword, setNewPassword] = useState('NewPassword')
    const [username, setUsername] = useState('Username')
    const [resetCode, setResetCode] = useState('ResetCode')
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    // custom nav hook
    const navigate = useNavigate()

    const handleRequest = async() => {
        const updateResponse = await updatePassword();
        if (updateResponse.success) {
            navigate('/login')
        } else {
            setErrorMessage('Invalid credentials provided, please try again.')
            setError(true)
        }
    }

    const updatePassword = async () => {
        const payload = {
          new_password: newPassword,
          reset_token: resetCode
        };
        try {
          const response = await axios.put(`/api/v1/users/passwords/${username}`, payload);
          return response.data;
        } catch (e) {
          console.log(e);
          return e;
        }
      };

    return (
        <div className='login-style'>
            <div className='login-container'>
                <TitleAndLogo />

                <form className='form'>
                    <FormControl className='form-control'>
                        <h2 style={{ textAlign: 'center', 'marginBottom': '40px' }}>Set New Password</h2>
                        {error && <Alert className='alert-banner' onClose={() => { setError(false) }} severity='error'>{errorMessage}</Alert>}

                        {/* pulls in custom LogInTextInput component for consistency with Login page */}
                        <TextInputStandard
                            onChange={(props) => {
                                setUsername(props.target.value)
                            }}
                            label="Username"
                            variant="outlined"
                            size='small'
                            autoComplete='off'
                            required
                        />
                        <TextInputStandard className={classes.TextField}
                            onChange={(props) => {
                                setNewPassword(props.target.value)
                            }}
                            margin="normal"
                            label="New Password"
                            variant="outlined"
                            size='small'
                            type='password'
                            required
                        />
                        <TextInputStandard className={classes.TextField}
                            onChange={(props) => {
                                setResetCode(props.target.value)
                            }}
                            margin="normal"
                            label="Reset Code"
                            variant="outlined"
                            size='small'
                            type='password'
                            required
                        />
                        <GreenButton className={classes.fields} variant="outlined" onClick={handleRequest}>Submit</GreenButton>
                    </FormControl>
                </form>
            </div>
        </div>
    );
}

export default ResetPassword;