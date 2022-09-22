import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Cart from "./Cart";
import style from "./cart.module.css";
import CardActions from "@mui/material/CardActions";

function CartTotal(props) {
  let initialState = {
    cart: props.cart,
    pay: false,
  };

  const [cart, setCart] = useState(initialState);

  function handleOnclick(e) {
    e.preventDefault();
    setCart({...cart, cart: cart.cart.filter((d) => parseInt(d.idPayStudents) !== parseInt(e.target.id))});
  }
  //// si se queda CART en cero, se retorna a pagos pendientes
  useEffect(() => {
    if (!cart.cart[0]) props.onClickTotalCart();
  }, [cart.cart]);

  let suma = 0;
  cart.cart.forEach((element) => {
    suma = suma + element.amount;
  });

  return (
    <div>
      {cart.pay ? (
        <Cart
          suma={suma}
          idPayStudents={cart.cart.map((t) => t.idPayStudents)}
        />
      ) : (
        <div className={style.container}>
          <form className={style.form}>
            {cart.cart?.map((e) => (
              <Box sx={{ mt: 1 }}>
                <Card
                  variant="outlined"
                  style={{ margin: "0 auto", pading: "20px 5px" }}
                  sx={{ maxWidth: 500 }}
                >
                  <CardContent>
                    <Grid xs={12} sm={6} sx={{ m: 1 }} item>
                      <Typography align="center" gutterBottom variant="h5">
                        {`${e.students}`}
                      </Typography>
                    </Grid>

                    <Divider />

                    <Grid xs={12} sm={6} sx={{ m: 1 }} item>
                      <Typography gutterBottom variant="h5">
                        Asunto
                      </Typography>
                      <Typography gutterBottom variant="h6">
                        {e.subject}
                      </Typography>
                    </Grid>
                    <Grid sx={{ m: 1, flexGrow: 1 }}>
                      <Box xs={12} sm={6} item>
                        <Typography gutterBottom variant="h5"></Typography>
                      </Box>
                    </Grid>
                    <Grid xs={12} sm={6} sx={{ m: 1 }} item>
                      <Grid
                        container
                        direction="row"
                        justifyContent="space-around"
                        alignItems="baseline"
                      >
                        <CardActions>
                          <Typography gutterBottom variant="h6">
                            ${e.amount}
                          </Typography>
                        </CardActions>
                        <Grid>
                          <Button
                            size="large"
                            color="error"
                            variant="outlined"
                            name="delete"
                            onClick={handleOnclick}
                            id={e.idPayStudents}
                          >
                            Eliminar{" "}
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Box>
            ))}
            <Card>
              <Grid xs={12} sm={6} sx={{ m: 1 }} item>
                <h2 >Total: {suma}</h2>
                <img
                  src="https://images.pexels.com/photos/210742/pexels-photo-210742.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="img"
                  width="150"
                />
                <Typography
                  size="large"
                  align="center"
                  variant="outlined"
                ></Typography>
                <Button
                  align="center"
                  variant="outlined"
                  name="pay"
                  onClick={(e) => setCart({ ...cart, pay: true })}
                >
                  Realizar Pago
                </Button>
              </Grid>
            </Card>
          </form>
        </div>
      )}
    </div>
  );
}

export default CartTotal;
