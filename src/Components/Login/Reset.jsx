import { useState } from "react";
import { resetPassword } from "../../redux/actions";
import style from "./reset.module.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cleanerUser } from "../../redux/actions";
import Validation from "./Validation";
import { Box } from "@mui/system";
import { Button, Card, CardContent, FormControl, Grid, TextField, Typography } from "@mui/material";
import swal from "sweetalert";


export default function Reset() {
  let dispatch = useDispatch();
  let navigate = useNavigate();

  let initialStateError = {
    email: false,
    messageEmail: "Correo",
  }

  const [email, setEmail] = useState("");
  const [error, setError] = useState(initialStateError)

  async function handleOnSubmit(e) {
    e.preventDefault();
    if(!email) return swal("Ingrese ", "correo electronico!", "error")
   
    let response = await resetPassword({ type: "RESET", email: email })
    
    if(response.type === "success"){
      swal(response.message, "", "success")
      dispatch(cleanerUser());
      setEmail("")
      navigate("/login");
    } else{
      swal(response.message, "", "error")
    }
  }

  function handleOnChange(e) {
    const result = Validation(e.target.name, e.target.value)
    switch (result.type) {
      case "email":
        if (result.status === "error") {
          setError({ ...error, email: true, messageEmail: result.email })
        } else if (result.status === "ok") {
          setError({ ...error, email: false, messageEmail: result.email })
        }
        setEmail(e.target.value);
        break;

      default: return setEmail(e.target.value);
    }
    setEmail(e.target.value);

  }
  return (
    <div>
      <Box sx={{ mt: 10 }} >
        <Card variant="outlined" style={{ margin: "0 auto", pading: "20px 5px" }} sx={{ maxWidth: 350 }}>
          <form onSubmit={handleOnSubmit}>
            <Card style={{ margin: "0 auto", pading: "20px 5px" }} >
              <CardContent >
                <Typography gutterBottom variant="h5" align={"center"} >Restablecer contraseña</Typography>

                <Grid xs={12} sm={6} align={"center"} item>
                  <FormControl sx={{ mt: 1 }}>
                    <TextField name="email" size="sm"
                      label={error.messageEmail} type="email" onChange={(e) => handleOnChange(e)}
                      placeholder="Ingrese Correo" sx={{ mb: 1.5 }} variant="outlined"
                      aria-describedby="subject-Helper" value={email}
                      error={error.email}
                    />
                  </FormControl>
                </Grid>


                <Grid xs={12} sm={6} item sx={{ mt: 1 }} align={"center"}>
                  <Button type="submit" variant="contained" sx={{ width: 230 }}>
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
