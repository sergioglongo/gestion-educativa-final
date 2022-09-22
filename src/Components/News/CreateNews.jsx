import React from "react";
import { useState } from "react";
import { FormControl, Box, Grid, Button, Card, Typography, CardContent, TextField, Divider } from '@mui/material';
import axios from "axios";

function CreateNews({ handleClose }) {

  // const [previewImg, setPreviewImg] = useState(null)
  const [image, setImg] = useState()
  const [imageSelected, setImageSelected] = useState("")

  let notImage = "https://us.123rf.com/450wm/pavelstasevich/pavelstasevich1811/pavelstasevich181101028/112815904-no-hay-icono-de-imagen-disponible-ilustraci%C3%B3n-vectorial-plana.jpg?ver=6"

  const [datos, setDatos] = useState({
    title: "",
    body: "",
    image: notImage,
  })


  const uploadImage = (files) => {
    const formData = new FormData()
    formData.append("file", imageSelected)
    formData.append("upload_preset", "mjaskrct")
    console.log("Formdata", formData);
    axios.post("https://api.cloudinary.com/v1_1/do9ddo9my/image/upload", formData
    ).then((res) => setDatos({ ...datos, image: res.data.url }))
  };


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
    setImageSelected(imgPreview)
    // setImg(imgPreview)
    setDatos({ ...datos, image: imgPreview })
    // setPreviewImg(imgPreview)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(datos, "datos de noticias")

    const formData = {
      title: datos.title,
      body: datos.body,
      image: datos.image
    }

    console.log(formData, "formDataa")

    const response = await fetch(`http://Localhost:3001/news`, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      //  .then(res => JSON.parse(res))
      .catch(error => console.error('Error:', error))
    handleClose()

  }

  return (
    <Box>
      <Card style={{ margin: "0 auto", pading: "20px 5px" }} fullWidth>
        <CardContent >
          <Typography gutterBottom variant="h5" >Crear Noticia</Typography>
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
          <Typography gutterBottom variant="h7" >Agregue la imagen</Typography>

          <Divider/>

          <Grid container fullWidth>
            {/* <input multiple type="file" onChange={handleFileChange} /> */}
            <Grid sx={{ m: 1 }} item>
              <Button variant="outlined" component="label" >
                <input type="file" accept="image/*" hidden onChange={(e) => { setImageSelected(e.target.files[0]); }} />
                Examinar...
              </Button>
            </Grid>
            <Grid sx={{ m: 1, border : 1 }}  item>
              <Box>
                <img src={!datos.image ? notImage : datos.image} alt="" width="250" height="120" />
              </Box>
            </Grid>
            <Grid sx={{ m: 1 , mt :15}} item>
              <Button variant="outlined" onClick={uploadImage}>Cargar</Button>
            </Grid>
          </Grid>
          <Divider/>
          <Grid xs={12} sm={6} item sx={{ mt: 1 }}>
            <Button sx={{ ml: 1 ,mt: 1, width: 110}} onClick={(e) => handleSubmit(e)} variant="contained">
              Crear
            </Button>


            <Button variant="outlined" sx={{ ml: 4 ,mt: 1 ,width: 110}} onClick={handleClose}>Cancelar</Button>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  )
}

export default CreateNews;
