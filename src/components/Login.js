import React, { useEffect, useState } from 'react'
import APIService from './ApiService'
import {useCookies} from 'react-cookie'

import { useNavigate } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [token, setToken] = useCookies(['mytoken'])
    const [login, setLogin] = useState(true)
    const navigate = useNavigate()

    const handleLogin = () =>{
        APIService.LoginUser({username, password})
        .then(resp=> setToken('mytoken', resp.token))
        .then(error=>console.log(error))
    }

    const handleRegister =() =>{
      APIService.RegisterUser({username, password})
      .then(resp=>handleLogin())
      .then(error=>console.log(error))
    }

    useEffect(()=>{
      if(token['mytoken']){
        navigate('/articles')
      }
    }, [token])

  return (
    <div style={{textAlign:'center'}}>
        <br/>
        <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="Enter Username" /><br /><br/>
        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter Password" /><br /><br/>
        {login ? <button type='button' onClick={handleLogin}>Login</button> : <button type='button' onClick={handleRegister}>Register</button> } <br/><br/><br/>
          {login ? <><button onClick={()=>setLogin(false)}>Register</button><p>If you dont have account Already?</p></> : <button onClick={()=>setLogin(true)}>Login</button>}
    </div>
  )
}

export default Login