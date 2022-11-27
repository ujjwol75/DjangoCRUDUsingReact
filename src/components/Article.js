import React, { useState } from "react";
import APIService from "./ApiService";
import {useCookies} from 'react-cookie'

const Article = (props) => {

    const [token] = useCookies(['mytoken'])
    const updateBtn = (article) => {
        props.editBtn(article)
    }

    const deleteBtn = (article) =>{
        APIService.DeleteArticle(article.id, token['mytoken'])
        .then(()=>props.deleteArticle(article))
     
    }


  return (
    <div>
      {props.article && props.article.map((curElem, index) => {
        return (
            <div>

        <h1>{curElem.title}</h1>
           <p>{curElem.description}</p>
           <button onClick={()=>updateBtn(curElem)}>Update</button><button onClick={()=>deleteBtn(curElem)} >Delete</button>
           </div>
           
        )
      })}
    </div>
  );
};

export default Article;
