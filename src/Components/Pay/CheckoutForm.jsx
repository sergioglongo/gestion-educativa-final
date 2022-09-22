import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import swal from "sweetalert";
import axios from "axios";
import { Box, Button, Card, TextField } from "@mui/material";

export default function CheckoutForm(props) {

  const stripe = useStripe();
  const elements = useElements();

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

 
  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Pago correcto!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!email) return swal("Debe ingresar un correo ", "", "warning")
    // console.log(message)
    // if(message === "Pago correcto!") {
    //      let response = await axios.post("http://localhost:3001/payments/paydb",{
    //   idPayStudents: props.idPayStudents, clientSecret: props.clientSecret})
    // swal("Pago realizado con exito", "Haga click aqui!" , "success");  
    // }else {
    //   return swal("Debe completar todos los campos ", "", "warning")
    // }
    
    let response = await axios.post("http://localhost:3001/payments/paydb",{
      idPayStudents: props.idPayStudents, clientSecret: props.clientSecret})
    swal("Pago realizado con exito", "Haga click aqui!" , "success");


    if (!stripe || !elements) {
      // return swal("Debe completar todos los campos ", "", "warning")
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
     
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:3000/payments",
        receipt_email: email,
      },
    })

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  
  return (
    <Box sx={{ mt: 10 } } >
      <Card variant="outlined" style={{ margin: "0 auto", pading: "20px 5px" }} sx={{ maxWidth: 700, maxHeight: 600 }}>
    <form id="payment-form" onSubmit={handleSubmit}>
      <TextField
        sx={{ m: 2 }}
        id="email"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Ingrese correo electronico"
      />
      <Box sx={{ m: 2 }}>
      <PaymentElement id="payment-element" />
      </Box>
      <Box sx={{ m: 2 }}>
        <button variant="outlined" disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pagar Ahora"}
        </span>
        </button>
      </Box>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
    </Card>
    </Box>
  );
}