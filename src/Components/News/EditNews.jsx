import React from "react";
import { useState } from "react";
import { FormControl, Checkbox, Grid, Button, FormControlLabel, Card, Typography, CardContent, TextField } from '@mui/material';
import { editNews } from "./NewsActions";

function EditNews({ newData, handleClose }) {

  // const [previewImg, setPreviewImg] = useState(null)
  // const [image, setImg] = useState()

  let notImage = "https://us.123rf.com/450wm/pavelstasevich/pavelstasevich1811/pavelstasevich181101028/112815904-no-hay-icono-de-imagen-disponible-ilustraci%C3%B3n-vectorial-plana.jpg?ver=6"

  let idUser = localStorage.getItem("idUser")

  const [datos, setDatos] = useState({
    idNews: newData.idNews ? newData.idNews : "",
    title: newData.title ? newData.title : "",
    body: newData.body ? newData.body : "",
    image: newData.image ? newData.image : notImage,
    active: newData.active ? newData.active : true,
    users_news: idUser ? idUser : 1
  })


  const handleInputChange = (e) => {
    // console.log(e.target.value)
    setDatos({
      ...datos,
      [e.target.name]: e.target.value
    })
  }

  const handleFileChange = (e) => {
    // console.log(e.target.files)

    const imgPreview = URL.createObjectURL(e.target.files[0])
    // setImg(imgPreview)
    setDatos({ ...datos, image: imgPreview })
    // setPreviewImg(imgPreview)
  }

  function handleChecks(e) {
    setDatos({ ...datos, [e.target.name]: e.target.checked })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(datos, "datos de noticias")

    const formData = {
      idNews: datos.idNews,
      title: datos.title,
      body: datos.body,
      image: datos.image,
      active: datos.active,
      users_news: datos.users_news
    }

    console.log(formData, "formDataa")

    console.log(editNews(formData))

    handleClose()

  }

  return (
    <div>
      {/* <form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="title"
          placeholder="Titulo"
          onChange={handleInputChange} />

        <Input
          type="text"
          name="body"
          placeholder="body" 
          onChange={handleInputChange}/>
          <img src={!previewImg ? notImage : previewImg} alt="" width="150" height="150" />
          <input multiple type="file" onChange={handleFileChange}/>


        <Button variant="contained" type="submit" >Publicar</Button>
      </form> */}
      <Card style={{ margin: "0 auto", pading: "20px 5px" }} fullWidth>
        <CardContent >
          <Typography gutterBottom variant="h5" >Editar Noticia</Typography>
          <Grid xs={12} sm={6} item>
            <FormControl sx={{ mt: 1 }} fullWidth>
              <TextField name="title" multiline rows={2}
                label="Titulo" type="text" onChange={(e) => (handleInputChange(e))}
                placeholder="Ingrese nombre" sx={{ mb: 1.5 }} variant="outlined"
                aria-describedby="firstNames-Helper" value={datos.title} required />
            </FormControl>
          </Grid>
          <Grid xs={12} sm={6} item>
            <FormControl sx={{ mt: 1 }} fullWidth>
              <TextField multiline rows={4} name="body" type="text" label="Descripción"
                onChange={(e) => (handleInputChange(e))} sx={{ mb: 1.5 }} placeholder="Ingrese descripción"
                variant="outlined" aria-describedby="lastName-Helper" value={datos.body} required />
            </FormControl>
          </Grid>
          <Grid xs={12} sm={6} item>
            <FormControl >
              <FormControlLabel control={<Checkbox checked={datos.active} />} name="active" onChange={handleChecks} label="Activa" />
            </FormControl>
          </Grid>
          <Grid xs={12} sm={6} item>
            {/* <input multiple type="file" onChange={handleFileChange} /> */}
            <Button variant="contained" component="label" onChange={handleFileChange}>
              Examinar...
              <input hidden accept="image/*" multiple type="file" />
            </Button>
            <Grid xs={12} sm={6} item>
              <img src={!datos.image ? notImage : datos.image} alt="" width="150" height="150" />
            </Grid>
          </Grid>
          <Grid xs={12} sm={6} item sx={{ mt: 1 }}>
            <Button onClick={(e) => handleSubmit(e)} variant="contained">
              Editar
            </Button>


            <Button onClick={handleClose}>Cancelar</Button>
          </Grid>
        </CardContent>
      </Card>
    </div>
  )
}

export default EditNews;
