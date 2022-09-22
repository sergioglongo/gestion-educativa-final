import { FormControl, Rating, Grid, Button, Divider, Card, Typography, CardContent, Stack, InputLabel } from '@mui/material';
import { useState } from 'react';

export default function NotificationDetail({ notification, handleClose, handleOnCheck,handleOnScore }) {
    const [score, setScore] = useState(notification?.notifications_students?.score)

    function handleRating(event, newValue) {
        setScore( newValue )
    }

    function handleOnClose() {
        if (notification?.notifications_students?.score !== score) {
            handleOnScore(notification.notifications_students.idNotificationStu,score)
        }
        handleClose()
    }

    function handleOnCheckDetail() {
        handleOnCheck(notification.notifications_students.idNotificationStu)
        handleClose()
    }

    return (
        <Card style={{ margin: "0 auto", pading: "20px 5px" }} fullWidth>
            <CardContent >
                <Typography gutterBottom variant="h5" >Detalles de Notificacion</Typography>
                <Divider variant="middle" />
                <Grid xs={12} sm={6} item>
                    <Typography gutterBottom variant="h5" >{notification?.subject}</Typography>
                </Grid>
                <Divider variant="middle" />
                <Grid xs={12} sm={6} item>
                    <Typography gutterBottom variant="body1" >{notification?.body}</Typography>
                </Grid>
                <Grid xs={6} sm={6} item>
                    {notification?.review ?
                        <div>
                            <InputLabel htmlFor="score" sx={{ mt: 1, mb: 1 }}>Valoración solicitada</InputLabel>
                            <FormControl>
                                <Stack spacing={2}><Rating value={score} onChange={(event, newValue) => (handleRating(event, newValue))} /></Stack>
                            </FormControl>
                        </div>
                        : ""
                    }
                </Grid>
                <Grid xs={12} sm={6} item>
                    {notification?.check ? notification?.notifications_students?.checkState ?
                        <Button variant="outlined" onClick={handleClose} sx={{ m: 1 }} disabled>Confirmar </Button>
                        : <Button variant="outlined" onClick={handleOnCheckDetail}>Confirmar</Button>
                        : ""
                    }
                    {notification?.pay ? <Button variant="outlined" name="pay" onClick={handleClose} sx={{ m: 1 }} >Pagos</Button> : ""
                    }
                    <Button variant="outlined" onClick={handleOnClose} sx={{ m: 1 }}>Cerrar</Button>
                </Grid>
            </CardContent>
        </Card >
    )
}