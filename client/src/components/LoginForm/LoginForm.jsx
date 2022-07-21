import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./LoginForm.module.css";

function LoginForm() {
  const [input, setInput] = useState({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState({});
  const [submited, setSubmited] = useState(false);

  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className={styles.loginContainer}>
      <input className={styles.input} placeholder="Correo electronico" type="text" name="email" value={input.email} onChange={handleInputChange} autoComplete="off"/>
      <input className={styles.input} placeholder="Contraseña" type="password" name="password" value={input.password} onChange={handleInputChange} />
      <div className={styles.options}>
        <button className={styles.loginBtn} type="submit" onClick={handleSubmit}>Ingresar</button>
        <label className={styles.info}>
          Olvidaste tu contraseña? <NavLink to="/" className={styles.reset}>restablecer contraseña</NavLink>
        </label>
      </div>
    </div>
  );
}

function validate(input) {
  const errors = {};
  const validEmail = new RegExp(/^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/g);
  if (!input.email) errors.email = "campo requerido"
  else if (!validEmail.test(input.email)) errors.email = "email invalido"
  if (!input.password) errors.password = "campo requerido"

  return errors;
}

export default LoginForm;