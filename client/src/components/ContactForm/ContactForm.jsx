import React, { useEffect, useState } from "react";
import styles from "./ContactForm.module.css";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import FilledInput from "@mui/material/FilledInput";
import InputLabel from "@mui/material/InputLabel";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";

function ContactForm() {
  const [input, setInput] = useState({
    name: "",
    email: "",
    phone: "",
    reason: "", 
    description: ""
  });
  const [errors, setErrors] = useState({});
  const [submited, setSubmited] = useState(false);

  useEffect(() => {
    setErrors(validate({...input}));
  }, [input]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmited(true);
    if (!Object.keys(errors).length) {
      //AQUI VA LA FUNCION QUE ENVIA EMAILS A LA CUENTA OFICIAL
      //NO OLVIDARSE DE REFRESCAR LA PAGINA
    }
  };

  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Box
      component="form"
      autoComplete="off"
      className={styles.form}
      onSubmit={handleSubmit}
    >
      <FormControl className={styles.inputForm} variant="filled" color="pink" error={submited && errors.name}>
        <InputLabel className={styles.inputLabel}>Nombre</InputLabel>
        <FilledInput
          className={styles.inputField}
          name="name"   
          value={input.name} 
          onChange={handleInputChange}
          size="small"
          color="pink"
        />
      </FormControl>
      <FormControl className={styles.inputForm} variant="filled"  color="pink" error={submited && errors.email}>
        <InputLabel className={styles.inputLabel}>Email</InputLabel>
        <FilledInput
          className={styles.inputField}
          name="email"   
          value={input.email} 
          onChange={handleInputChange}
          endAdornment={<InputAdornment position="end"><AlternateEmailIcon className={styles.inputIcon}/></InputAdornment>}
          size="small"
          color="pink"
        />
      </FormControl>
      <FormControl className={styles.inputForm} variant="filled" color="pink" >
        <InputLabel className={styles.inputLabel}>Telefono</InputLabel>
        <FilledInput
          className={styles.inputField}
          name="phone"  
          value={input.phone} 
          onChange={handleInputChange}
          endAdornment={<InputAdornment position="end"><PhoneIphoneIcon className={styles.inputIcon}/></InputAdornment>}
          size="small"
          color="pink"
        />
      </FormControl>
      <FormControl className={styles.inputForm} variant="filled" color="pink" error={submited && errors.reason}>
        <InputLabel className={styles.inputLabel}>Asunto</InputLabel>
        <Select
          className={styles.inputField}
          name="reason"
          value={input.reason}
          size="small"
          onChange={handleInputChange}
          color="pink"
        >
          <MenuItem value="">
            <em>Selecciona opcion</em>
          </MenuItem>
          <MenuItem value="info">Informacion sobre los productos</MenuItem>
          <MenuItem value="payment">Pagos y/o envios</MenuItem>
          <MenuItem value="other">Otro</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={styles.inputForm} variant="filled" color="pink" error={submited && errors.description}>
        <InputLabel className={styles.inputLabel}>Descripcion</InputLabel>
        <FilledInput
          className={styles.inputField}
          name="description"  
          value={input.description} 
          onChange={handleInputChange}
          size="small"
          color="pink"
          multiline
          rows={3}
        />
      </FormControl>
      <Button type="submit" className={styles.send} variant="contained" endIcon={<SendIcon />}>Enviar</Button>
      {submited && errors.name && <label className={styles.errorName}>{errors.name}</label>}
      {submited && errors.email && <label className={styles.errorEmail}>{errors.email}</label>}
      {submited && errors.reason && <label className={styles.errorReason}>{errors.reason}</label>}
      {submited && errors.description && <label className={styles.errorDescription}>{errors.description}</label>}
    </Box>
  );
};

function validate(input) {
  const errors = {};
  const validEmail = new RegExp(/^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/g);
  if (!input.name) errors.name = "campo requerido"
  if (!input.email) errors.email = "campo requerido"
  else if (!validEmail.test(input.email)) errors.email = "email invalido"
  if (!input.reason) errors.reason = "campo requerido"
  if (!input.description) errors.description = "campo requerido"

  return errors
};

export default ContactForm;