import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "./ContinueToPayment.module.css";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { createIntent } from "../../services";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51L1kxCEIpwhC0hstVInUsynjTZ3uIM6XcVGVw2pESwWgrAO49kE96X4xlZKyJJdS96ZevK3qvNhYKMfgyqASPZwf000REYOzjE"
);

function ContinueToPayment({ productsTotal, shipmentTotal, buyAsGuest }) {
  const cartList = useSelector((state) => state.cartList);
  const [clientSecret, setClientSecret] = useState("");

  const createPaymentIntent = async (body) => {
    const response = await createIntent(body);
    setClientSecret(response.data.clientSecret);
  };

  useEffect(() => {
    const items = cartList.map((item) => {
      return { id: item.id, quantity: item.qty };
    });
    createPaymentIntent(items);
  }, []);

  const appearance = {
    theme: "stripe",
  };

  return (
    <div className={styles.container}>
      <label className={styles.title}>Total de compra</label>

      <div className={styles.userInfo}>
        {clientSecret && (
          <Elements
            options={{ clientSecret, appearance, locale: "es-419" }}
            stripe={stripePromise}
          >
            <CheckoutForm
              buyAsGuest={buyAsGuest}
              clientSecret={clientSecret}
              productsTotal={productsTotal}
              shipmentTotal={shipmentTotal}
            />
          </Elements>
        )}
      </div>

      <div className={styles.options}>
        <div className={styles.labels}>
          <label className={styles.info}>
            Total de productos: $ {productsTotal}
          </label>
          <label className={styles.info}>
            Costo de envio: $ {shipmentTotal}
          </label>
          <label className={styles.total}>
            Total: $ {productsTotal + shipmentTotal} MX
          </label>
        </div>

        <div className={styles.btnContainer}>
          <button className="exit-payment">Salir</button>
        </div>
      </div>
    </div>
  );
}

export default ContinueToPayment;
