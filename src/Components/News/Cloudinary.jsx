import React from "react";
import { useState } from "react"
import axios from "axios";
import { Image } from "cloudinary-react"

function Cloudinary() {

  const [imageSelected, setImageSelected] = useState("")

  const uploadImage = (files) => {
    const formData = new FormData()
    formData.append("file", imageSelected)
    formData.append("upload_preset", "mjaskrct")
    console.log("Formdata", formData);
    axios.post("https://api.cloudinary.com/v1_1/do9ddo9my/image/upload", formData
    ).then((res) => res.data.url)
  };


  return (
    <div className="App">
     <input type="file" onChange={(e) => {
      setImageSelected(e.target.files[0]);
      }}
      />
      <button onClick={uploadImage}>cargar imagen</button>

    </div>
  );
}
/* <Buscar/> */
export default App;

   