import React, { useEffect, useState } from "react";
import { getSpecificOrder } from "../../services";
import styles from "./Order.module.css";
import FeedIcon from "@mui/icons-material/Feed";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import { Oval } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

function Order() {
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState(null);

  useEffect(() => {
    const paymentIntent = new URLSearchParams(window.location.search).get(
      "payment_intent"
    );

    if (!paymentIntent) return;

    const id = paymentIntent.slice(3);

    const fetchOrder = async () => {
      try {
        const response = await getSpecificOrder(id);
        setOrder(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    setLoading(true);
    fetchOrder();
    setLoading(false);
  }, []);

  useEffect(() => {
    if (order?.status === "processing") {
      setStatus("procesando pago");
      setColor("#EAA70C");
    } else if (order?.status === "succeeded") {
      setStatus("pago aceptado");
      setColor("#0FD15E");
    } else if (order?.status === "failed") {
      setStatus("pago rechazado");
      setColor("#E83811");
    } else setStatus("error");
  }, [order]);

  const informationText = (status) => {
    if (status === "procesando pago") {
      return "Tu pago está siendo procesado, te enviaremos un correo electrónico una vez el estado de tu pago haya sido aceptado/rechazado. Es importante que guardes el código de tu orden.";
    } else if (status === "pago aceptado") {
      return "Tu pago ha sido aceptado, gracias por tu compra. Te hemos enviado un correo electrónico con toda la información de tu orden, también te enviaremos uno cuando tu pedido haya sido enviado.";
    } else if (status === "pago rechazado") {
      return "Tu pago ha sido rechazado, lamentamos las inconveniencias. Te invitamos a realizar tu compra de nuevo.";
    } else {
      return "Ha ocurrido un error.";
    }
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.card}
        style={loading ? { alignItems: "center" } : { alignItems: "none" }}
      >
        {loading ? (
          <Oval
            color="#f38e82"
            secondaryColor="#FFB3AB"
            height={60}
            width={60}
          />
        ) : (
          <>
            <div className={styles.icon}>
              INFORMACIÓN DE TU ORDEN
              <FeedIcon fontSize="large" />
            </div>

            <label className={styles.subtitle}>
              Orden: <label className={styles.content}>{order?.id}</label>
            </label>

            <label className={styles.subtitle}>
              Cantidad: $
              <label className={styles.content}>{order?.amount}.00</label>MXN
            </label>

            <label className={styles.subtitle}>
              Estado del pago:{" "}
              <label className={styles.content} style={{ color: color }}>
                {status}
              </label>
            </label>

            <div className={styles.separator} />

            <div className={styles.information}>
              <label className={styles.text}>{informationText(status)}</label>

              {status === "procesando pago" || status === "pago aceptado" ? (
                <label className={styles.text}>
                  <HelpCenterIcon />
                  Si compraste como usuario, podrás ver toda la información de
                  tu orden en tu portal.
                </label>
              ) : (
                ""
              )}
            </div>

            <button className={styles.btn} onClick={() => navigate("/")}>
              VOLVER A HEMP FOR BEUTY
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Order;
