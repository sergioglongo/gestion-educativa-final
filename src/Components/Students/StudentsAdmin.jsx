import * as React from 'react';
import MUIDataTable from "mui-datatables";
import { FormControl, Checkbox, Box, Grid, Button, FormControlLabel, Typography } from '@mui/material';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DialogContainer from '../Layout/DialogContainer'
import { getAllStudents, studentActDes, studentCreate, studentEdit } from './studentsActions'
import StudentForm from './StudentForm'
import { getAllCourses } from './studentsActions'

export default function StudentsAdmin() {

    const dispatch = useDispatch()
    //traigo las notificaciones que estan en el estado
    let studentsState = useSelector(state => state.students)
    let coursesAll = useSelector(state => state.courses)

    const [change, setChange] = useState(false)

    useEffect(() => {
        dispatch(getAllStudents())
        dispatch(getAllCourses())

    }, [dispatch, change])


    const [studentSelected, setStudentSelected] = useState({})
    const [mode, setMode] = useState("new")
    const [title, setTitle] = useState("Crear Alumno")
    const [open, setOpen] = useState(false);
    const [studentsRows, setStudentsRows] = useState([])

    function dataForm(data, mode) {
        let dataFormated = {
            idStudent: data?.idStudent ? data?.idStudent : null,
            firstNames: data.firstNames,
            lastName: data.lastName,
            active: data.active,
            dniStudent: data.dniStuden,
            birthDate: data.birthDate,
            idCourse: data?.idCourse
        }
        if (mode === "new") {
            studentCreate(dataFormated)
            console.log("Data enviada a back", dataFormated);
        }
        else {
            studentEdit(dataFormated)
        }
        setChange(!change)

    }

    function handleClickOpen() {
        setOpen(true);
    };

    function handleClose() {
        setOpen(false);
    };

    function handleOnclickNewEdit(student, mode, title) {
        setStudentSelected(student)
        setMode(mode)
        setTitle(title)
        handleClickOpen()
    }

    function handleOnClickActDes(idStudent, active) {
        studentActDes({ idStudent, active })
        setChange(!change)

    }
    // console.log(notifications);
    let studentsRowsFormated = studentsState?.map((student) => {

        let fecha = student.birthDate.split('-')
        let fechaFormated = `${fecha[2]}/${fecha[1]}/${fecha[0]}`
        return ([student?.firstNames, student?.lastName, student?.dniStudent, fechaFormated, student?.course?.nameCourse,
        student?.active ? "Activo" : "Inactivo",
        <FormControl >
            <FormControlLabel control={<Checkbox checked={student?.active} />} name="active" value={student?.active} />
        </FormControl>,
        <div key={student?.idstudent}>
            <Button variant="outlined" onClick={() => handleOnclickNewEdit(student, "edit", "Editar Alumno")} >Editar</Button>
            <Button variant="outlined" onClick={() => handleOnClickActDes(student?.idStudent, !student?.active)} >Act/Des</Button>
        </div>]
        )

    })

    useEffect(() => {
        setStudentsRows(studentsRowsFormated)
        // eslint-disable-next-line
    }, [studentsState])

    let columns = [
        {
            name: "firstNames",
            label: "Nombres",
            options: { filter: false, sort: true }
        },
        {
            name: "lastName",
            label: "Apellido",
            options: { filter: true, sort: true }
        },
        {
            name: "dniStudent",
            label: "DNI Nº",
            options: { filter: false, sort: true }
        },
        {
            name: "birthDate",
            label: "Nacimiento",
            options: { filter: false, sort: false }
        },
        {
            name: "course",
            label: "Curso",
            options: { filter: true, sort: true, searchable: false }
        },
        {
            name: "activeHide",
            label: "Activo",
            options: { filter: true, sort: false, display: 'false' }
        },
        {
            name: "active",
            label: "Activo",
            options: { filter: false, sort: true }
        },
        {
            name: "acciones",
            label: "Acciones",
            options: { filter: false, sort: false }
        },

    ]

    const options = {
        search: true,
        download: false,
        print: false,
        viewColumns: false,
        filter: true,
        filterType: "multiselect",
        elevation: 2,
        rowsPerPageOptions: [10, 15, 30, 100],
        tableBodyHeight: '100%',
        tableBodyMaxHeight: '100%',
        searchPlaceholder: "nombre / apellido / dni / nacimiento",
        searchAlwaysOpen: true,
        selectableRows: "none",
        responsive: "vertical",
        hideSelectColumn: true,

        textLabels: {
            body: {
                noMatch: "Disculpa, no se encontraron registros",
                toolTip: "Ordenar",
                columnHeaderTooltip: column => `Ordenar por ${column.label}`
            },
            pagination: {
                next: "Siguiente",
                previous: "Anterior",
                rowsPerPage: "Filas por Pagina:",
                displayRows: "of",
            },
            toolbar: {
                search: "Buscar",
                downloadCsv: "Download CSV",
                print: "Print",
                viewColumns: "View Columns",
                filterTable: "Filtrar Tabla",
            },
            filter: {
                all: "Todos",
                title: "FILTROS",
                reset: "Restablecer",
            },
            viewColumns: {
                title: "Show Columns",
                titleAria: "Show/Hide Table Columns",
            },
            selectedRows: {
                text: "fila(s) seleccionadas",
                delete: "Borrar",
                deleteAria: "Quitar Filas Seleccionadas",
            },
        }
    }

    return (
        <div>
            <div>
                <Typography align={"center"} sx={{ mt: 2 }} gutterBottom variant="h4" >Administración de Alumnos</Typography>
                <Box sx={{ ml: 2 }}>
                    <Button variant="outlined" onClick={() => handleOnclickNewEdit({}, "new", "Crear de Alumno")}>Crear Alumno</Button>
                </Box>
                <Box sx={{ m: 2 }}>
                    <MUIDataTable
                        title={"Listado de Alumnos"}
                        data={studentsRows}
                        columns={columns}
                        options={options}
                    />
                </Box>

            </div>
            <Grid Container >
                <DialogContainer open={open}  ><StudentForm student={studentSelected} courses={coursesAll} mode={mode} handleClose={handleClose} title={title} dataForm={dataForm} /></DialogContainer>
            </Grid>
        </div>
    )
}
