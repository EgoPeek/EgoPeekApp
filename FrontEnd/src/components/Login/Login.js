/*
FileName: Login.js
Description: Login screen for user to input username and password
*/

import './Login.css'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { TextField, FormControl, makeStyles } from '@material-ui/core'
import { GreenButton } from '../Misc/Buttons'
import { LogInTextInput } from '../Misc/TextFields'

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


    return (
        <div className='Login'>
            <div>
                <div className="title-and-logo">
                    <Link to='/' className='company-title'> <h2>EgoPeek</h2> </Link>
                    <p>logo</p>
                </div>

                <div className='form'>
                    <FormControl>
                        <h2 style={{ textAlign: 'center' }}>Log In</h2>
                        <LogInTextInput
                            label="Username or Email"
                            variant="outlined"
                            size='small'
                            autoComplete='off'
                            required
                        />
                        <LogInTextInput className={classes.TextField}
                            margin="normal"
                            label="Password"
                            variant="outlined"
                            size='small'
                            type='password'
                            required
                        />
                        <GreenButton className={classes.fields} variant="outlined">Submit</GreenButton>
                    </FormControl>
                </div>
            </div>
        </div>
    );
}

export default Login;