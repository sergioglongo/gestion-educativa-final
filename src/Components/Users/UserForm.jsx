import { FormControl, Checkbox, InputLabel, Grid, Autocomplete, Button, Select, MenuItem, FormControlLabel, Card, Typography, CardContent, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllStudents } from '../Students/studentsActions'
import {getAllTypeUsers} from '../../redux/actions'

export default function UserForm({ user, mode, handleClose, dataForm, title }) {
    
    let studentsAllState = useSelector(state => state.students)
    let typeUsersAllState = useSelector(state => state.typeUsers)
    const dispatch = useDispatch()
    const studentsAllFormated = studentsAllState?.map(student => {
        return {
            idStudent: student.idStudent,
            firstNames: student.firstNames,
            lastName: student.lastName,
            course: student.course
        }
    })
    const [studentsIdUserState, setStudentsIdUserState] = useState([])
    
    
    
    useEffect(() => {
        //Si no hay un estudiante 0 en el estado redux trae del back para llenar Autocomplete
        if (!studentsAllState[0])
        dispatch(getAllStudents())
        if(!typeUsersAllState[1])
        dispatch(getAllTypeUsers())
        //si el modo es edit obtiene los estudiantes que recibieron la notificacion
        if (mode === "edit") {
            let studentsIdUser = user?.students?.map(student => {
                return {
                    idStudent: student.idStudent,
                    firstNames: student.firstNames,
                    lastName: student.lastName,
                    course: student.course.nameCourse
                }
            })
            //guardo en estado local los estudiantes que recibieron la notificacion para completar el valueDefault de Autocomplete
            setStudentsIdUserState(studentsIdUser)
        }
    }, [dispatch,mode, studentsAllState, typeUsersAllState,user.students])

    
    
    const [formData, setFormData] = useState({
        idUser: user?.idUser,
        firstNames: user.firstNames ? user.firstNames : '',
        lastName: user.lastName ? user.lastName : '',
        phone: user.phone ? user.phone : '',
        email: user.email ? user.email : '',
        active: user.active ? user.active : true,
        typeuserIdTypeUsers: user?.typeuserIdTypeUsers ? user?.typeuserIdTypeUsers : null,
        students:[]
    })
    const { firstNames, lastName, active, phone, email, typeuserIdTypeUsers} = formData
    
    function handledOnChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    function handledOnCheck(e) {
        setFormData({ ...formData, active: e.target.checked })
    }

    function handledOnClick() {
        // console.log("Datos de formulario", formData);
        dataForm(formData, mode)
        // console.log("valores seleccionados:",studentsidStudenttate);
        setTimeout(function () {
            handleClose()
        }, 2000);
    }

    function handleAutoComplete(value) {
        setStudentsIdUserState(value)
        setFormData({ ...formData, students: value })
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
                <Grid xs={12} sm={6} item>
                    <FormControl fullWidth sx={{ mt: 1 }}>
                        <TextField name="phone" type="text" label="Teléfono"
                            onChange={e => handledOnChange(e)} sx={{ mb: 1.5 }} placeholder="Ingrese Nº de DNI"
                            variant="outlined" aria-describedby="lastName-Helper" value={phone} required />
                    </FormControl>
                </Grid>
                <Grid xs={12} sm={6} item>
                    <FormControl fullWidth sx={{ mt: 1 }}>
                        <TextField name="email" type="email" label="Correo"
                            onChange={e => handledOnChange(e)} sx={{ mb: 1.5 }}
                            variant="outlined" aria-describedby="lastName-Helper" value={email} required />
                    </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                    <InputLabel htmlFor="review" sx={{ mt: 1, mb: 1 }}>Tipo de Usuario</InputLabel>
                    <Select name="typeuserIdTypeUsers" displayEmpty label="Curso" onChange={e => handledOnChange(e)} value={typeuserIdTypeUsers} sx={{ width:200 }}>
                        {typeUsersAllState?.map(typeUser => (
                            <MenuItem key={typeUser.idTypeUsers} value={typeUser.idTypeUsers}>{typeUser.typeUsers}</MenuItem>
                        ))
                        }
                    </Select>
                </Grid>
                {typeUsersAllState[typeuserIdTypeUsers-1]?.typeUsers==="Tutor"?
                <Grid xs={12} sm={6} item>
                   <InputLabel htmlFor="review" sx={{ mt: 1, mb: 1 }}>Alumnos a cargo</InputLabel>
                    <Autocomplete
                        multiple
                        xs={12} sm={6}
                        limitTags={3}
                        id="multiple-limit-tags"
                        disableCloseOnSelect = {true}
                        options={studentsAllFormated}
                        value={studentsIdUserState}
                        onChange={(e, value) => handleAutoComplete(value)}
                        isOptionEqualToValue={(option, value) => option.idStudent === value.idStudent}
                        getOptionLabel={(option) => `${option.firstNames} ${option.lastName} ${option.course}`}
                        defaultValue={studentsIdUserState}
                        renderInput={(params) => (
                            <TextField {...params}  placeholder="agregar alumno" />
                        )}
                    />
                </Grid>
                    :""}

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