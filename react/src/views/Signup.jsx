import React from 'react'
import {useRef, useState} from 'react'
import {Link} from "react-router-dom"
import axiosClient from "../axios-client.js"
import { useStateContext } from '../contexts/ContextProvider'



export default function Signup() {

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const [errors, setErrors] = useState('')
  const {setUser, setToken} = useStateContext()

  const onSubmit=(ev)=>{
    ev.preventDefault()
    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    }
    console.log(payload)

    axiosClient.post('/signup', payload)
    .then(({data})=>{
      setUser(data.user)
      setToken(data.token)
    })
    .catch(err=>{
      const response = err.response;
      console.log('signup')
      if(response && response.status === 422){
        console.log('setting errors')
        setErrors(response.data.errors)
      }
    })
  }

  return (
    <div className='login-signup-form animated fadeInDown'>
      <div className='form'>
        <form onSubmit={onSubmit}>
          <h1 className='title'>Register</h1>
          {errors && <div className='alert'>
            {Object.keys(errors).map(key=>(
              <p key={key}>{errors[key][0]}</p>
            ))}
            </div>}
          <input placeholder='Full Name' ref={nameRef}/>
          <input placeholder='Email Address' ref={emailRef}/>
          <input placeholder='Password' ref={passwordRef}/>
          <input placeholder='Password confirmation' ref={passwordConfirmationRef}/>
          <button className='btn btn-block'>Sign Up</button>
          <p className='message'>
            Already have an account? <Link to="/login">Log In</Link>
          </p>
        </form>
      </div>
    </div>
  )
}
