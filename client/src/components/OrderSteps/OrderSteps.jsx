import React, { useState } from "react";
import styles from "./OrderSteps.module.css";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import MapIcon from "@mui/icons-material/Map";
import PaymentIcon from "@mui/icons-material/Payment";
import ProductListConfirmation from "../ProductListConfirmation/ProductListConfirmation";
import MakeOrderAs from "../MakeOrderAs/MakeOrderAs";
import SelectAdress from "../SelectAdress/SelectAdress";
import ContinueToPayment from "../ContinueToPayment/ContinueToPayment";

function OrderSteps() {
  const [step, setStep] = useState(1);
  const [productsTotal, setProductsTotal] = useState(0);
  const [shipmentTotal, setShipmentTotal] = useState(0);
  const [buyAsGuest, setBuyAsGuest] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.progress}>
        <FactCheckIcon
          className={step === 1 ? styles.active : styles.inactive}
        />
        <span className={styles.dot} />
        <span className={styles.dot} />
        <ManageAccountsIcon
          className={step === 2 ? styles.active : styles.inactive}
        />
        <span className={styles.dot} />
        <span className={styles.dot} />
        <MapIcon className={step === 3 ? styles.active : styles.inactive} />
        <span className={styles.dot} />
        <span className={styles.dot} />
        <PaymentIcon className={step === 4 ? styles.active : styles.inactive} />
      </div>
      <div>
        {step === 1 ? (
          <ProductListConfirmation
            setStep={setStep}
            productsTotal={productsTotal}
            setProductsTotal={setProductsTotal}
          />
        ) : step === 2 ? (
          <MakeOrderAs
            setStep={setStep}
            productsTotal={productsTotal}
            setBuyAsGuest={setBuyAsGuest}
          />
        ) : step === 3 ? (
          <SelectAdress
            setStep={setStep}
            productsTotal={productsTotal}
            setShipmentTotal={setShipmentTotal}
          />
        ) : step === 4 ? (
          <ContinueToPayment
            productsTotal={productsTotal}
            shipmentTotal={shipmentTotal}
            buyAsGuest={buyAsGuest}
          />
        ) : (
          <label htmlFor="error">error</label>
        )}
      </div>
    </div>
  );
}

export default OrderSteps;
