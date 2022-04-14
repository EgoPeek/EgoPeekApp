/**
 * Filename: Register.js
 * Description: Allows user to register and create an account with egopeek
 */

import React from 'react'
import { useEffect, useState } from 'react'
import "../Misc/CustomComponents/TitleAndLogo"
import "./Register.css"
import TitleAndLogo from '../Misc/CustomComponents/TitleAndLogo'
import InterestPage from './Interests'
import { FormControl } from '@mui/material'
import axios from 'axios'
import useAuth from '../../hooks/useAuth'
import { Alert } from '@mui/material'
import { TextInputStandard } from '../Misc/Input/TextFields'
import { GreenButton } from '../Misc/Input/Buttons'

const Register = () => {
  const [accountCreated, setAccountCreated] = useState(false)

  //this literally just changes the background color, yes its kind of hacky deal with it
  useEffect(() => {
    document.body.style.backgroundColor = 'rgb(2,0,36)'
    document.body.style.background = 'linear-gradient(42deg, rgba(2,0,36,1) 0%, rgba(19,16,39,1) 51%, rgba(33,28,65,1) 100%)'
    document.body.style.backgroundAttachment = 'fixed'
    return () => {
      document.body.style.background = "#171621"
    }
  }, [])



  return (
    <div className="register">
      <div className='register-container'>
        <div>
          {/* whenever an account is succesfully created it will mount the interest page here */}
          <TitleAndLogo />
          {accountCreated ?
            <InterestPage />
            :
            <RegisterForm accountCreated={setAccountCreated} />
          }

        </div>
      </div>
    </div>
  )
}

//register Form in compononent Form
const RegisterForm = ({ accountCreated }) => {
  //hooks to keep track of form data
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secondPassword, setSecondPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [error, setError] = useState(false)
  const auth = useAuth()

  //verifys and creates account with EgoPeek
  const onRegisterSubmit = async () => {
      //checks for valid email, username, and matching passwords
      if (password !== secondPassword || password === '') {
          setError(true)
          setErrorMessage('Password do not match')
          console.log('password do not match')
          return
      } else if (password.length < 6) {
          setError(true)
          setErrorMessage('Password not long enough')
          console.log('password not long enough')
          return
      } else if (userName === '') {
          setError(true)
          setErrorMessage('No username')
          console.log('no username')
          return
      } else if (email === '') {
          setError(true)
          setErrorMessage('No email')
          console.log('no email')
          return
      }


      try {
          // creates a new user and a new user Profile in the DB
          const userRes = await axios.post(`/api/v1/users/`, {
              username: userName,
              email: email,
              password: password
          })

          if (userRes.status === 201) {
              //if successful creation is made, user profile is made
              // await axios.post('api/v1/profiles/', {
              //     user_id: userRes.data.id,
              //     avatar_path: '',
              //     bio: '',
              //     quote: '',
              //     interests: []
              // })

              //flags the parent component a success has been made
              //clears all userInformation for safety purposes
              auth.login(userName, password)
              setUserName('')
              setEmail('')
              setPassword('')
              accountCreated(true)
          }
      } catch (error) {
          console.log(error)
          setError(true)
          setErrorMessage("UserName or Email already exists.")
      }

  }

  return (
      <form className='form-container'>
          {/* inserts an error message as to what text field is missing if any */}
          <h2> Register </h2>
          <div>
              {error && <Alert className='alert-banner' onClose={() => { setError(false) }} severity='error'>{errorMessage}</Alert>}
          </div>
          <FormControl className='button-grouping'>
              <div className='button-spacing'>
                  <TextInputStandard margin='dense' label='User Name' variant='outlined' size="small" onChange={(e) => { setUserName(e.target.value) }} />
                  <TextInputStandard margin='dense' label='Email' variant='outlined' size="small" onChange={(e) => { setEmail(e.target.value) }} />
              </div>
              <div className='button-spacing'>
                  <TextInputStandard margin='dense' type='password' label='Password' variant='outlined' size="small" onChange={(e) => { setPassword(e.target.value) }} />
                  <TextInputStandard margin='dense' type='password' label='Re-Enter Password' variant='outlined' size="small" onChange={(e) => { setSecondPassword(e.target.value) }} />
              </div>
          </FormControl>
          <GreenButton onClick={onRegisterSubmit} className='submit-button' variant='outlined'>Submit</GreenButton>
      </form>
  )
}


export default Register 