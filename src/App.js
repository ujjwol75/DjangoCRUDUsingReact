import logo from "./logo.svg";
import "./App.css";
import Article from "./components/Article";
import { useEffect, useState } from "react";
import Form from "./components/Form";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";


function App() {
  const [articles, setArticles] = useState([]);
  const [editArticle, setEditArticle] = useState(null);
  const [token, setToken, removeToken] = useCookies(['mytoken']);
  
  const navigate = useNavigate()

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/articles/", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Token ${token["mytoken"]}`,
      },
    })
      .then((res) => res.json())
      .then((res) => setArticles(res))
      .catch((error) => console.log(error));
  }, []);

  const editBtn = (article) => {
    setEditArticle(article);
  };

  const updatedarticle = (article) => {
    const new_article = articles.map((myarticle) => {
      if (myarticle.id === article.id) {
        return article;
      } else {
        return myarticle;
      }
    });
    setArticles(new_article);
  };

  const deleteArticle = (article) => {
    const new_article = articles.filter((myarticle) => {
      if (myarticle.id === article.id) {
        return false;
      } else {
        return true;
      }
    });
    setArticles(new_article);
  };

  const articleForm = () => {
    setEditArticle({ title: "", description: "" });
  };

  const insertedarticle = (article) => {
    const new_articles = [...articles, article];
    console.log("new_aritcles", new_articles);
    setArticles(new_articles);
  };


  const logout = () =>{
    removeToken(['mytoken'])
    navigate('/')
  }

  // useEffect(()=>{
  //   if(token['mytoken']){
  //     navigate('/')
  //   }
  // }, [token])

  return (
    <div className="App">
      <div>
        <button onClick={logout}>Logout</button>
      </div>
      <br />
      <div>
        <button onClick={articleForm}>Insert Article</button>
      </div>
      <br />

      <Article
        article={articles}
        editBtn={editBtn}
        deleteArticle={deleteArticle}
      />

      {editArticle ? (
        <Form
          article={editArticle}
          updatedarticle={updatedarticle}
          insertedarticle={insertedarticle}
        />
      ) : null}
    </div>
  );
}

export default App;
