/*
FileName: ResetRequest.js
Description: Reset password email request screen
*/

import './ResetRequest.css'
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

// main password reset email request component
const ResetRequest = () => {
    // continuing the hacky color stuff bc I don't know any better
    useEffect(() => {
        document.body.style.backgroundColor = 'rgb(2,0,36)'
        document.body.style.background = 'linear-gradient(42deg, rgba(2,0,36,1) 0%, rgba(19,16,39,1) 51%, rgba(33,28,65,1) 100%)'
        return () => {
            document.body.style.background = "#171621"
        }
    }, [])
    const classes = useStyles()

    // hooks to keep track of email and username
    const [email, setEmail] = useState('Email')
    const [username, setUsername] = useState('Username')
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    // custom nav hook
    const navigate = useNavigate()

    const handleRequest = async() => {
        const emailResponse = await sendEmail();
        if (emailResponse.success) {
            window.localStorage.setItem('username', username)
            window.localStorage.setItem('email', email)
            navigate('/reset/sent')
        } else {
            setErrorMessage('Invalid username or email')
            setError(true)
        }
    }

    const sendEmail = async () => {
        const payload = {
          username: username,
          email: email
        };
        try {
          const response = await axios.post(`/api/v1/emails/reset-password`, payload);
          return response.data;
        } catch (e) {
          console.log(e);
          return e;
        }
      };

    return (
        <div className='ResetRequest'>
            <div>
                <TitleAndLogo />

                <form className='form'>
                    <FormControl className='form-control'>
                        <h2 style={{ textAlign: 'center', 'marginBottom': '40px' }}>Reset Password</h2>
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
                                setEmail(props.target.value)
                            }}
                            margin="normal"
                            label="Email"
                            variant="outlined"
                            size='small'
                            autoComplete='off'
                            required
                        />
                        <GreenButton className={classes.fields} variant="outlined" onClick={handleRequest}>Submit</GreenButton>
                    </FormControl>
                </form>
            </div>
        </div>
    );
}

export default ResetRequest;