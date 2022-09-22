import { FormControl, Autocomplete, Checkbox,  InputLabel,  Grid, Button,   FormControlLabel, Card, Typography, CardContent, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllStudents } from '../Students/studentsActions'

export default function NotificationForm({ notification, mode, handleClose, dataForm, title }) {

    const studentsAllState = useSelector(state => state.students)
    const studentsAllFormated = studentsAllState?.map(student => {
        return {
            idStudent: student.idStudent,
            firstNames: student.firstNames,
            lastName: student.lastName,
            course: student.course
        }
    })
    const [studentsIdNotificationState, setStudentsIdNotificationState] = useState([])
    let user = useSelector(state => state.user)
    const dispatch = useDispatch()

    //Obtencion de Alumnos para llenar combo
    useEffect(() => {
        //Si no hay un estudiante 0 en el estado redux trae del back para llenar Autocomplete
        if (!studentsAllState[0])
            dispatch(getAllStudents())
        //si el modo es edit obtiene los estudiantes que recibieron la notificacion
        if (mode === "edit") {
            let studentsIdNotification = notification?.students?.map(student => {
                return {
                    idStudent: student.idStudent,
                    firstNames: student.firstNames,
                    lastName: student.lastName,
                    course: student.course.nameCourse
                }
            })
            //guardo en estado local los estudiantes que recibieron la notificacion para completar el valueDefault de Autocomplete
            setStudentsIdNotificationState(studentsIdNotification)
        }
    }, [dispatch,notification.students,studentsAllState,mode])

    const [formData, setFormData] = useState({
        idNotifications: notification?.idNotifications,
        subject: notification.subject ? notification.subject : '',
        body: notification.body ? notification.body : '',
        active: notification.active ? notification.active : true,
        check: notification.check ? notification.check : false,
        pay: notification.pay ? notification.pay : false,
        review: notification.review ? notification.review : false,
        senderId: user[0]?.idUser ? user[0]?.idUser : 1,
        idStudent: studentsIdNotificationState.idStudent ? studentsIdNotificationState.idStudent : []
    })
    const { subject, body, active, pay, review, check } = formData

    function handledOnChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    function handleChecks(e) {
        setFormData({ ...formData, [e.target.name]: e.target.checked })
    }

    function handleAutoComplete(value) {
        setStudentsIdNotificationState(value)
        setFormData({ ...formData, idStudent: value })
    }

    function handledOnClick() {
        // console.log("Datos de formulario", formData);
        dataForm(formData, mode)
        // console.log("valores seleccionados:",studentsIdNotificationState);
        setTimeout(function () {
            handleClose()
        }, 2000);
    }

    return (
        <Card style={{ margin: "0 auto", pading: "20px 5px" }} fullWidth>
            <CardContent >
                <Typography gutterBottom variant="h5" >{title}</Typography>
                <Grid xs={12} sm={6} item>
                    <FormControl fullWidth sx={{ mt: 1 }}>
                        <TextField multiline rows={2} name="subject"
                            label="Asunto" type="text" onChange={e => handledOnChange(e)}
                            placeholder="Ingrese nombre" sx={{ mb: 1.5 }} variant="outlined"
                            aria-describedby="subject-Helper" value={subject} required />
                    </FormControl>
                </Grid>
                <Grid xs={12} sm={6} item>
                    <FormControl fullWidth sx={{ mt: 1 }}>
                        <TextField multiline rows={4} name="body" type="text" label="Decripción"
                            onChange={e => handledOnChange(e)} sx={{ mb: 1.5 }} placeholder="Ingrese apellido"
                            variant="outlined" aria-describedby="body-Helper" value={body} required />
                    </FormControl>
                </Grid>
                <Grid xs={12} sm={6} item>
                    <FormControl >
                        <FormControlLabel control={<Checkbox checked={active} />} name="active" onChange={handleChecks} label="Activa" />
                    </FormControl>
                    <FormControl >
                        <FormControlLabel control={<Checkbox checked={pay} />} name="pay" onChange={handleChecks} label="Pagos" />
                    </FormControl>
                    <FormControl >
                        <FormControlLabel control={<Checkbox checked={check} />} name="check" onChange={handleChecks} label="Confirma" />
                    </FormControl>
                    <FormControl >
                        <FormControlLabel control={<Checkbox checked={review} />} name="review" onChange={handleChecks} label="Valora" />
                    </FormControl>
                </Grid>
                <Grid xs={12} sm={6} item>
                    <InputLabel htmlFor="review" sx={{ mt: 1, mb: 1 }}>Destinatarios</InputLabel>

                    <Autocomplete
                        multiple
                        xs={12} sm={6}
                        limitTags={3}
                        id="multiple-limit-tags"
                        disableCloseOnSelect = {true}
                        options={studentsAllFormated}
                        value={studentsIdNotificationState}
                        onChange={(e, value) => handleAutoComplete(value)}
                        isOptionEqualToValue={(option, value) => option.idStudent === value.idStudent}
                        getOptionLabel={(option) => `${option.firstNames} ${option.lastName} ${option.course}`}
                        defaultValue={studentsIdNotificationState}
                        renderInput={(params) => (
                            <TextField {...params} label="agregar alumno" placeholder="agregar alumno" />
                        )}
                    />
                </Grid>
                <Grid xs={12} sm={6} item sx={{ mt: 1 }}>
                    <Button type="submit" onClick={handledOnClick} endIcon={<SendIcon />} variant="contained">
                        {mode === "new" ? "Crear" : "Editar"}
                    </Button>
                    <Button onClick={handleClose}>Cancelar</Button>
                </Grid>
            </CardContent>
        </Card>
    )
}