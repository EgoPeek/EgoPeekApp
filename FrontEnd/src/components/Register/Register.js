/**
 * Filename: Register.js
 * Description: Allows user to register and create an account with egopeek
 */

import React from 'react'
import { useEffect, useState } from 'react'
import "../Misc/TitleAndLogo"
import TitleAndLogo from '../Misc/TitleAndLogo'
import { TextInputStandard } from '../Misc/TextFields'
import { GreenButton } from '../Misc/Buttons'
import "./Register.css"
import { FormControl } from '@mui/material'
import { Alert } from '@mui/material'
import axios from 'axios'

const Register = () => {

  //this literally just changes the background color, yes its kind of hacky deal with it
  useEffect(() => {
    document.body.style.backgroundColor = 'rgb(2,0,36)'
    document.body.style.background = 'linear-gradient(42deg, rgba(2,0,36,1) 0%, rgba(19,16,39,1) 51%, rgba(33,28,65,1) 100%)'
    return () => {
      document.body.style.background = "#171621"
    }
  }, [])

  //hooks to keep track of form data
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secondPassword, setSecondPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [error, setError] = useState(false)

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
    } else if (email === ''){
      setError(true)
      setErrorMessage('No email')
      console.log('no email')
      return
    }

    //check if User Name is already taken in the DB
    const res = await axios.get(`/api/v1/users/${userName}`)
    const user = res.data
    if (user !== null) {
      setErrorMessage("User name is taken")
      setError(true)
      console.log('username is taken')

      return
    }

    const body = {
      username: userName,
      email: email,
      password: password
    }

    //do something to hit the api link
    const postRes = await axios.post(`/api/v1/users/`, body)
    console.log(postRes)

    //needs to mount interest component when done
  }

  return (
    <div className="register">
      <div className='register-container'>
        <div>
          <TitleAndLogo />
          <form className='register-form'>
              {/* inserts an error message as to what text field is missing if any */}
              <h2> Register </h2>
              <div>
                {error && <Alert className='alert-banner' onClose={()=>{setError(false)}} severity='error'>{errorMessage}</Alert>}
              </div>
            <FormControl className='button-grouping'>
              <div className='button-spacing'>
                <TextInputStandard label='User Name' variant='outlined' size="small" onChange={(e) => { setUserName(e.target.value) }} />
                <TextInputStandard label='Email' variant='outlined' size="small" onChange={(e) => { setEmail(e.target.value) }} />
              </div>
              <div className='button-spacing'>
                <TextInputStandard type='password' label='Password' variant='outlined' size="small" onChange={(e) => { setPassword(e.target.value) }} />
                <TextInputStandard type='password' label='Re-Enter Password' variant='outlined' size="small" onChange={(e) => { setSecondPassword(e.target.value) }} />
              </div>
            </FormControl>
            <GreenButton onClick={onRegisterSubmit} className='submit-button' variant='outlined'>Submit</GreenButton>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register 