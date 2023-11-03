import React from 'react'
import {Link} from "react-router-dom"

const onSubmit=(ev)=>{
  ev.preventDefault()
  console.log('login')
}


export default function Login() {


  return (
    <div className='login-signup-form animated fadeInDown'>
      <div className='form'>
        <form onSubmit={onSubmit}>
          <h1 className='title'>Login into account</h1>
          <input placeholder='Email' type="email"/>
          <input placeholder='Password' type="password"/>
          <button className='btn btn-block'>Login</button>
          <p className='message'>
            Not Registered? <Link to="/signup">Create an account</Link>
          </p>
        </form>
      </div>
    </div>
  )
}
