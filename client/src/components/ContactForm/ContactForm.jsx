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
    description: "",
    reason: "" 
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
      <TextField 
        id="name" 
        label="Nombre" 
        variant="filled" 
        value={input.name} 
        onChange={handleInputChange}
      />
      <FormControl className={styles.inputForm} variant="filled">
      <InputLabel className={styles.inputLabel}>Email</InputLabel>
        <FilledInput
          className={styles.inputField}
          id="email"   
          value={input.email} 
          onChange={handleInputChange}
          endAdornment={<InputAdornment position="end"><AlternateEmailIcon className={styles.inputIcon}/></InputAdornment>}
          size="small"
        />
      </FormControl>
      <FormControl className={styles.inputForm} variant="filled">
        <InputLabel className={styles.inputLabel}>Telefono</InputLabel>
        <FilledInput
          className={styles.inputField}
          id="phone"  
          value={input.phone} 
          onChange={handleInputChange}
          endAdornment={<InputAdornment position="end"><PhoneIphoneIcon className={styles.inputIcon}/></InputAdornment>}
          size="small"
        />
      </FormControl>
    </Box>
  );
};

function validate(input) {
    const errors = {};
};

export default ContactForm;