export const LOGIN = "LOGIN";
export const CLEANER_USER = "CLEANER_USER";
export const GET_NEWS = "GET_NEWS"
export const GET_FAVORITES = "GET_FAVORITES"
export const GET_ALL_TYPEUSERS = "GET_ALL_TYPEUSERS";
export const LOADING = "LOADING"



// get password
export function login(input) {
  return function (dispatch) {
    return fetch("http://localhost:3001/users/password", {
      method: "POST",
      body: JSON.stringify(input),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((login) => {
        dispatch({ type: LOGIN, payload: login });
      });
  };
}

export const getAllTypeUsers = () => async dispatch => {
  try{
  return await fetch(`http://localhost:3001/typeusers`)
    .then(r => r.json())
    .then(data => dispatch({ type: "GET_ALL_TYPEUSERS", payload: data }))
    .catch(error=> console.log('Error de fetch API'))
  }
  catch(error){
    console.log('Error de try API');
    throw new Error({error: error.messege}) 
  }
}

// Restablecer contraseña OK
export async function resetPassword(password){
    return fetch("http://localhost:3001/users/password",{
      method: "PUT",
      body: JSON.stringify(password),
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => res.json())
    .catch((error) => console.error("Error:", error))
    .then((email) => console.log(email));
  }

  // Limpiar reducer user
  export function cleanerUser(){
    return {
      type: CLEANER_USER
    }
  }

  export const getNews = ()=>{
    return function(dispatch){
      return fetch("http://localhost:3001/news")
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: GET_NEWS, 
          payload: data });
      })
      .catch((error) => console.error("Error:", error))
    }
  }
  export const getFavorites = ()=>{
    return function(dispatch){
      return fetch("http://localhost:3001/favnews")
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: GET_FAVORITES, 
          payload: data });
      })
      .catch((error) => console.error("Error:", error))
    }
  }


  export function loading(){
    return {
      type: LOADING
    }
  }