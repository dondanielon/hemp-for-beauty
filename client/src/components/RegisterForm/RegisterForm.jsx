import React, { useState, useEffect } from "react";
import styles from "./RegisterForm.module.css";
import { registerNewAccount, loginWithCredentials } from "../../services";
import { logIn } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { Oval } from "react-loader-spinner";

function RegisterForm() {
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loader, setLoader] = useState(false);
  const [actionError, setActionError] = useState("");

  useEffect(() => {
    setErrors(validate(input));
  }, [input]);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (actionError) return;
    setSubmitted(true);

    if (Object.keys(errors).length === 0) {
      setLoader(true);
      const registerResponse = await registerNewAccount(input);

      if (registerResponse.msg === "usuario creado") {
        const loginResponse = await loginWithCredentials({
          email: input.email,
          password: input.password,
        });

        if (loginResponse.msg === "inicio de sesion") {
          setInput({
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            phone: "",
          });
          dispatch(logIn({ token: loginResponse.content }));

          window.localStorage.setItem(
            "loggedHempAppUser",
            JSON.stringify({ token: loginResponse.content })
          );
        }
      } else {
        setActionError(registerResponse.msg);
      }
      setLoader(false);
    }
  };

  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form
      className={loader ? null : styles.container}
      onSubmit={handleRegister}
    >
      {loader ? (
        <Oval color="#f38e82" secondaryColor="#FFB3AB" height={60} width={60} />
      ) : (
        <>
          <div className={styles.inputContainer}>
            <input
              className={styles.input}
              type="text"
              name="email"
              value={input.email}
              onChange={(e) => {
                handleInputChange(e);
                setActionError("");
              }}
              placeholder="Correo electronico"
              autoComplete="off"
            />
            {submitted && errors.email && (
              <label className={styles.error}>{errors.email}</label>
            )}
            <input
              className={styles.input}
              type="text"
              name="firstName"
              value={input.firstName}
              onChange={handleInputChange}
              placeholder="Nombre"
              autoComplete="off"
            />
            {submitted && errors.firstName && (
              <label className={styles.error}>{errors.firstName}</label>
            )}
            <input
              className={styles.input}
              type="text"
              name="lastName"
              value={input.lastName}
              onChange={handleInputChange}
              placeholder="Apellido"
              autoComplete="off"
            />
            {submitted && errors.lastName && (
              <label className={styles.error}>{errors.lastName}</label>
            )}
            <input
              className={styles.input}
              type="password"
              name="password"
              value={input.password}
              onChange={handleInputChange}
              placeholder="Contraseña"
            />
            {submitted && errors.password && (
              <label className={styles.error}>{errors.password}</label>
            )}
            <input
              className={styles.input}
              type="text"
              name="phone"
              value={input.phone}
              onChange={handleInputChange}
              placeholder="Número de teléfono"
              autoComplete="off"
            />
            {submitted && errors.phone && (
              <label className={styles.error}>{errors.phone}</label>
            )}
          </div>
          <div className={styles.optionsContainer}>
            {actionError && (
              <label className={styles.error}>{actionError}</label>
            )}
            <button className={styles.confirm} type="submit">
              Registrarse
            </button>
          </div>
        </>
      )}
    </form>
  );
}

function validate(input) {
  const errors = {};

  const validEmail = new RegExp(
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/
  );
  const validPhone = new RegExp(
    /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/
  );
  const validPassword = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);

  if (!input.email) errors.email = "campo requerido";
  else if (!validEmail.test(input.email)) errors.email = "email invalido";

  if (!input.firstName) errors.firstName = "campo requerido";

  if (!input.lastName) errors.lastName = "campo requerido";

  if (!input.password) errors.password = "campo requerido";
  else if (input.password.length < 8)
    errors.password = "contraseña debe contener al menos 8 caracteres";
  else if (!validPassword.test(input.password))
    errors.password = "contraseña debe contener al menos una letra y un numero";

  if (!input.phone) errors.phone = "campo requerido";
  else if (!validPhone.test(input.phone)) errors.phone = "teléfono invalido";

  return errors;
}

export default RegisterForm;
