import * as React from 'react';
import MUIDataTable from "mui-datatables";
import { FormControl, Checkbox, Rating, Stack, Box, Grid, Button, FormControlLabel, Typography } from '@mui/material';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ConfirmIcon from '@mui/icons-material/ThumbUpAlt';
import Pay from '@mui/icons-material/Paid';
import DialogContainer from '../Layout/DialogContainer'
import NotificationForm from './NotificationForm'
import { getNotificationsAll, notificationCreate, notificationEdit, notificationActDes } from './notificationsActions'

export default function NotificationsAdmin() {

    const dispatch = useDispatch()
    //traigo las notificaciones que estan en el estado
    let notificationsState = useSelector(state => state.notificationsAll)

    const [change, setChange] = useState(false)

    useEffect(() => {
        dispatch(getNotificationsAll())
    }, [dispatch, change])


    const [notificationSelected, setnotificationSelected] = useState({})
    const [mode, setMode] = useState("new")
    const [title, setTitle] = useState("Crear Notificación")
    const [open, setOpen] = useState(false);
    const [notificationsRows, setNotificationsRows] = useState([])

    function dataForm(data, mode) {
        let dataFormated = {
            idNotifications: data?.idNotifications,
            subject: data?.subject,
            body: data?.body,
            active: data.active,
            check: data?.check,
            pay: data?.pay,
            review: data?.review,
            senderId: data?.senderId,
            studentId: data?.idStudent?.map(student => student.idStudent)
        }
        if (mode === "new") {
            notificationCreate(dataFormated)
            console.log("Data enviada a back", dataFormated);
        }
        else {
            notificationEdit(dataFormated)
        }
        setChange(!change)

    }

    function handleClickOpen() {
        setOpen(true);
    };

    function handleClose() {
        setOpen(false);
        setChange(!change)

    };

    function handleOnclickNewEdit(notification, mode, title) {
        setnotificationSelected(notification)
        setMode(mode)
        setTitle(title)
        handleClickOpen()
    }

    function handleOnClickActDes(idNotifications, active) {
        notificationActDes({ idNotifications, active })
        setChange(!change)

    }
    // console.log(notifications);
    let notificationsRowsFormated = notificationsState?.map((notification) => {

        let fecha = notification.creationDate.split('-')
        let fechaFormated = `${fecha[2]}/${fecha[1]}/${fecha[0]}`
        return ([fechaFormated, notification?.subject, notification?.body, `${notification.sender?.firstNames} ${notification.sender?.lastName}`,
            <FormControl >
                <FormControlLabel control={<Checkbox checked={notification?.active} />} name="active" />
            </FormControl>,
            notification?.check ? <ConfirmIcon color='disabled' sx={{ width: 30, height: 30 }} /> : "",
            notification?.pay ? <Pay sx={{ width: 30, height: 30 }} /> : "",
            notification?.review ? <Stack spacing={2}><Rating value={1} readOnly /></Stack> : "",
            <div key={notification?.idNotifications}>
                <Button variant="outlined" onClick={() => handleOnclickNewEdit(notification, "edit", "Editar Notificación")} >Editar</Button>
                <Button variant="outlined" onClick={() => handleOnClickActDes(notification?.idNotifications, !notification?.active)} >Act/Des</Button>
            </div>]
        )

    })

    useEffect(() => {
        setNotificationsRows(notificationsRowsFormated)
        // eslint-disable-next-line
    }, [notificationsState])

    let columns = [
        {
            name: "notificationDate",
            label: "Fecha",
            options: { filter: false, sort: true }
        },
        {
            name: "subject",
            label: "Asunto",
            options: { filter: false, sort: true }
        },
        {
            name: "body",
            label: "Descripcion",
            options: { filter: false, sort: false }
        },
        {
            name: "senderId",
            label: "Envía",
            options: { filter: true, sort: true }
        },
        {
            name: "active",
            label: "Activa",
            options: { filter: true, sort: true, searchable: false }
        },
        {
            name: "check",
            label: "Confirma",
            options: { filter: true, sort: false, searchable: false }
        },
        {
            name: "pay",
            label: "Pagos",
            options: { filter: true, sort: false, searchable: false }
        },
        {
            name: "review",
            label: "Valoración",
            options: { filter: true, sort: false, searchable: false }
        },
        {
            name: "acciones",
            label: "Acciones",
            options: { filter: false, sort: false , searchable: false}
        },

    ]

    const options = {
        search: true,
        download: true,
        print: true,
        viewColumns: true,
        filter: true,
        filterType: "multiselect",
        elevation: 2,
        rowsPerPageOptions: [10, 15, 30, 100],
        tableBodyHeight: '100%',
        tableBodyMaxHeight: '100%',
        searchPlaceholder: "asunto / descripcion / fecha / envia",
        searchAlwaysOpen: true,
        selectableRows: "none",
        responsive: "vertical",
        hideSelectColumn: true,

        textLabels: {
            body: {
                noMatch: "No se encontraron registros",
                toolTip: "Ordenar",
                columnHeaderTooltip: column => `Ordenar por ${column.label}`
            },
            pagination: {
                next: "Siguiente",
                previous: "Anterior",
                rowsPerPage: "Filas por Página:",
                displayRows: "of",
            },
            toolbar: {
                search: "Buscar",
                downloadCsv: "Descarga CSV",
                print: "Imprime",
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
                <Typography align={"center"} sx={{ mt: 2 }} gutterBottom variant="h4" >Administración de Notificaciones</Typography>
                <Box >
                    <Button variant="outlined" onClick={() => handleOnclickNewEdit({}, "new", "Crear Notificación")}>Crear notificación</Button>
                </Box>
                <Box sx={{ m: 2 }}>
                    <MUIDataTable
                        title={"Listado de Notificaciones"}
                        data={notificationsRows}
                        columns={columns}
                        options={options}

                    />
                </Box>

            </div>
            <Grid Container >
                <DialogContainer open={open}  ><NotificationForm notification={notificationSelected} mode={mode} handleClose={handleClose} title={title} dataForm={dataForm} /></DialogContainer>
            </Grid>
        </div>
    )
}
