import React, { useEffect, useState } from 'react'
import APIService from './ApiService'
import {useCookies} from 'react-cookie'

const Form = (props) => {
    
    const [title, setTitle] = useState('')
    const [description, setDesc] = useState('')
    const [token] = useCookies(['mytoken'])

    useEffect(()=>{
        setTitle(props.article.title)
        setDesc(props.article.description)
    }, [props.article])
    

    const handleSubmit = () =>{
        APIService.UpdateArticle(props.article.id, {title, description}, token['mytoken'])
        .then(resp=> props.updatedarticle(resp))
        
    }

    const insertArticle = () => {
        APIService.InserArticle({title, description}, token['mytoken'])
        .then(resp=> props.insertedarticle(resp))
    }


  return (

    <div>
      
            Title: <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} />
            Desc : <input type="text" value={description} onChange={(e)=>setDesc(e.target.value)} />

            { props.article.id ? <button onClick={handleSubmit}>Update</button> : <button onClick={insertArticle}>Insert</button> }
            
       
    </div>
  )
}

export default Form