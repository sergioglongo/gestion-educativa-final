import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNews } from "../../redux/actions";
import Carousel from "../News/Carousel";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import { Grid } from "@mui/material";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import SmsIcon from "@mui/icons-material/Sms";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";

const LandingPage = () => {
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNews());
  }, [dispatch]);

  const news = useSelector((state) => state.news);
  const styles = {
    numberStyle: {
      width: 50,
      height: 50,
      color: "white",
      backgroundColor: "#1976d2",
    },
    borderText: {
      border: `1.5px solid #bdbdbd`,
      p: 2.5,
      backgroundColor: "white",
      borderRadius: 1,
      width: "100%",
    },
  };

  const style = {
    display: { xs: "none", sm: "block" },
    width: { xs: "20rem", sm: "25rem" },
    height: { xs: "20rem", sm: "25rem" },
    marginTop: { xs: "15rem", sm: "15rem" },
    marginRight: { lg: "5rem" }
  };

  const cardStyle = {
    p: 2,
    my: 2,
  };

  return (
    <div>
          <CssBaseline>
        <Grid container spacing={8} direction="column">

      <Grid item>
      <a id="inicio"></a>

              <Box sx={{ p: { xs: 6.5, sm: 3, lg: 16, backgroundImage: `url(${"https://res.cloudinary.com/do9ddo9my/image/upload/v1663726237/ceb8o9r6fpwnblby648k.png"})` } }}>
                <Typography
                  color="#545454"
                  mb={5}
                  sx={{
                    fontWeight: "bold",
                    textAlign: { xs: "center", sm: "left" },
                    fontSize: { xs: "1.4em", sm: "3em", lg: "3.5em" },
                    maxWidth: "20ch"
                  }}
                >
                  Mejoramos la comunicación entre el colegio y las familias
                </Typography>
                <Button sx={{ fontSize: "1rem", p: 3 }} variant="contained">
                  CONTACTENOS
                </Button>
              </Box>

          </Grid>
          <Grid item >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "1.5rem",
          textAlign: "center",
          px: 3,
        }}
      >
        <Typography sx={{ fontWeight: "bold" }} variant="h3">
          Sección de noticias
        </Typography>
        </Box>


        <Carousel news={news} />


        </Grid>
        <Grid item >


      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "1.5rem",
          textAlign: "center",
          px: 3,
        }}
      >
        <Typography sx={{ fontWeight: "bold" }} variant="h3">
          Funcionalidades principales
        </Typography>
        <Typography sx={{ color: "gray" }}>
          Varias funcionalidades para padres, profesores y alumnos, teniendo en
          cuenta las distintas necesidades de cada uno.
        </Typography>
        <Grid
          container
          direction={{ xs: "column", md: "row" }}
          justifyContent="center"
          alignItems="center"
          spacing={4}
          sx={{ maxWidth: "75rem" }}
        >
          {/* SERVICE 1 */}
          <Grid item xs={4}>
            <Card sx={cardStyle}>
              <Stack justifyContent="center" alignItems="center" spacing={2}>
                <Avatar sx={{ width: 60, height: 60 }}>
                  <AssignmentTurnedInIcon sx={{ fontSize: 40 }} />
                </Avatar>
                <Typography variant="h5">
                  Reducción de tareas administrativas{" "}
                </Typography>
                <Typography sx={{ lineHeight: "2", color: "gray" }}>
                  Ahorra tiempo en tareas administrativas a la hora de enviar
                  mensajes a múltiples grupos, hacer preguntas, pedir
                  autorizaciones, enviar recordatorios, etc.{" "}
                </Typography>
              </Stack>
            </Card>
          </Grid>

          {/* SERVICE 2 */}
          <Grid item xs={4}>
            <Card sx={cardStyle}>
              <Stack justifyContent="center" alignItems="center" spacing={2}>
                <Avatar sx={{ width: 60, height: 60 }}>
                  <SupervisorAccountIcon sx={{ fontSize: 40 }} />
                </Avatar>
                <Typography variant="h5">Padres contentos</Typography>
                <Typography sx={{ lineHeight: "2", color: "gray" }}>
                  Es un hecho probado que mejorando la comunicación
                  escuela-familia se aumenta la implicación de los padres en la
                  educación de sus hijos. Y cuanto mayor es la implicación de
                  los padres, mejores son los resultados que obtienen los
                  alumnos.{" "}
                </Typography>
              </Stack>
            </Card>
          </Grid>

          {/* SERVICE 3 */}
          <Grid item xs={4}>
            <Card sx={cardStyle}>
              <Stack justifyContent="center" alignItems="center" spacing={2}>
                <Avatar sx={{ width: 60, height: 60 }}>
                  <SmsIcon sx={{ fontSize: 40 }} />
                </Avatar>
                <Typography variant="h5">Comunicación más eficiente</Typography>
                <Typography sx={{ lineHeight: "2", color: "gray" }}>
                  Olvídate de emails, SMS, papeles y grupos de Whatsapp. Verás
                  que la comunicación es mucho más eficiente y fluída.
                </Typography>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Box>
      </Grid>
      <Grid item>

      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: "100%",
          justifyContent: "center",
          p: 5,
          my: 4,
        }}
      >
        <Stack
          spacing={10}
          direction={{ xs: "column", sm: "row" }}
          sx={{ textAlign: { xs: "center", sm: "left" } }}
        >
          <Typography sx={{ fontWeight: "bold" }} variant="h4">
            Más funciones:
          </Typography>
          
          {/* Items */}
          <Stack direction="column" spacing={4} sx={{ color: "#818589" }}>
            {/* 1 */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              alignItems="center"
              spacing={2}
            >
              <Avatar sx={{ color: "white", backgroundColor: "#1976d2" }}>
                1
              </Avatar>
              <Typography variant="h6" sx={styles.borderText}>
                Duly Accomplished Application Form
              </Typography>
            </Stack>

            {/* 2 */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              alignItems="center"
              spacing={2}
              sx={{ pl: { md: 5 } }}
            >
              <Avatar sx={styles.numberStyle}>2</Avatar>
              <Stack alignItems="flex-start" sx={styles.borderText}>
                <Typography variant="h6">DTI or SEC Registration</Typography>
              </Stack>
            </Stack>

            {/* 3 */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              alignItems="center"
              spacing={2}
            >
              <Avatar sx={{ color: "white", backgroundColor: "#1976d2" }}>
                3
              </Avatar>
              <Typography variant="h6" sx={styles.borderText}>
                Barangay Clearance
              </Typography>
            </Stack>

            {/* 4 */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              alignItems="center"
              spacing={2}
              sx={{ pl: { md: 5 } }}
            >
              <Avatar sx={styles.numberStyle}>4</Avatar>
              <Stack alignItems="flex-start" sx={styles.borderText}>
                <Typography variant="h6">
                  Tax Clearance or Certification of No Real Properties
                </Typography>
              </Stack>
            </Stack>

            {/* 5 */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              alignItems="center"
              spacing={2}
            >
              <Avatar sx={{ color: "white", backgroundColor: "#1976d2" }}>
                5
              </Avatar>
              <Stack alignItems="flex-start" sx={styles.borderText} spacing={1}>
                <Typography variant="h6">Locational Clearance </Typography>
                <Typography>
                  City Planning and Devt. Dept. -Local Zoning Administration,
                  7/F City Hall)
                </Typography>
              </Stack>
            </Stack>

            {/* 6 */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              alignItems="center"
              spacing={2}
              sx={{ pl: { md: 5 } }}
            >
              <Avatar sx={styles.numberStyle}>6</Avatar>
              <Stack alignItems="flex-start" sx={styles.borderText}>
                <Typography variant="h6">
                  Certificate of Occupancy/Clearance
                </Typography>
                <Typography>
                  from the Local Building Official (4/F City Hall)
                </Typography>
              </Stack>
            </Stack>

            {/* 7 */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              alignItems="center"
              spacing={2}
            >
              <Avatar sx={{ color: "white", backgroundColor: "#1976d2" }}>
                7
              </Avatar>
              <Stack alignItems="flex-start" sx={styles.borderText} spacing={1}>
                <Typography variant="h6">Health Certificate </Typography>
                <Typography>from City Health Dept., 8/F City Hall</Typography>
              </Stack>
            </Stack>

            {/* 8 */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              alignItems="center"
              spacing={2}
              sx={{ pl: { md: 5 } }}
            >
              <Avatar sx={styles.numberStyle}>8</Avatar>
              <Stack alignItems="flex-start" sx={styles.borderText}>
                <Typography variant="h6">
                  Community Tax Certificate (Cedula)
                </Typography>
              </Stack>
            </Stack>

            {/* 9 */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              alignItems="center"
              spacing={2}
            >
              <Avatar sx={{ color: "white", backgroundColor: "#1976d2" }}>
                9
              </Avatar>
              <Stack alignItems="flex-start" sx={styles.borderText} spacing={1}>
                <Typography variant="h6">
                  Fire Safety Inspection Certificate (FSIC)
                </Typography>
              </Stack>
            </Stack>

            {/* 10 */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              alignItems="center"
              spacing={2}
              sx={{ pl: { md: 5 } }}
            >
              <Avatar sx={styles.numberStyle}>10</Avatar>
              <Stack alignItems="flex-start" sx={styles.borderText}>
                <Typography variant="h6">
                  CENRO Form (Hygienic Septic Tank)
                </Typography>
              </Stack>
            </Stack>

            {/* 11 */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              alignItems="center"
              spacing={2}
            >
              <Avatar sx={{ color: "white", backgroundColor: "#1976d2" }}>
                11
              </Avatar>
              <Stack alignItems="flex-start" sx={styles.borderText} spacing={1}>
                <Typography variant="h6">
                  PESO Form (City Ordinance No. 07-2003)
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Box>
            </Grid>
            <Grid item>
      <Stack
        justifyContent="center"
        sx={{
          backgroundColor: "#1976d2",
          width: "100%",
          height: "10rem",
          p: 3,
        }}
      >
        <Typography sx={{ textAlign: "center", color: "white" }}>
          @ Copyright 2022 Official website of the City Government of Malabon.
        </Typography>
      </Stack>
      </Grid>

      </Grid>
    </CssBaseline>
    </div>
  );
};

export default LandingPage;
/*
              <Avatar
                sx={style}
                alt="people"
                src="https://www.bdo.com.ph/sites/default/files/images/Body%20-%20Article%20=%20How%20to%20invest%20in%20the%20Philippine%20Stock%20Market%20-%20Location%20=%20above%20How%20to%20make%20money%20investing%20in%20the%20stock%20ma.jpg"
              />
*/