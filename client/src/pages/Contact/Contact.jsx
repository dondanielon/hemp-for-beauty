import React from "react";
import ContactForm from "../../components/ContactForm/ContactForm";
import styles from "./Contact.module.css";

function Contact() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <ContactForm />
      </div>
    </div>
  );
};

export default Contact;