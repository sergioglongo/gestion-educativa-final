import * as React from 'react';
import { useEffect, useState } from "react";
import { getAllPay, getUserPay } from "./actionsPay.js";
import { useDispatch, useSelector } from 'react-redux';
import { navPay, muiDatatable } from "./paymentsFunction.js"
import CreatePay from './CreatePay.jsx';
import axios from 'axios';
import swal from 'sweetalert';
import CartTotal from './CartTotal.jsx';


export default function Payments() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const loading = useSelector((state) => state.loading)

  const initialState = {
    data: [],
    title: "",
    typeUser: "",
    idUser: "",
    cart: []
  }

  const [pay, setPay] = useState(initialState)

  useEffect(() => {

    async function traerDatos() {
      // ESTO SE QUITA CUANDO EL LOCALSTORE ESTE LISTO
      // let idUser = !user[0]? 4 : user[0].idUser 
      let idUser = localStorage.getItem("idUser")

      dispatch(getUserPay({ type: "RELOAD", idUser: idUser, email: "reset@reset.com" }))
      
      let { data } = await axios.post("http://localhost:3001/users/password", {
        type: "RELOAD", idUser: idUser, email: "reset@reset.com"
      })
         
      const response = await getAllPay("debt", idUser, data[0].typeuser.typeUsers );

      setPay({ ...pay, data: response, title: "Adeudado", typeUser: data[0].typeuser.typeUsers, idUser: idUser })
    }
    traerDatos()

  }, [])

  function handleOnButton(e){
    if(!pay.cart[0]) return swal("Debe seleccionar pagos", { buttons: false, timer: 4000})
    setPay({ ...pay, title: "cart" })
  }


  async function handleOnClick(e) {
    switch (e.target.name) {
      case "debt":
        const responsePay = await getAllPay(e.target.name,  pay.idUser, pay.typeUser);
        setPay({ ...pay, data: responsePay, title: "Adeudado" })
        break;
      case "history":
        const responsedebt = await getAllPay(e.target.name,  pay.idUser, pay.typeUser);
        setPay({ ...pay, data: responsedebt, title: "Historial de Pagos" })
        break;
      case "create":
        setPay({ ...pay, title: "create" })
        break;
      case "cart":
         if(!pay.cart[0]) return swal("Debe seleccionar pagos", { buttons: false, timer: 4000})
          setPay({ ...pay, title: "cart" })
        break;
      case "add":
        if(pay.cart.filter(d => parseInt(d.idPayStudents) === parseInt(e.target.id))[0]) return swal("","No puede seleccionar el mismo pago!", "info"), { buttons: false, timer: 4000};
        setPay({ ...pay, cart:[...pay.cart, pay.data.filter(d => parseInt(d.idPayStudents) === parseInt(e.target.id))[0]]})
        break;
    }
  }

  //// ONCLICK TOTALCART
  function onClickTotalCart(){
    setPay({ ...pay, title: "Adeudado", cart:[] })
  }

  /// RENDER
  let render

  if(loading) return render = (<h1>Cargando... </h1>)

  render = pay.title === "create" ? <CreatePay /> 
          : pay.title === "cart" ? <CartTotal cart = {pay.cart} onClickTotalCart = {onClickTotalCart} />
          : muiDatatable(pay, handleOnClick, handleOnButton)

  return (
    <div>
       {navPay(handleOnClick, pay.typeUser)}
       {render}
    </div>
  );
}