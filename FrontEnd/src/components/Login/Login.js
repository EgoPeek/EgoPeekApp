/*
FileName: Login.js
Description: Login screen for user to input username and password
*/

import './Login.css'
import { useEffect,useState } from 'react'
import { FormControl } from '@mui/material'
import { GreenButton } from '../Misc/Input/Buttons'
import { makeStyles} from '@mui/styles'
import { TextInputStandard } from '../Misc/Input/TextFields'
import TitleAndLogo from '../Misc/CustomComponents/TitleAndLogo'
import { useNavigate } from 'react-router'

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

    const navigate = useNavigate()

    const checkForValidEmail = async()=>{
        //ping api endpoint
        const data = {
            username:email,
            password:password
        }

        //verifys user input correct details for login
        const response = await fetch('/api/v1/login',{
            method:'POST',
            credentials:'include',
            headers:{
                'Content-Type' : 'application/json',
                'Accept': 'application/json'
            },
            body:JSON.stringify(data)
        })

        //converts it to json
        const jsonRes = await response.json();
        //if a sucess is read it stores users credentials within local storage and redirects them
        if(jsonRes.success){
            window.localStorage.setItem('auth',true)
            navigate('/home',{replace:true})
        }else{
            console.log(jsonRes.reason)
            seterrorMessage('Invalid username or password')
        }
    }


    return (
        <div className='Login'>
            <div>
                <TitleAndLogo />

                <div className='form'>
                    <FormControl>
                        <h2 style={{ textAlign: 'center' }}>Log In</h2>
                        {/* pulls in custom LogInTextInput component cause react is stupid
                        and I had to to a bunch of nonsense to customize the css */}
                        <TextInputStandard
                            onChange = {(props)=>{
                                setEmail(props.target.value)
                            }}
                            label="Username or Email"
                            variant="outlined"
                            size='small'
                            autoComplete='off'
                            required
                        />
                        <TextInputStandard className={classes.TextField}
                            onChange ={(props)=>{
                                setPassword(props.target.value)
                            }}
                            margin="normal"
                            label="Password"
                            variant="outlined"
                            size='small'
                            type='password'
                            required
                        />
                        <GreenButton className={classes.fields} variant="outlined" onClick={checkForValidEmail}>Submit</GreenButton>
                    </FormControl>
                </div>
            </div>
        </div>
    );
}

export default Login;