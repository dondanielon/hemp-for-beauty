import React, { useEffect, useState } from "react";
import styles from "./MakeOrderAs.module.css";
import OptionsSelection from "./OptionsSelection";
import OptionGuest from "./OptionGuest";
import OptionUser from "./OptionUser";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../../services";
import useAuth from "../../hooks/useAuth";
import { setClientInfo } from "../../redux/actions";

function MakeOrderAs({ setStep, productsTotal, setBuyAsGuest }) {
  const { isAuthenticated, accessToken } = useAuth();
  const clientInfo = useSelector((state) => state.clientInfo);
  const [stepCompleted, setStepCompleted] = useState(false);
  const [continueDisabled, setContinueDisabled] = useState(true);
  const [selection, setSelection] = useState("NONE");
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      selection === "SELECT_BUY_AS_USER" ||
      selection === "SELECT_BUY_AS_GUEST"
    )
      setStepCompleted(true);
    else setStepCompleted(false);
  }, [selection]);

  useEffect(() => {
    if (stepCompleted) setContinueDisabled(false);
    else setContinueDisabled(true);
  }, [stepCompleted]);

  const handleContinue = async () => {
    if (selection === "SELECT_BUY_AS_USER" && isAuthenticated) {
      const response = await getUserInfo(accessToken);
      dispatch(setClientInfo(response.data));
      setBuyAsGuest(false);
      setStep(3);
    }
    if (
      selection === "SELECT_BUY_AS_GUEST" &&
      clientInfo.email &&
      clientInfo.phone
    ) {
      setBuyAsGuest(true);
      setStep(3);
    }
  };

  return (
    <div className={styles.container}>
      <label className={styles.title}>
        Selecciona una opción para continuar con tu compra
      </label>

      <div className={styles.userOptions}>
        {selection === "NONE" ? (
          <OptionsSelection setSelection={setSelection} selection={selection} />
        ) : selection === "SELECT_BUY_AS_USER" ? (
          <OptionsSelection setSelection={setSelection} selection={selection} />
        ) : selection === "SELECT_BUY_AS_GUEST" ? (
          <OptionsSelection setSelection={setSelection} selection={selection} />
        ) : selection === "SELECT_LOGIN_REGISTER" ? (
          <OptionUser setSelection={setSelection} />
        ) : selection === "SELECT_SET_GUEST_INFO" ? (
          <OptionGuest setSelection={setSelection} />
        ) : (
          <span>a</span>
        )}
      </div>

      <div className={styles.options}>
        <div className={styles.labels}>
          <label className={styles.total}>
            Total de productos: $ {productsTotal} MX
          </label>
          <label className={styles.info}>
            El precio de envio se agregara ya que hayas seleccionado una
            direccion de envio
          </label>
        </div>

        <div className={styles.btnContainer}>
          <button className="exit-payment">Salir</button>
          <button
            className={
              continueDisabled ? "continue-disabled" : "continue-payment"
            }
            disabled={continueDisabled}
            onClick={handleContinue}
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
}

export default MakeOrderAs;
