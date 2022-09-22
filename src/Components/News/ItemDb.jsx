import React from "react";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import { Grid, Divider, Button } from "@mui/material";

const Item = (props) => {
    return (
      <Grid container style={{ maxWidth: 1410, margin: "auto" }}>
        <Grid item md={8} sm={12}  sx={{ boxShadow: 2 }}>
          <CardMedia
            component="img"
            height="400"
            image={props.news?.image}  // props.img
            alt="Paella dish"
          />
        </Grid>
        <Grid item md={4} sm={12}>
          <CardContent>
            <Typography variant="h5" color="text.secondary">
            {props.news?.title}
            </Typography>
            <Divider variant="middle" sx={{ mt: 1 }} />
            <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
            {props.news?.body}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
            Creado por: {props.news.poster?.firstNames}
            </Typography>
          </CardContent>
          <CardActions disableSpacing bottom>
          <Button variant="contained">
                  Agregar a favoritos
              </Button>
              </CardActions>
      </Grid>
    </Grid>
  );
};

export default Item;
