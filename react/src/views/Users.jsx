import React, { useEffect, useState } from 'react'
import axiosClient from "../axios-client.js"
import {Link} from "react-router-dom"
import { useStateContext } from '../contexts/ContextProvider.jsx'


export default function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const {setNotification} = useStateContext()

  useEffect(() => {
    getUsers()
  }, [])

  const getUsers=()=>{
    setLoading(true)
    axiosClient.get('/users')
      .then(({data})=>{
        setLoading(false)
        setUsers(data.data)
      })
      .catch(()=>{
        setLoading(false)
      })
  }

  const onDelete= (u) => {
    if (window.confirm("Are you sure?")){
      axiosClient.delete(`/users/${u.id}`)
      .then(()=>{
        setNotification('User was successfully deleted')
        getUsers()
      })
    }
  }

  return (
    <div>
      <div style={{display: 'flex', justifyContent:'space-between', alignItems:'center'}}>
        <h1>Users</h1>
        <Link to="/users/new" className='btn-add'>Add New</Link>
      </div>
      <div className='card animated fadeInDown'>
        <table>
          <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Create Date</th>
            <th>Actions</th>
          </tr>
          </thead>
          {loading && <tbody>
            <tr>
              <td colSpan="5" className='text-center'>
                Loading...
              </td>
            </tr>
          </tbody>}
          <tbody>
              {users.map(u=>(
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.created_at}</td>
                  <td>
                  <Link className='btn-edit' to={'/users/'+u.id}>Edit</Link>
                  &nbsp;
                  <button onClick={e=>onDelete(u)} className='btn-delete'>Delete</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
