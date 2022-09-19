import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { createOrder } from "../../services";
import styles from "./ContinueToPayment.module.css";

function CheckoutForm({
  buyAsGuest,
  clientSecret,
  productsTotal,
  shipmentTotal,
}) {
  const clientAddress = useSelector((state) => state.clientAddress);
  const clientInfo = useSelector((state) => state.clientInfo);
  const cartList = useSelector((state) => state.cartList);

  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const orderRequest = async () => {
    const paymentIntent = clientSecret.split("_secret_")[0];
    const orderObject = {
      paymentIntent: paymentIntent,
      amount: productsTotal + shipmentTotal,
      isUser: buyAsGuest ? false : true,
      email: clientInfo.email,
      phone: clientInfo.phone,
      recipientName: clientAddress.name,
      street: clientAddress.street,
      int: clientAddress.int ? clientAddress.int : null,
      code: clientAddress.code,
      state: clientAddress.state,
      city: clientAddress.city,
      col: clientAddress.col,
      products: cartList.map((item) => {
        return { id: item.id, qty: item.qty };
      }),
    };

    await createOrder(orderObject);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!stripe || !elements) return;

      setIsLoading(true);

      orderRequest();

      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: "http://localhost:3000/orden",
        },
      });

      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage("Comprueba los datos de tu tarjeta");
      } else {
        setMessage("Ocurrio un error, intenta de nuevo.");
      }

      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <PaymentElement className={styles.paymentElement} />
      <button
        disabled={isLoading || !stripe || !elements}
        className={styles.submit}
      >
        <span>
          {isLoading ? <div className={styles.spinner}></div> : "Pagar ahora"}
        </span>
      </button>
      {message && <div className={styles.paymentMsg}>{message}</div>}
    </form>
  );
}

export default CheckoutForm;
