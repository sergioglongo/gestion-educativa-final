import * as React from 'react';
import MUIDataTable from "mui-datatables";
import { FormControl, Checkbox, Box, Grid, Button, FormControlLabel, Typography } from '@mui/material';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DialogContainer from '../Layout/DialogContainer'
import CreateNews from './CreateNews';
import { getAllNews } from './NewsActions';
import EditNews from './EditNews';

export default function NewsAdmin() {

    const dispatch = useDispatch()
    //traigo las notificaciones que estan en el estado
    let newsAllState = useSelector(state => state.news)

    const [change, setChange] = useState(false)
    const [mode,setMode] = useState(false)
    useEffect(() => {
        dispatch(getAllNews())
    }, [dispatch, change])

    const [newSelected, setNewSelected] = useState({})
    const [open, setOpen] = useState(false);
    const [newsRows, setNewsRows] = useState([])

    // function dataForm(data, mode) {
    //     let dataFormated = {
    //         idStudent: data?.idStudent ? data?.idStudent : null,
    //         firstNames: data.firstNames,
    //         lastName: data.lastName,
    //         active: data.active,
    //         dniStudent: data.dniStuden,
    //         birthDate: data.birthDate,
    //         idCourse: data?.idCourse
    //     }
    //     if (mode === "new") {
    //         studentCreate(dataFormated)
    //         console.log("Data enviada a back", dataFormated);
    //     }
    //     else {
    //         studentEdit(dataFormated)
    //     }
    //     setChange(!change)

    // }

    function handleClickOpen() {
        setOpen(true);
    };

    function handleClose() {
        setOpen(false)
        setChange(!change)
    };

    function handleOnclickNew() {
        handleClickOpen()
        setMode(false)
    }
    function handleOnclickEdit(newItem) {
        setNewSelected(newItem)
        setMode(true)
        handleClickOpen()
    }

    // function handleOnClickActDes(idStudent, active) {
    //     studentActDes({ idStudent, active })
    //     setChange(!change)

    // }
    // console.log(notifications);
    let newsRowsFormated = newsAllState?.map((newItem) => {

        let fecha = newItem.creationDate.split('-')
        let fechaFormated = `${fecha[2]}/${fecha[1]}/${fecha[0]}`
        return ([fechaFormated, newItem?.title, newItem?.body, newItem?.active ? "Activo" : "Inactivo",
            <FormControl >
                <FormControlLabel control={<Checkbox checked={newItem?.active} />} name="active" value={newItem?.active} />
            </FormControl>,
            <div>
                <img src={newItem?.image} alt="" width="80" height="50" />
            </div>
            ,
            <div key={newItem?.idNews}>
                <Button variant="outlined" onClick={() => handleOnclickEdit(newItem)} >Editar</Button>
                {/* <Button variant="outlined" onClick={() => handleOnClickActDes(newItem?.idNews, !newItem?.active)} >Act/Des</Button> */}
            </div>]
        )

    })

    useEffect(() => {
        setNewsRows(newsRowsFormated)
        // eslint-disable-next-line
    }, [newsAllState])

    let columns = [
        {
            name: "creationDate",
            label: "Creación",
            options: { filter: false, sort: true }
        },
        {
            name: "title",
            label: "Titulo",
            options: { filter: false, sort: false }
        },
        {
            name: "body",
            label: "Descripción",
            options: { filter: false, sort: false }
        },
        {
            name: "activeHide",
            label: "Activo",
            options: { filter: true, sort: false, display: 'false' ,searchable:false}
        },
        {
            name: "active",
            label: "Activo",
            options: { filter: false, sort: true ,searchable:false}
        },
        {
            name: "image",
            label: "Imagen",
            options: { filter: false, sort: false ,searchable:false}
        },
        {
            name: "acciones",
            label: "Acciones",
            options: { filter: false, sort: false ,searchable:false}
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
        searchPlaceholder: "titulo / descripción / fecha",
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
                <Typography align={"center"} sx={{ mt: 2 }} gutterBottom variant="h4" >Administración de Noticias</Typography>
                <Box sx={{ ml: 2 }}>
                    <Button variant="outlined" onClick={() => handleOnclickNew()}>Crear Noticia</Button>
                </Box>
                <Box sx={{ m: 2 }}>
                    <MUIDataTable
                        title={"Listado de Noticias"}
                        data={newsRows}
                        columns={columns}
                        options={options}
                    />
                </Box>

            </div>
            <Grid Container >
                <DialogContainer open={open}  >
                   {mode?
                       <EditNews handleClose={handleClose} newData={newSelected} />
                       :
                       <CreateNews handleClose={handleClose} />
                   }
                </DialogContainer>
            </Grid>
        </div>
    )
}
