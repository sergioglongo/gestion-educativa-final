import { useEffect, useState } from "react";
import { resetPassword, cleanerUser } from "../../redux/actions";
import style from "./change.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Button, Card, CardContent, FormControl, Grid, TextField, Typography } from "@mui/material";
import Validation from "./Validation";
import swal from "sweetalert";

export default function Change(props) {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  let navigate = useNavigate();

  const initialState = {
    password: "",
    newPassword: ""
  }

  const [reset, setReset] = useState(initialState);

  function handleOnSubmit(e) {
    e.preventDefault();
    if(!reset.password) return swal("Ingrese la nueva contraseña!", "", "error")
    if(!reset.newPassword) return swal("Repita la contraseña!", "", "error")
    if(reset.password !== reset.newPassword) return swal("La contraseña no coinciden!", "", "warning")
    swal(`Se cambio la contraseña satisfactoriamente`, "lo redirigira al ingreso de la aplicacion!", "success")
    resetPassword({type: "CHANGE",idUser: user[0].idUser,password: reset.password});
    setReset(initialState);
    dispatch(cleanerUser());
    navigate("/login");
  }


  let initialStateError = {
    password: false,
    messagePasswrod: "Contraseña",
    newPassword: false,
    messageNewPasswrod: "Repetir Contraseña"
  }

  let [error, setError] = useState(initialStateError)

  function handleOnChange(e) {

    const result = Validation(e.target.name, e.target.value)

    switch (result.type) {
      case "password":
        if (result.status === "error") {
          setError({ ...error, password: true, messagePasswrod: result.password })
        } else if (result.status === "ok") {
          setError({ ...error, password: false, messagePasswrod: result.password })
        }
        setReset({ ...reset, [e.target.name]: e.target.value });
        break;

      case "newPassword":
        if (result.status === "error") {
          setError({ ...error, newPassword: true, messageNewPasswrod: result.password })
        } else {
          setError({ ...error, newPassword: false, messageNewPasswrod: result.password })
          setReset({ ...reset, [e.target.name]: e.target.value });
        }
  
      default: return  setReset({ ...reset, [e.target.name]: e.target.value });
    }

  }
  return (
    <div>
      <Box sx={{ mt: 10 }} >
        <Card variant="outlined" style={{ margin: "0 auto", pading: "20px 5px" }} sx={{ maxWidth: 350 }}>
          <form onSubmit={handleOnSubmit}>
            <Card style={{ margin: "0 auto", pading: "20px 5px" }} >
              <CardContent >
                <Typography gutterBottom variant="h5" align={"center"} >Cambie su contraseña</Typography>

                <Grid xs={12} sm={6} align={"center"} item>
                  <FormControl sx={{ mt: 1 }}>
                    <TextField
                      name="password"
                      size="sm"
                      label={error.messagePasswrod}
                      type="password"
                      onChange={(e) => handleOnChange(e)}
                      placeholder="Contraseña nueva" sx={{ mb: 1.5 }} variant="outlined"
                      aria-describedby="subject-Helper"
                      value={reset.password}
                      error={error.password}
                    />
                  </FormControl>
                </Grid>


                <Grid xs={12} sm={6} align={"center"} item>
                  <FormControl sx={{ mt: 1 }}>
                    <TextField
                      name="newPassword"
                      size="sm"
                      label={error.messageNewPasswrod}
                      type="password"
                      onChange={(e) => handleOnChange(e)}
                      placeholder="Repetir Contraseña" sx={{ mb: 1.5 }} variant="outlined"
                      aria-describedby="subject-Helper"
                      value={reset.newPassword}
                      error={error.newPassword}
                    />
                  </FormControl>
                </Grid>


                <Grid xs={12} sm={6} item sx={{ mt: 1 }} align={"center"}>
                  <Button
                    type="submit"
                    variant="contained" sx={{ width: 230 }}>
                    Restablecer
                  </Button>
                </Grid>

              </CardContent>
            </Card>
          </form>
        </Card>
      </Box>
    </div>
  );
}


