import React, { useState, useEffect } from "react";
import styles from "./SelectAdress.module.css";
import { getAllStateCodes, getShipmentRate } from "../../services";
import { Oval } from "react-loader-spinner";
import { setClientAddress } from "../../redux/actions";
import { useDispatch } from "react-redux";

function SelectAdress({ setStep, productsTotal, setShipmentTotal }) {
  const dispatch = useDispatch();
  const [continueDisabled, setContinueDisabled] = useState(true);
  const [statesInfo, setStatesInfo] = useState([]);
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    fullName: "",
    street: "",
    int: "",
    code: "",
    city: "",
    state: "",
    col: "",
  });
  const [loader, setLoader] = useState(false);
  const [addressError, setAddressError] = useState(false);

  useEffect(() => {
    const getStateList = async () => {
      const response = await getAllStateCodes();
      setStatesInfo(response.data);
    };
    getStateList();
  }, []);

  useEffect(() => {
    setErrors(validate(input));
  }, [input]);

  useEffect(() => {
    if (Object.keys(errors).length === 0) setContinueDisabled(false);
    else setContinueDisabled(true);
  }, [errors]);

  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleContinue = async (e) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
      setLoader(true);
      const body = {
        destination: {
          postalCode: input.code,
          city: input.city,
          stateCode: input.state,
        },
      };
      try {
        const response = await getShipmentRate(body);

        if (response.data.meta === "rate") {
          const rate = response.data.data[0].totalPrice;
          const stateName = statesInfo?.find(
            (item) => item.code === input.state
          ).name;
          setShipmentTotal(rate);
          dispatch(
            setClientAddress({
              name: input.fullName,
              street: input.street,
              int: input.int,
              code: input.code,
              state: stateName,
              city: input.city,
              col: input.col,
            })
          );
          setStep(4);
        } else {
          setLoader(false);
          setInput({ ...input, code: "" });
          setAddressError(true);
          console.log("error de direccion");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className={styles.container}>
      <label className={styles.title}>
        Selecciona la direccion de envio de tu compra
      </label>

      <div className={styles.userInfo}>
        {loader ? (
          <Oval
            color="#f38e82"
            secondaryColor="#FFB3AB"
            height={60}
            width={60}
          />
        ) : (
          <form className={styles.formContainer}>
            <label className={styles.information}>
              *Campos requeridos{" "}
              {addressError ? (
                <label className={styles.addressError}>
                  --código postal invalido
                </label>
              ) : (
                ""
              )}
            </label>
            <input
              type="text"
              name="fullName"
              value={input.fullName}
              placeholder="Nombre completo*"
              className={styles.inputLarge}
              onChange={(e) =>
                setInput({ ...input, [e.target.name]: e.target.value })
              }
              autoComplete="off"
            />
            <div className={styles.flexInput}>
              <input
                type="text"
                name="street"
                value={input.street}
                placeholder="Calle y numero*"
                className={styles.inputLarge}
                onChange={handleInputChange}
                autoComplete="off"
              />
            </div>
            <div className={styles.flexInput}>
              <input
                type="text"
                name="int"
                value={input.int}
                placeholder="Int"
                className={styles.inputSmall}
                onChange={(e) =>
                  setInput({ ...input, [e.target.name]: e.target.value })
                }
                autoComplete="off"
              />
              <input
                type="text"
                name="code"
                value={input.code}
                placeholder="C.P.*"
                className={styles.inputShort}
                onChange={(e) => {
                  handleInputChange(e);
                  setAddressError(false);
                }}
                autoComplete="off"
              />
            </div>
            <select
              name="state"
              className={styles.inputLarge}
              value={input.state}
              onChange={handleInputChange}
            >
              <option value="" disabled>
                Seleccionar estado*
              </option>
              {statesInfo?.map((item) => (
                <option key={item.name} value={item.code}>
                  {item.name}
                </option>
              ))}
            </select>
            <input
              type="text"
              name="city"
              value={input.city}
              placeholder="Ciudad*"
              className={styles.inputLarge}
              onChange={handleInputChange}
              autoComplete="off"
            />
            <input
              type="text"
              name="col"
              value={input.col}
              placeholder="Colonia*"
              className={styles.inputLarge}
              onChange={handleInputChange}
              autoComplete="off"
            />
          </form>
        )}
      </div>

      <div className={styles.options}>
        <div className={styles.labels}>
          <label className={styles.total}>
            Total de productos: $ {productsTotal} MX
          </label>
          <label className={styles.info}>
            Llena todos los *CAMPOS REQUERIDOS y continua para calcular el
            precio de envio.
          </label>
        </div>

        <div className={styles.btnContainer}>
          <button className="exit-payment">Salir</button>
          <button
            className={
              continueDisabled ? "continue-disabled" : "continue-payment"
            }
            onClick={handleContinue}
            disabled={continueDisabled}
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
}

function validate(input) {
  const errors = {};

  if (!input.fullName) errors.fullNameEmpty = true;
  if (!input.street) errors.streetEmpty = true;
  if (!input.city) errors.cityEmpty = true;
  if (!input.code) errors.codeEmpty = true;
  else if (input.code.length < 5 || input.code.length > 5)
    errors.codeInvalid = true;
  if (!input.state) errors.stateEmpty = true;
  if (!input.col) errors.colEmpty = true;

  return errors;
}

export default SelectAdress;
