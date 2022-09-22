import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/actions";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box, Button, Card, CardContent, FormControl, Grid, TextField, Typography } from "@mui/material";
import Validation from "./Validation";
import swal from "sweetalert";

export default function Login(props) {
  let dispatch = useDispatch();
  let navigate = useNavigate();

  const user = useSelector((state) => state.user);

  ////// LOGIN GOOOGLE
  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "486394313573-noddfecsuaim91rgmkknitask0qj6ed4.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "filled_blue",
      size: "large",
      width: "230"
    });
    // eslint-disable-next-line
  }, []);

  function handleCallbackResponse(response) {
    let object = jwt_decode(response.credential);
    dispatch(
      login({
        type: "GOOGLE",
        email: object.email,
      })
    );
  }


  ///// LOGIN LOCAL
  let initialState = {
    email: "",
    password: "",
  };

  let initialStateError = {
    email: false,
    messageEmail: "Correo",
    password: false,
    messagePasswrod: "Contraseña"
  }

  let [error, setError] = useState(initialStateError)
  let [input, setInput] = useState(initialState);


  function handleOnSubmit(e) {
    e.preventDefault();
    if(!input.email) return swal("Ingrese ", "correo electronico!", "error")
    dispatch(login({type: "LOCAL", email: input.email, password: input.password}))}

  useEffect(() => {
    if (user[1] === "LOCAL") {
      if (user[0].initialState === true) {
        navigate("/change");
      } else if (user[0].initialState === false) {
        navigate("/");
        localStorage.setItem("idUser", user[0]?.idUser ? user[0]?.idUser : 0)
        localStorage.setItem("typeUser", user[0] ? user[0]?.typeuser.typeUsers : 0)
        localStorage.setItem("userNames", user[0] ? `${user[0]?.firstNames} ${user[0]?.lastName}` : 0)
      }
    } else if (user[1] === "GOOGLE") {
      navigate("/");
      localStorage.setItem("idUser", user[0]?.idUser ? user[0]?.idUser : 0)
      localStorage.setItem("typeUser", user[0] ? user[0]?.typeuser.typeUsers : 0)
      localStorage.setItem("userNames", user[0] ? `${user[0]?.firstNames} ${user[0]?.lastName}` : 0)
    } else if (user.msg) {
      swal("Atención...", user.msg, "warning")
    }

  }, [user]);

  function handleOnChange(e) {

    const result = Validation(e.target.name, e.target.value)
 
    switch (result.type) {
      case "email":
        if (result.status === "error") {
          setError({ ...error, email: true, messageEmail: result.email })
        } else if (result.status === "ok") {
          setError({ ...error, email: false, messageEmail: result.email })
        }
        setInput({ ...input, [e.target.name]: e.target.value })
        break;

      case "password":
        if (result.status === "error") {
          setError({ ...error, password: true, messagePasswrod: result.password })
        } else {
          setError({ ...error, password: false, messagePasswrod: result.password })
          setInput({ ...input, [e.target.name]: e.target.value })
        }
  
      default: return  setInput({ ...input, [e.target.name]: e.target.value })
    }
  }

  return (
    <div>
      <Box sx={{ mt: 10 }} >
        <Card variant="outlined" style={{ margin: "0 auto", pading: "20px 5px" }} sx={{ maxWidth: 350 }}>
          <form onSubmit={handleOnSubmit}>
            <Card style={{ margin: "0 auto", pading: "20px 5px" }} >
              <CardContent >
                <Typography gutterBottom variant="h5" align={"center"} >Ingreso a Gestión Educativa</Typography>

                <Grid xs={12} sm={6} align={"center"} item>
                  <FormControl sx={{ mt: 1 }}>
                    <TextField name="email" size="sm"
                      label={error.messageEmail} type="email" onChange={(e) => handleOnChange(e)}
                      placeholder="Ingrese Correo" sx={{ mb: 1.5 }} variant="outlined"
                      aria-describedby="subject-Helper" value={input.email}
                      error={error.email}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} align={"center"} item>
                  <FormControl sx={{ mt: 1 }}>
                    <TextField name="password" size="sm"
                      label={error.messagePasswrod} type="password" onChange={e => (handleOnChange(e))}
                      placeholder="Ingrese contraseña" sx={{ mb: 1.5 }} variant="outlined"
                      aria-describedby="subject-Helper" value={input.password} required
                      error={error.password}

                    />

                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item sx={{ mt: 1 }} align={"center"}>
                  <Button type="submit" variant="contained" sx={{ width: 230 }}>
                    Iniciar
                  </Button>
                </Grid>


                <Grid xs={12} sm={6} item sx={{ mt: 3 }} align={"center"}>
                  <div id="signInDiv"></div>
                </Grid>

                <Grid xs={12} sm={6} item sx={{ mt: 3 }} align={"center"}>
                  <Link to="/reset">Restablecer contraseña</Link>
                </Grid>

              </CardContent>
            </Card>
          </form>
        </Card>
      </Box>
    </div>
  );
}
