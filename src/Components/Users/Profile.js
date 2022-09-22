import { useEffect } from "react"
import { useState } from "react"
import { TextField, Grid, Button, Divider, Card, Typography, CardContent, Box } from '@mui/material';
import { useSelector } from 'react-redux';


export default function Profile() {
    
    const [user, setUser] = useState()
    const userState = useSelector(state => state.user)

    useEffect(() => {
        setUser(userState[0])
    }, [userState])

    return (
        <Box sx={{ mt: 10 }} >
            <Card variant="outlined" style={{ margin: "0 auto", pading: "20px 5px" }} sx={{ maxWidth: 500}}>
                
                <CardContent >
                    <Typography gutterBottom variant="h3" >Perfil</Typography>
                    <Divider variant="middle" />
                    <Grid xs={12} sm={6} sx={{ m: 1 }} item>
                        <Typography gutterBottom variant="h6" >Apellido y Nombre </Typography>
                        <Typography gutterBottom variant="h5" >{user?.lastName} {user?.firstNames} </Typography>
                    </Grid>
                    <Grid xs={12} sm={6} sx={{ m: 1 }} item>
                        <Typography gutterBottom variant="h6" >Email/Usuario </Typography>
                        <TextField id="email" variant="standard" value={user?.email} sx={{ mr: 2 }}/>
                        <Button variant="outlined" >Actualizar mail</Button>
                    </Grid>
                    <Grid xs={12} sm={6} item sx={{ m: 1 }} >
                        <Typography gutterBottom variant="h6" >Telefono </Typography>
                        <TextField id="phone" variant="standard" value={user?.phone} sx={{ mr: 2 }}/>
                        <Button variant="outlined" >Actualizar telefono</Button>
                    </Grid>
                    <Grid xs={12} sm={6} item sx={{ m: 1 }}>
                    <Typography gutterBottom variant="h5" >Niños a cargo </Typography>
                        {user?.students?.map(student=>
                            <Typography gutterBottom variant="h6">{student?.firstNames} {student?.lastName}</Typography> )}
                    </Grid>
                    <Button variant="outlined">Cancelar</Button>
                </CardContent>
            </Card>
        </Box>
    )
}