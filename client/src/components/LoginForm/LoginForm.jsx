import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { logIn } from "../../redux/actions";
import { loginWithCredentials } from "../../services";
import styles from "./LoginForm.module.css";
import { Oval } from "react-loader-spinner";


function LoginForm() {
  const dispatch = useDispatch();
  const [input, setInput] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [submited, setSubmited] = useState(false);
  const [loader, setLoader] = useState(false);

  useEffect(() => {setError(validate(input))}, [input]);

  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setSubmited(true);

    if(error) return;
    
    setError("");
    setLoader(true);

    const response = await loginWithCredentials(input);
    setLoader(false);

    if(response.msg === "inicio de sesion") {
      setInput({ email: "", password: ""});
      dispatch(logIn({ token: response.content }));
      
      window.localStorage.setItem(
        "loggedHempAppUser", JSON.stringify({ token: response.content })
      );
    } else {
      setError(response.msg);
    }
  };

  return (
    <form className={loader ? styles.loaderContainer : styles.loginContainer} onSubmit={handleLogin}>
        {
          loader ? (
            <Oval color="#f38e82" secondaryColor="#FFB3AB" height={60} width={60} />
          ) : (
            <>
              <input 
                className={styles.input} 
                placeholder="Correo electronico" 
                type="text" 
                name="email" 
                value={input.email} 
                onChange={handleInputChange} 
                autoComplete="off"
              />
              <input 
                className={styles.input} 
                placeholder="Contraseña" 
                type="password" 
                name="password" 
                value={input.password} 
                onChange={handleInputChange} 
              />
              <div className={styles.options}>
                <div className={styles.split}>
                  <button className={styles.loginBtn} type="submit">Ingresar</button>
                  {
                    error && submited && <label className={styles.error}>{error}</label>
                  }
                </div>
                <label className={styles.info}>
                  ¿Olvidaste tu contraseña? <NavLink to="/" className={styles.reset}>restablecer contraseña</NavLink>
                </label>
              </div>
            </>
          )
        }
        
      
    </form>
  );
}

function validate(input) {
  let error = "";
  const validEmail = new RegExp(/^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/g);

  if (!input.email) error = "campo requerido";
  else if (!validEmail.test(input.email)) error = "email invalido";

  if (!input.password) error = "campo requerido";

  if(!input.email && !input.password) error = "campos requeridos";

  return error;
}

export default LoginForm;