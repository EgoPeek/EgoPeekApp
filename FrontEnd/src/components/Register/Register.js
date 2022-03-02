import React from 'react'
import { useEffect } from 'react'
import "../Misc/TitleAndLogo"
import TitleAndLogo from '../Misc/TitleAndLogo'
import { TextInputStandard } from '../Misc/TextFields'
import { GreenButton } from '../Misc/Buttons'
import "./Register.css"
import { FormControl, Box } from '@material-ui/core'

const Register = () => {
  useEffect(() => {
    document.body.style.backgroundColor = 'rgb(2,0,36)'
    document.body.style.background = 'linear-gradient(42deg, rgba(2,0,36,1) 0%, rgba(19,16,39,1) 51%, rgba(33,28,65,1) 100%)'
    return () => {
      document.body.style.background = "#171621"
    }
  }, [])

  return (
    <div className="register">
      <div className='register-container'>
        <div>

          <TitleAndLogo />
          <form className='register-form'>
            <h2> Register </h2>
            <FormControl className='button-grouping'>
              <div className='button-spacing'>

                <TextInputStandard label='User Name' variant='outlined' size="small" />
                <TextInputStandard label='Email' variant='outlined' size="small" />
              </div>
              <div className='button-spacing'>
                <TextInputStandard label='Password' variant='outlined' size="small" />
                <TextInputStandard label='Re-Enter Password' variant='outlined' size="small" />
              </div>
            </FormControl>
            <GreenButton className='submit-button' variant='outlined'>Submit</GreenButton>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register 