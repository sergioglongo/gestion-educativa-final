import * as React from 'react';
import MUIDataTable from "mui-datatables";
import { FormControl, Checkbox, Box, Grid, Button, FormControlLabel, Typography } from '@mui/material';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DialogContainer from '../Layout/DialogContainer'
import { getAllUsers ,userActDes, userCreate, userEdit} from './usersActions'
import UserForm from './UserForm'

export default function UsersAdmin() {
    
    const dispatch = useDispatch()
    //traigo las notificaciones que estan en el estado
    let usersState = useSelector(state => state.users)

    const [change, setChange] = useState(false)

    useEffect(() => {
        dispatch(getAllUsers())
    }, [dispatch, change])


    const [userSelected, setUserSelected] = useState({})
    const [mode, setMode] = useState("new")
    const [title, setTitle] = useState("Crear Alumno")
    const [open, setOpen] = useState(false);
    const [usersRows, setUsersRows] = useState([])

    function dataForm(data, mode) {
        let dataFormated = {
            idUser: data?.idUser,
            firstNames: data?.firstNames,
            lastName: data?.lastName,
            phone: data?.phone,
            email: data?.email,
            password:"",
            active: data?.active,
            typeuserIdTypeUsers: data?.typeuserIdTypeUsers,
            students: data?.students?.map(student => student.idStudent)
        }
        // let dataObject = {
        //     type: "POST_ADMINISTRATIVO",
        //     users: dataFormated
        // }

        if (mode === "new") {
            userCreate(dataFormated)
            console.log("Data enviada a back", dataFormated);
        }
        else {
            console.log("Data enviada a back", dataFormated);
            userEdit(dataFormated)
        }
        setChange(!change)

    }

    function handleClickOpen() {
        setOpen(true);
    };

    function handleClose() {
        setOpen(false);
    };

    function handleOnclickNewEdit(user, mode, title) {
        setUserSelected(user)
        setMode(mode)
        setTitle(title)
        handleClickOpen()
    }

    function handleOnClickActDes(idUser, active) {
        userActDes({ idUser, active })
        setChange(!change)

    }
    // console.log(notifications);
    let usersRowsFormated = usersState?.map((user) => {

       return ([user?.firstNames, user?.lastName, user?.phone, user?.email, user?.typeuser?.typeUsers,
            user?.active?"Activo":"Inactivo",
            <FormControl >
                <FormControlLabel control={<Checkbox checked={user?.active} />} name="active" value={user?.active}/>
            </FormControl>,
            <div key={user?.idUser}>
                <Button variant="outlined" onClick={() => handleOnclickNewEdit(user, "edit", "Editar Usuario")} >Editar</Button>
                <Button variant="outlined" onClick={() => handleOnClickActDes(user?.idUser, !user?.active)} >Act/Des</Button>
            </div>]
        )

    })

    useEffect(() => {
        setUsersRows(usersRowsFormated)
        // eslint-disable-next-line
    }, [usersState])

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
            name: "phone",
            label: "Teléfono",
            options: { filter: false, sort: false }
        },
        {
            name: "email",
            label: "Correo",
            options: { filter: false, sort: false }
        },
        {
            name: "typeUser",
            label: "Tipo Usuario",
            options: { filter: true, sort: true ,searchable:false}
        },
        {
            name: "activeHide",
            label: "Activo",
            options: { filter: true, sort: false , display: 'false'}
        },
        {
            name: "active",
            label: "Activo",
            options: { filter: false, sort: false }
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
        searchPlaceholder: "nombre / apellido / telefono / correo",
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
            <Typography align={"center"} sx={{ mt:2}} gutterBottom variant="h4" >Administración de Usuarios</Typography>
                <Box sx={{ ml:2}}>
                    <Button variant="outlined" onClick={() => handleOnclickNewEdit({}, "new", "Crear Usuario")}>Crear Usuario</Button>
                </Box>
                <Box sx={{ m:2}}>
                    <MUIDataTable
                        title={"Listado de Usuarios"}
                        data={usersRows}
                        columns={columns}
                        options={options}
                    />
                </Box>
            </div>
            <Grid Container >
                <DialogContainer open={open}  ><UserForm user={userSelected} mode={mode} handleClose={handleClose} title={title} dataForm={dataForm} /></DialogContainer>
            </Grid>
        </div>
    )
}
