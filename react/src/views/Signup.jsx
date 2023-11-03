import React from 'react'
import {useRef} from 'react'
import {Link} from "react-router-dom"
import axiosClient from "../axios-client.js"
import { useStateContext } from '../contexts/ContextProvider'



export default function Signup() {

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();

  const {setUser, setToken} = useStateContext()

  const onSubmit=(ev)=>{
    ev.preventDefault()
    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      passwordConfirmation: passwordConfirmationRef.current.value,
    }
    console.log(payload)
    axiosClient().post('/signup', payload)
    .then(({data})=>{
      setUser(data.user)
      setToken(data.token)
    })
    .catch(err=>{
      const response = err.response;
      if(response && response.status === 422){
        console.log(response.data.errors)
      }
    })
  }

  return (
    <div className='login-signup-form animated fadeInDown'>
      <div className='form'>
        <form onSubmit={onSubmit}>
          <h1 className='title'>Register</h1>
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
