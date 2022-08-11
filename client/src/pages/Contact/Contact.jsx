import React from "react";
import ContactForm from "../../components/ContactForm/ContactForm";
import styles from "./Contact.module.css";
import EmailIcon from "@mui/icons-material/Email";

function Contact() {
  return (
    <div className="page">
      <div className={styles.container}>
        <label className={styles.title}><EmailIcon fontSize="large"/>CONTACTANOS</label>
        <ContactForm />
      </div>
    </div>
  );
};

export default Contact;