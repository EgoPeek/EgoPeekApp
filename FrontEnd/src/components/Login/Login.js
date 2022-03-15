/*
FileName: Login.js
Description: Login screen for user to input username and password
*/

import './Login.css'
import { useEffect, useState } from 'react'
import { FormControl, Alert } from '@mui/material'
import { GreenButton } from '../Misc/Input/Buttons'
import { makeStyles } from '@mui/styles'
import { TextInputStandard } from '../Misc/Input/TextFields'
import TitleAndLogo from '../Misc/CustomComponents/TitleAndLogo'
import { useNavigate } from 'react-router'
import useAuth from '../../hooks/useAuth'

const useStyles = makeStyles({
    fields: {
        marginTop: '15px'
    }
})

//main Login Component
const Login = () => {
    //this is kind of hacky but oh well, it literally just changes the background color
    useEffect(() => {
        document.body.style.backgroundColor = 'rgb(2,0,36)'
        document.body.style.background = 'linear-gradient(42deg, rgba(2,0,36,1) 0%, rgba(19,16,39,1) 51%, rgba(33,28,65,1) 100%)'
        return () => {
            document.body.style.background = "#171621"
        }
    }, [])
    const classes = useStyles()

    //hooks to keep track of userName and password
    const [email, setEmail] = useState('UserName or Email')
    const [password, setPassword] = useState('Password')
    const [error, setError] = useState(false)
    const [errorMessage, seterrorMessage] = useState('')

    //custom hooks
    const navigate = useNavigate()
    const auth = useAuth()

    const handleLogin = async () => {
        //if a sucess is read it stores users credentials within local storage and redirects them
        const jsonRes = await auth.login(email,password);
        if (jsonRes.success) {
            navigate('/home', { replace: true })
        } else {
            console.log(jsonRes.reason)
            seterrorMessage('Invalid username or password')
            setError(true)
        }
    }


    return (
        <div className='Login'>
            <div>
                <TitleAndLogo />

                <form className='form'>
                    <FormControl className='form-control'>
                        <h2 style={{ textAlign: 'center', 'marginBottom': '40px' }}>Log In</h2>
                        {error && <Alert className='alert-banner' onClose={() => { setError(false) }} severity='error'>{errorMessage}</Alert>}

                        {/* pulls in custom LogInTextInput component cause react is stupid
                        and I had to to a bunch of nonsense to customize the css */}
                        <TextInputStandard
                            onChange={(props) => {
                                setEmail(props.target.value)
                            }}
                            label="Username or Email"
                            variant="outlined"
                            size='small'
                            autoComplete='off'
                            required
                        />
                        <TextInputStandard className={classes.TextField}
                            onChange={(props) => {
                                setPassword(props.target.value)
                            }}
                            margin="normal"
                            label="Password"
                            variant="outlined"
                            size='small'
                            type='password'
                            required
                        />
                        <GreenButton className={classes.fields} variant="outlined" onClick={handleLogin}>Submit</GreenButton>
                    </FormControl>
                </form>
            </div>
        </div>
    );
}

export default Login;