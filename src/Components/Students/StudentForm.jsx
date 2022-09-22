import { FormControl, Checkbox, InputLabel, Grid, Button, Select, MenuItem, FormControlLabel, Card, Typography, CardContent, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';

export default function NotificationForm({ student, mode, courses, handleClose, dataForm, title }) {

    
    const [formData, setFormData] = useState({
        idStudent: student?.idStudent,
        firstNames: student.firstNames ? student.firstNames : '',
        lastName: student.lastName ? student.lastName : '',
        active: student.active ? student.active : true,
        dniStudent: student.dniStudent ? student.dniStudent : '',
        birthDate: student.birthDate ? student.birthDate : '',
        idCourse: student?.idCourse ? student?.idCourse : null
    })
    const { firstNames, lastName, active, birthDate, dniStudent, idCourse } = formData

    function handledOnChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    function handledOnCheck(e) {
        setFormData({ ...formData, active: e.target.checked })
    }

    function handledOnClick() {
        // console.log("Datos de formulario", formData);
        dataForm(formData, mode)
        console.log("data enviada", formData);
        // console.log("valores seleccionados:",studentsidStudenttate);
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
                        <TextField name="firstNames"
                            label="Nombre" type="text" onChange={e => handledOnChange(e)}
                            placeholder="Ingrese nombre" sx={{ mb: 1.5 }} variant="outlined"
                            aria-describedby="firstNames-Helper" value={firstNames} required />
                    </FormControl>
                </Grid>
                <Grid xs={12} sm={6} item>
                    <FormControl fullWidth sx={{ mt: 1 }}>
                        <TextField name="lastName" type="text" label="Apellido"
                            onChange={e => handledOnChange(e)} sx={{ mb: 1.5 }} placeholder="Ingrese apellido"
                            variant="outlined" aria-describedby="lastName-Helper" value={lastName} required />
                    </FormControl>
                </Grid>
                <Grid xs={6} sm={3} item>
                    <FormControl sx={{ mt: 1 }}>
                        <TextField name="dniStudent" type="number" label="DNI Nº"
                            onChange={e => handledOnChange(e)} sx={{ mb: 1.5 }} placeholder="Ingrese Nº de DNI"
                            variant="outlined" aria-describedby="lastName-Helper" value={dniStudent} required />
                    </FormControl>
                </Grid>
                <Grid xs={6} sm={3} item>
                <InputLabel htmlFor="review" sx={{ mt: 1, mb: 1 }}>Fecha Nacimiento</InputLabel>
                    <FormControl sx={{ mt: 1 }}>
                        <TextField name="birthDate" type="date" 
                            onChange={e => handledOnChange(e)} sx={{ mb: 1.5 }}
                            variant="outlined" aria-describedby="lastName-Helper" value={birthDate} required />
                    </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                    <InputLabel htmlFor="review" sx={{ mt: 1, mb: 1 }}>Curso</InputLabel>
                    <Select name="idCourse" displayEmpty label="Curso" onChange={e => handledOnChange(e)} value={idCourse} sx={{ width:150 }}>
                        {courses?.map(course => (
                            <MenuItem key={course.idCourse} value={course.idCourse}>{course.nameCourse}</MenuItem>
                        ))
                        }
                    </Select>
                </Grid>
                <Grid xs={12} sm={6} item>
                    <FormControl >
                        <FormControlLabel control={<Checkbox checked={active} />} name="active" onChange={e => handledOnCheck(e)} label="Activo" />
                    </FormControl>
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