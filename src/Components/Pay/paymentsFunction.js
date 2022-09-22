import { AccountCircle } from "@mui/icons-material";
import { Badge, Box, Button, IconButton, Typography } from "@mui/material";
import MUIDataTable from "mui-datatables";
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';


const debtColumn = [
  {
    name: "createDate",
    label: "Emisión",
    // options: { filter: false, sort: true }
  },
  {
    name: "subject",
    label: "Asunto",
    // options: { filter: false, sort: true }
  },
  {
    name: "students",
    label: "Alumno",
    // options: { filter: true, sort: true }
  },
  {
    name: "amount",
    label: "Monto",
    // options: { filter: false, sort: true }
  },

  {
    name: "expirationDate",
    label: "Vencimiento",
    // options: { filter: false, sort: true }
  },
  {
    name: "detail",
    label: "Detalle",
    options: { filter: false, sort: true }
  },


]

const historyColumn = [
  {
    name: "createDate",
    label: "Emisión",
    // options: { filter: false, sort: true }
  },
  {
    name: "subject",
    label: "Asunto",
    // options: { filter: false, sort: true }
  },
  {
    name: "students",
    label: "Alumno",
    // options: { filter: true, sort: true }
  },
  {
    name: "amount",
    label: "Monto",
    // options: { filter: false, sort: true }
  },

  {
    name: "expirationDate",
    label: "Vencimiento",
    // options: { filter: false, sort: true }
  },
  {
    name: "detail",
    label: "Detalle",
    options: { filter: false, sort: true }
  },
  {
    name: "datePaid",
    label: "Pagado",
    options: { filter: false, sort: true }
  },
  {
    name: "reference",
    label: "referencia de pago",
    options: { filter: false, sort: true }
  },


]

const debtColumnTutor = [
  {
    name: "createDate",
    label: "Emisión",
    // options: { filter: false, sort: true }
  },
  {
    name: "subject",
    label: "Asunto",
    // options: { filter: false, sort: true }
  },
  {
    name: "students",
    label: "Alumno",
    // options: { filter: true, sort: true }
  },
  {
    name: "amount",
    label: "Monto",
    // options: { filter: false, sort: true }
  },

  {
    name: "expirationDate",
    label: "Vencimiento",
    // options: { filter: false, sort: true }
  },
  {
    name: "detail",
    label: "Detalle",
    options: { filter: false, sort: true }
  },
  {
    name: "pay",
    label: "Pagos",
    options: { filter: false, sort: true }
  },


]

const options = {
  search: false,
  download: true,
  print: true,
  viewColumns: true,
  filter: true,
  filterType: "multiselect",
  elevation: 2,
  rowsPerPageOptions: [10, 15, 30, 100],
  tableBodyHeight: '100%',
  tableBodyMaxHeight: '100%',
  searchPlaceholder: "detalle / monto / fecha",
  searchAlwaysOpen: "true",
  selectableRows: "none",
  responsive: "stacked",
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

export function muiDatatable(pay, handleOnClick, handleOnButton) {

  if (pay.typeUser === "Tutor") {

    let data = pay.data?.map(e => {
      let date1 = e.createDate.split('-')
      let date2 = e.expirationDate.split('-')
      let createDate = `${date1[2]}/${date1[1]}/${date1[0]}`
      let expirationDate = `${date2[2]}/${date2[1]}/${date2[0]}`
      return {
        idStudent: e.idStudent,
        dniStudent: e.dniStudent,
        createDate,
        subject: e.subject,
        students: e.students,
        amount: e.amount,
        expirationDate,
        detail: e.detail,
        idPayStudents: e.idPayStudents,
        datePaid: e.datePaid,
        reference: e.reference,
        tutors: e.tutors,
        pay: (<div>
          <Button variant="outlined" id={e.idPayStudents} name="add" onClick={handleOnClick} >Pagar</Button>
        </div>)
      }
    })

    let columns = pay.title === "Adeudado" ? debtColumnTutor : historyColumn

    return (
      <Box sx={{ m: 2 }}>
        {/* ICONO CARRITO */}
        {pay.typeUser === "Tutor" && (
          <div>
            {/* <Button variant="outlined" name="cart" onClick={handleOnClick}>{pay.cart.length}</Button> */}
            <IconButton
              id="cart"
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              name="cart"
              onClick={handleOnButton}
            >
              <Badge badgeContent={pay.cart.length} color="error">
                <MonetizationOnIcon sx={{ width: 40, height: 40 }} />
              </Badge>
            </IconButton>
          </div>

        )
        }

        <MUIDataTable
          title={pay.title}
          data={data}
          columns={columns}
          options={options}
        />
      </Box>
    )

  } else if (pay.typeUser === "Administrativo") {

    let columns = pay.title === "Adeudado" ? debtColumn : historyColumn
    return (
      <Box sx={{ m: 2 }}>
        <MUIDataTable
          title={pay.title}
          data={pay.data}
          columns={columns}
          options={options}
        />
      </Box>

    )

  }
}

export function navPay(handleOnClick, typeUser) {

  if (typeUser === "Tutor") {
    return (
      <div>
        <Typography align={"center"} sx={{ mt: 2 }} gutterBottom variant="h4" >Administración de Cobros</Typography>
        {/* <h1>Soy tutor</h1> */}
        <Button variant="outlined" name="debt" onClick={handleOnClick} >Pagos Pendientes</Button>
        <Button variant="outlined" name="history" onClick={handleOnClick}>Historial</Button>
      </div>
    )

  } else if (typeUser === "Administrativo") {

    return (
      <div>
        <Typography align={"center"} sx={{ mt: 2 }} gutterBottom variant="h4" >Administración de Cobros</Typography>
        {/* <h1>Soy Administrador</h1> */}
        <Button variant="outlined" name="create" onClick={handleOnClick}>Crear cobro</Button>
        <Button variant="outlined" name="debt" onClick={handleOnClick} >Pagos Pendientes</Button>
        <Button variant="outlined" name="history" onClick={handleOnClick}>Historial</Button>
      </div>
    )

  }

}
