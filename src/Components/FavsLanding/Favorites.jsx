import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Carousel from '../News/Carousel'
//import Item from '../News/Item'
import { getFavorites } from "../../redux/actions"

const Favorites = () => {

    const [favorites, setFavourites] = useState([])
    const news = useSelector(state => state.news)
    const [favoritesFormated,setFavoritesFormated] = useState([])

    let dispatch = useDispatch()

    const user = useSelector((state) => state.user)
    console.log(user[0]?.idUser);
    const favsDB = useSelector((state) => state.favorites)
    
    const favsDBFormated= []
    favsDB.map(newItem => favsDBFormated.push({
        idNews: newItem.favorites.idNews,
        body:newItem.favorites.body,
        title:newItem.favorites.title,
        image:newItem.favorites.image,
    })) 
    console.log(favsDB);
    useEffect(() => {
        dispatch(getFavorites())
      }, [dispatch])

    const handleDeleteFavs = (e) => {
        const idfavs = e.target.value
        const clickRemove = favorites.filter(
            fav=> fav.id !== idfavs
        )
        setFavourites(clickRemove)
        localStorage.setItem("favoritos", JSON.stringify(clickRemove))

    }

    useEffect(() => {
        const favLocal = localStorage.getItem('favoritos')
        if (favLocal !== null) {
            let favoritesNews = []
            const favArray = JSON.parse(favLocal)
            setFavourites(favArray)
            news?.map(newItem => {
                favArray.map(favorite=>{
                    if(favorite.id.toString() === newItem.idNews.toString())
                    {
                        return favoritesNews.push(newItem)
                    }
                })
                
            })
        setFavoritesFormated(favoritesNews)
        }
        
    }, [dispatch])

    return (
        <div>
            <h2>seccion favorites</h2>
                {user[0]?
                <Carousel sx={{ m: 3 }} news={favsDBFormated} />
                    :
                <Carousel sx={{ m: 3 }} news={favoritesFormated} />
                }
            
        </div>

    )
}

export default Favorites
