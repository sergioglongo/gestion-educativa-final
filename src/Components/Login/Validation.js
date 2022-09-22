
export default function Validation(name, value) {


  let error = { type: "default" }
  ///// CORREO ELECTRONICO
  if (name === "email") {
    if (!/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(value)) {

      return error = { type: "email", email: "Verificar correo", status: "error" }
    } else {
      return error = { type: "email", email: "Correo", status: "ok" }
    }
  }
  //// PASSWORD
  if (name === "password") {
    if (/^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/.test(value)) {
      return error = { type: "password", password: "verificar contraseña", status: "error" }
    } else {
      return error = { type: "password", password: "Contraseña", status: "ok" }
    }
  }

  //// NEWPASWORD
  if (name === "newPassword") {
    console.log("newpasword")
    if (/^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/.test(value)) {
      return error = { type: "newPassword", password: "verificar contraseña", status: "error" }
    } else {
      return error = { type: "newPassword", password: "Repite contraseña", status: "ok" }
    }
  }


  ///// NOMBRRES Y APELLIDOS
  if (name === "nombresApellidos") {
    if (/^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$/.test(value)) {
      return error = { type: "lastName", lastName: "verificar Nombre", status: "error" }
    } else {
      return error = { type: "lastName", lastName: "Nombres", status: "ok" }
    }
  }

  ///// PRECIO Esta expresión regular valida el precio con 2 decimales
  if (name === "amount") {
    if (value.toString().length >= 5) return error = { type: "amount", amount: "Longitud maxima 5 caracteres", status: "error" }
    if (Number(value) || value === "") {
      return error = { type: "amount", amount: "Monto", status: "ok" }
    } else {
      return error = { type: "amount", amount: "Debe ser numero entero", status: "error" }
    }
  }

  ///// ASUNTOS MENSAJES
  if (name === "subject") {
    if (value === "") {
      return error = { type: "subject", subject: "Asunto", status: "ok" }
    } else if (value.length >= 30) {
      return error = { type: "subject", subject: "Solo debe tener hasta 30 caracteres", status: "stop" }
    } if (value.length < 5) {
      return error = { type: "subject", subject: "Debe tener mas de 5 caracteres", status: "error" }
    } else {
      return error = { type: "subject", subject: "Asunto", status: "ok" }
    }
  }

  ///// DETALLE DE PAGOS
  if (name === "detail") {

    if (value === "") {
      return error = { type: "detail", detail: "Detalles", status: "ok" }
    } else if (value.length >= 230) {
      return error = { type: "detail", detail: "Solo debe tener hasta 80 caracteres", status: "stop" }
    } if (value.length <= 5) {
      return error = { type: "detail", detail: "Debe tener mas de 5 caracteres", status: "error" }
    } else {
      return error = { type: "detail", detail: "Asunto", status: "ok" }
    }
  }


  return error

}



