import { useState } from "react";
import styles from "./MakeOrderAs.module.css";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import InfoIcon from '@mui/icons-material/Info';

function OptionGuest({ setSelection }) {
  const [input, setInput] = useState({
    email: "",
    phone: ""
  });

  const handleGuestInfo = (e) => {
    e.preventDefault();
  }

  const handleGoBack = (e) => {
    e.preventDefault();
    setSelection("none");
  }

  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }

  return (
    <form className={styles.guestForm} onSubmit={handleGuestInfo}>
      <div className={styles.top}>
        <button className={styles.backBtn} onClick={handleGoBack}><ArrowBackIosIcon/> Ir atras</button>
      </div>
      <div className={styles.mid}>
        <label className={styles.guestTitle}><InfoIcon fontSize="small"/> Ingresa correo electronico y teléfono para comprar como invitado.</label>
        <input 
          type="text"
          autoComplete="off" 
          className={styles.input} 
          placeholder="Correo electronico"
          name="email"
          value={input.email}
          onChange={handleInputChange}
        />
        <input 
          type="text" 
          autoComplete="off" 
          className={styles.input} 
          placeholder="Número de teléfono"
          name="phone"
          value={input.phone}
          onChange={handleInputChange}
        />
      </div>
      <div className={styles.bottom}>
        <button type="submit" className={styles.confirm}>Confirmar</button>
      </div>
    </form>
  );
}

export default OptionGuest;