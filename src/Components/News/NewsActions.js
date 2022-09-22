export const GET_ALL_NEWS = "GET_ALL_NEWS";


export const getAllNews = () => async dispatch => {
    try {
        return await fetch(`http://localhost:3001/news/`)
            .then(r => r.json())
            .then(data => dispatch({ type: GET_ALL_NEWS, payload: data }))
            .catch(error => console.log('Error de fetch API'))
    }
    catch (error) {
        console.log('Error de try API');
        throw new Error({ error: error.messege })
    }
}

export const editNews = async (data) =>{
    try {
        return await fetch(`http://localhost:3001/news/`,{
            method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
        }).then(res => res.json())
        
    }
    catch (error) {
        console.log('Error de try API');
        throw new Error({ error: error.messege })
    }
}
