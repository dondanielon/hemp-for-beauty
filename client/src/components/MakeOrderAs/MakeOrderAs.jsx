import React, { useEffect, useState } from "react";
import styles from "./MakeOrderAs.module.css";
import OptionsSelection from "./OptionsSelection";
import OptionGuest from "./OptionGuest";
import OptionUser from "./OptionUser";

function MakeOrderAs({ setStep, productsTotal }) {
  const [stepCompleted, setStepCompleted] = useState(false);
  const [continueDisabled, setContinueDisabled] = useState(true);
  const [selection, setSelection] = useState("none");

  useEffect(() => {
    if (stepCompleted) setContinueDisabled(false);
    else setContinueDisabled(true);
  }, [stepCompleted])

  return (
    <div className={styles.container}>
      <label className={styles.title}>Selecciona una opción para continuar con tu compra</label>

      <div className={styles.userOptions}>
        {
          selection === "none" ? (
            <OptionsSelection 
              setSelection={setSelection} 
              stepCompleted={stepCompleted}
              setStepCompleted={setStepCompleted}
            />
          ) : selection === "user-not-logged" ? (
            <OptionUser setSelection={setSelection}/>
          ) : selection === "guest" ? (
            <OptionGuest setSelection={setSelection}/>
          ) : (
            <span>a</span>
          )
        }
      </div>

      <div className={styles.options}>
        <div className={styles.labels}>
          <label className={styles.total}>Total de productos: $ {productsTotal} MX</label>
          <label className={styles.info}>El precio de envio se agregara ya que hayas seleccionado una direccion de envio</label>
        </div>

        <div className={styles.btnContainer}>
          <button className="exit-payment">Salir</button>
          <button className={continueDisabled ? "continue-disabled" : "continue-payment"} disabled={continueDisabled}>Continuar</button>
        </div>
      </div>
    </div>
  )
}

export default MakeOrderAs;