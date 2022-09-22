import { TextField, Button, Box, Card, Autocomplete, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { createPay, groupStudents } from "./actionsPay.js";
import swal from "sweetalert";
import Validation from "../Login/Validation.js";

let initialState = {
  students: [],
  subject: "",
  amount: "",
  expirationDate: "",
  detail: "",
};

export default function CreatePay() {
  const dispatch = useDispatch()

  const studentStore = useSelector(state => state.students)



  const result = studentStore?.map(s => {
    return {
      idStudent: s.idStudent,
      students: `${s.firstNames} ${s.lastName}`,
      course: s.course
    }
  })

  const [input, setInput] = useState(initialState)
  const [alumno, setAlumno] = useState([]);

  useEffect(() => {
    dispatch(groupStudents())
  }, [])

  useEffect(() => {
    setInput({ ...input, students: alumno })
  }, [alumno])


  let initialStateError = {
    subject: false,
    messageSubject: "Asunto",
    amount: false,
    messageAmount: "Monto",
    expirationDate: false,
    messageExpirationDate: "Vencimiento",
    detail: false,
    messageDetail: "detail",

  }

  let [error, setError] = useState(initialStateError)


  ////// ONCHANGE INPUTS
  const handleChange = (e) => {

    const result = Validation(e.target.name, e.target.value)
    console.log(result)
    switch (result.type) {

      case "subject":
        if (result.status === "stop") {
          return setError({ ...error, subject: true, messageSubject: result.subject })
        } else if (result.status === "error") {
          setError({ ...error, subject: true, messageSubject: result.subject })
        } else if (result.status === "ok") {
          setError({ ...error, subject: false, messageSubject: result.subject })
        }
        setInput({ ...input, [e.target.name]: e.target.value })
        break;

      case "amount":
        if (result.status === "error") {
          setError({ ...error, amount: true, messageAmount: result.amount })
        } else if (result.status === "ok") {
          setError({ ...error, amount: false, messageAmount: result.amount })
          setInput({ ...input, [e.target.name]: e.target.value })
        }
        break;

      case "detail":
        if (result.status === "stop") {
          return setError({ ...error, detail: true, messageDetail: result.detail })
        } else if (result.status === "error") {
          setError({ ...error, detail: true, messageDetail: result.detail })
        } else if (result.status === "ok") {
          setError({ ...error, detail: false, messageDetail: result.detail })
        }
        setInput({ ...input, [e.target.name]: e.target.value })
        break;



      default: return setInput({ ...input, [e.target.name]: e.target.value })
    }
  }

  //// ONSUBMIT BOTON
  const handleSubmit = async (e) => {
    e.preventDefault()
    if(!input.students[0] || !input.subject || !input.amount ||  !input.expirationDate ||  !input.detail ) return swal("Cuidado! ", "todos los campos debe de esta totalmente diligenciados", "warning")
    createPay(input)
    setInput(initialState)
    swal("Pago creado con exito! ", "", "success")
  }

  //xs={12} sm={6} align={"center"} item

  return (
    <Box sx={{ mt: 10 }} >
      <Card variant="outlined" style={{ margin: "0 auto", pading: "20px 5px" }} sx={{ maxWidth: 500 }}>
        <Typography align={"center"} sx={{ mt: 2 }} gutterBottom variant="h5" >Crear cobro</Typography>
        <Grid xs={12} sm={6} sx={{ m: 1 }} item>
          <TextField id="outlined-search" error={error.subject} label={error.messageSubject} type="search" size="small" value={input.subject} name="subject" placeholder="Asunto" onChange={handleChange} />
        </Grid>
        <Grid xs={12} sm={6} sx={{ m: 1 }} item>
          <TextField id="outlined-search" error={error.amount} label={error.messageAmount} type="search" size="small" value={input.amount} name="amount" placeholder="Monto" onChange={handleChange} />
        </Grid>
        <Grid xs={12} sm={6} sx={{ m: 1 }} item>
          <TextField id="outlined-read-only-input" type="date" size="small" value={input.expirationDate} name="expirationDate" onChange={handleChange} />
        </Grid>
        <Grid xs={12} sm={6} sx={{ m: 1 }} item>
          <TextField id="outlined-textarea" error={error.detail} label={error.messageDetail} placeholder="Ingrese el detalle" multiline size="small" value={input.detail} name="detail" onChange={handleChange} />
        </Grid>

        <Grid xs={12} sm={6} sx={{ m: 1 }} item>
          <Autocomplete
            size="small"
            multiple
            xs={12} sm={6}
            limitTags={3}
            id="multiple-limit-tags"
            disableCloseOnSelect={true}
            options={result}
            value={input.students}
            onChange={(e, value) => setAlumno(value)}
            isOptionEqualToValue={(option, value) => option.idStudent === value.idStudent}
            getOptionLabel={(option) => `${option.students} ${option.course}`}
            renderInput={(params) => (
              <TextField {...params} label="Agregar alumno" placeholder="Agregar alumno" />
            )}
          />
        </Grid>

        <Grid xs={12} sm={6} sx={{ m: 1 }} item>
          <Button variant="outlined" color="primary" onClick={(e) => handleSubmit(e)}>Enviar</Button>
        </Grid>

      </Card>
    </Box>








  );
}


