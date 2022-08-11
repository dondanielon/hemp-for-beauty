import React, { useState } from 'react'
import styles from "./RegisterForm.module.css";

function RegisterForm() {
  const [input, setInput] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: ""
  });
  const [errors, setErrors] = useState({});
  const [submited, setSubmited] = useState(false);
  const [loader, setLoader] = useState(false);
  
  const handleRegister = (e) => {
    e.preventDefault()
  }

  return (
    <form className={styles.container} onSubmit={handleRegister}>
      <div className={styles.inputContainer}>
        <input 
          className={styles.input}
          type="text"
          name="email"
          value={input.email}
          placeholder="Correo electronico"
          autoComplete="off" 
        />
        <input 
          className={styles.input}
          type="text" 
          name="firstName"
          value={input.firstName}
          placeholder="Nombre"
          autoComplete="off" 
        />
        <input
          className={styles.input} 
          type="text" 
          name="lastName"
          value={input.lastName}
          placeholder="Apellido"
          autoComplete="off" 
        />
        <input 
          className={styles.input}
          type="password" 
          name="password"
          value={input.password}
          placeholder="Contraseña" 
        />
        <input 
          className={styles.input}
          type="text" 
          name="phone"
          value={input.phone}
          placeholder="Número de teléfono"
          autoComplete="off" 
        />
      </div>
      <div className={styles.optionsContainer}>
        <button className={styles.confirm} type="submit">Registrarse</button>
      </div>
    </form>
  )
}

function validate(input) {
  const errors = {}

  //validations regex

  //if statements
}

export default RegisterForm;