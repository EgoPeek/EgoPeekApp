/**
 * Filename: Register.js
 * Description: Allows user to register and create an account with egopeek
 */

import React from 'react'
import { useEffect, useState } from 'react'
import TitleAndLogo from '../Misc/TitleAndLogo'
import { TextInputStandard } from '../Misc/TextFields'
import { GreenButton } from '../Misc/Buttons'
import { FormControl } from '@mui/material'
import { Alert } from '@mui/material'
import axios from 'axios'
import "../Misc/TitleAndLogo"
import "./Register.css"

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

//interest page in component Form
const InterestPage = () => {

  //Tag component that takes a title
  const [selectedTags, setSelectedTags] = useState([]);
  useEffect(() => {
  }, [selectedTags])


  const updateTag = (tagName) => {
    //if the tag exists in the array remove it
    if (selectedTags.find(x => x === tagName)) {
      setSelectedTags(selectedTags.filter(x => x !== tagName))
      return
    }
    //if its brand new just add it
    setSelectedTags([...selectedTags, tagName])
  }

  const Tag = ({ title }) => {
    return (
      <div className='tag' onClick={() => updateTag(title)}>
        <p>{title}</p>
      </div>
    )
  }

  return (
    <div className='form-container'>
      <h2>Interests</h2>
      <p>Pick games that interest you the most to receieve a more personalized feed</p>
      <TextInputStandard size='small' sx={{ width: '70%' }} label="Search by tag" />
      <div className='tag-container'>
        <div className='chosen-tags interests'>
          {selectedTags.map((x, i) => <Tag title={x} key={i}/>)}
        </div>
        <div className='interests'>
          <Tag title='test' />
          <Tag title='fdsyfdsfsadfads' />
          <Tag title='fdsas' />
          <Tag title='hjfdsakl' />
          <Tag title='vhuiau87s' />
          <Tag title='vho874wesy78s' />
          <Tag title='vho874wesy78s' />
          <Tag title='gh87vf4ew8gv4ewgo4tg7' />

        </div>
      </div>
      <GreenButton variant='outlined' >Submit</GreenButton>
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

  //verifys and creates account with EgoPeek
  const onRegisterSubmit = async () => {
    //checks for valid email, username, and matching passwords
    accountCreated(true)
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

    const body = {
      username: userName,
      email: email,
      password: password
    }

    //do something to hit the api link
    try {
      const postRes = await axios.post(`/api/v1/users/`, body)
      if (postRes.status === 201) {
        //do something to redirect user
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