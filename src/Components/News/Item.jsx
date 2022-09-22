import React from 'react';

import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Grid, Divider } from "@mui/material";


import { Button } from '@mui/material'
const Item = ({news}) => {

    const addRemoveLocalFavs = (e) => {
        const favsNews = localStorage.getItem("favoritos")
        console.log(favsNews)

        let tempNewsFavs;

        if (favsNews === null) {
            tempNewsFavs = []
        } else {
            tempNewsFavs = JSON.parse(favsNews)

        }
        const btn = e.currentTarget
        /* const parent = btn.parentElement
        const name = parent.querySelector("h4").innerText
        const title = parent.querySelector("h2").innerText
        const body = parent.querySelector("p").innerText */
        console.log(btn.dataset)
        const newsData = {

            id: btn.dataset?.newsId
        }
        let newsArray = tempNewsFavs.find(oneNew => {
            return oneNew?.id === newsData?.id
        })

        if (!newsArray) {
            tempNewsFavs.push(newsData)
            localStorage.setItem("favoritos", JSON.stringify(tempNewsFavs))
            console.log("se agrego la noticia")
        } else {
            /* let newsLeft = tempNewsFavs.filter(oneNew =>{
                return oneNew.id !== newsData.id
            }) */
            localStorage.setItem("favoritos", JSON.stringify(tempNewsFavs))
            console.log("ya se agrego a favoritos")
        }
    }
    
    const addRemoveDBFavs = ()=>{

    }

    return (
        <Grid container style={{ maxWidth: 1200, margin: "auto" }}>
            <Grid item md={8} sm={12} sx={{ boxShadow: 2 }}>
                <CardMedia
                    component="img"
                    image={news?.image}  // img
                    alt="Paella dish"
                    max-width= "100%"
                    height= "auto"
                />
            </Grid>
            <Grid item md={4} sm={12}>
                <CardContent>
                    <Typography variant="h5" color="text.secondary">
                        {news?.title}
                    </Typography>
                    <Divider variant="middle" sx={{ mt: 1 }} />
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
                        {news?.body}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
                        Creado por: {news?.firstNames}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
                        Faveado por: {news?.firstNames}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
                        Info Id: {news?.idNews}
                    </Typography>
                </CardContent>
                <Button className="CheckButton">
                    Leer mas
                </Button>
                {false ?
                    <Button variant="contained" data-news-id={news?.idNews} className="CheckButton" onClick={addRemoveDBFavs}>
                        Agregar a favoritos DB...
                    </Button> :
                    <Button variant="contained" data-news-id={news?.idNews} className="CheckButton" onClick={addRemoveLocalFavs}>
                        Agregar a favoritos Local...
                    </Button>
            
                }
            </Grid>
        </Grid>
    )
}

export default Item
