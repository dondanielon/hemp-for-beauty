import React, { useEffect, useState } from "react";
import styles from "./ContactForm.module.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import FilledInput from "@mui/material/FilledInput";
import InputLabel from "@mui/material/InputLabel";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";

function ContactForm() {
  const [input, setInput] = useState({
    name: "",
    email: "",
    phone: "",
    reason: "", 
    description: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.id]: e.target.value
    });
  };

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      className={styles.form}
    >
      <FormControl className={styles.inputForm} variant="filled"  color="pink">
      <InputLabel className={styles.inputLabel}>Nombre</InputLabel>
        <FilledInput
          className={styles.inputField}
          id="name"   
          value={input.name} 
          onChange={handleInputChange}
          size="small"
          color="pink"
        />
      </FormControl>
      <FormControl className={styles.inputForm} variant="filled"  color="pink">
      <InputLabel className={styles.inputLabel}>Email</InputLabel>
        <FilledInput
          className={styles.inputField}
          id="email"   
          value={input.email} 
          onChange={handleInputChange}
          endAdornment={<InputAdornment position="end"><AlternateEmailIcon className={styles.inputIcon}/></InputAdornment>}
          size="small"
          color="pink"
        />
      </FormControl>
      <FormControl className={styles.inputForm} variant="filled" color="pink">
        <InputLabel className={styles.inputLabel}>Telefono</InputLabel>
        <FilledInput
          className={styles.inputField}
          id="phone"  
          value={input.phone} 
          onChange={handleInputChange}
          endAdornment={<InputAdornment position="end"><PhoneIphoneIcon className={styles.inputIcon}/></InputAdornment>}
          size="small"
          color="pink"
        />
      </FormControl>
      <FormControl className={styles.inputForm} variant="filled" color="pink">
        <InputLabel className={styles.inputLabel}>Descripcion</InputLabel>
        <FilledInput
          className={styles.inputField}
          id="description"  
          value={input.description} 
          onChange={handleInputChange}
          size="small"
          color="pink"
          multiline
          rows={3}
        />
      </FormControl>
    </Box>
  );
};

function validate(input) {
    const errors = {};
};

export default ContactForm;