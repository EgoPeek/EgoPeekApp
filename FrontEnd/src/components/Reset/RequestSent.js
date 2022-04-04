/*
FileName: RequestSent.js
Description: Informational page after email sent for password reset. Buttons for navigation.
*/

import './RequestSent.css'
import { useEffect, useState } from 'react'
import { FormControl, Alert } from '@mui/material'
import { GreenButton } from '../Misc/Input/Buttons'
import { makeStyles } from '@mui/styles'
import TitleAndLogo from '../Misc/CustomComponents/TitleAndLogo'
import { useNavigate } from 'react-router'

const useStyles = makeStyles({
    fields: {
        marginTop: '15px'
    }
})

// main request sent component
const RequestSent = () => {
    // continuing the hacky color stuff bc I don't know any better
    useEffect(() => {
        document.body.style.backgroundColor = 'rgb(2,0,36)'
        document.body.style.background = 'linear-gradient(42deg, rgba(2,0,36,1) 0%, rgba(19,16,39,1) 51%, rgba(33,28,65,1) 100%)'
        return () => {
            document.body.style.background = "#171621"
        }
    }, [])
    const classes = useStyles()

    // hooks to keep track of request sent data
    const [username, setUsername] = useState('Username')
    const [email, setEmail] = useState('Email')
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    // custom nav hook
    const navigate = useNavigate()

    useEffect(() => {
        setUsername(window.localStorage.getItem('username'))
        setEmail(window.localStorage.getItem('email'))
    }, [])

    // send user back to password reset email request page
    const handleRetryRequest = async() => {
        navigate("/reset/email")
    }

    // user verifies they have reset code, send to update password page
    const handleProceedRequest = async() => {
        navigate("/reset/password")
    }

    return (
        <div className='RequestSent'>
            <div>
                <TitleAndLogo />

                <form className='form'>
                    <FormControl className='form-control'>
                        <h2 style={{ textAlign: 'center' }}>Reset Email Sent</h2>
                        {error && <Alert className='alert-banner' onClose={() => { setError(false) }} severity='error'>{errorMessage}</Alert>}

                        {/* I can't wait for Steve to see this div */}
                        <div className = 'text-box'>
                            <p style={{ textAlign: 'center', 'marginBottom': '40px' }}>
                                A password reset email for {username} has been sent to {email}.<br />
                                Please make note of the reset code provided, and click the button below to proceed with resetting your password.<br />
                                If you don't see an email, check your junk folder or retry using the button below.
                            </p>
                        </div>
                        <GreenButton className={classes.fields} variant="outlined" onClick={handleRetryRequest}>Retry Request</GreenButton>
                        <GreenButton className={classes.fields} variant="outlined" onClick={handleProceedRequest}>I have my code</GreenButton>
                    </FormControl>
                </form>
            </div>
        </div>
    );
}

export default RequestSent;