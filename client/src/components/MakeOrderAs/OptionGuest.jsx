import { useState, useEffect } from "react";
import styles from "./MakeOrderAs.module.css";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import InfoIcon from '@mui/icons-material/Info';
import { setClientInfo } from "../../redux/actions";
import { useDispatch } from "react-redux";

function OptionGuest({ setSelection }) {
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    email: "",
    phone: ""
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setErrors(validate(input));
  }, [input]);

  const handleGuestInfo = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (Object.keys(errors).length === 0) {
      dispatch(setClientInfo(input));
      setSelection("SELECT_BUY_AS_GUEST");
    }
  }

  const handleGoBack = (e) => {
    e.preventDefault();
    setSelection("NONE");
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
        {submitted && errors.email && <label className={styles.errorEmail}>{errors.email}</label>}
        <input 
          type="text" 
          autoComplete="off" 
          className={styles.input} 
          placeholder="Número de teléfono"
          name="phone"
          value={input.phone}
          onChange={handleInputChange}
        />
        {submitted && errors.phone && <label className={styles.errorPhone}>{errors.phone}</label>}
      </div>
      <div className={styles.bottom}>
        <button type="submit" className={styles.confirm}>Confirmar</button>
      </div>
    </form>
  );
}

function validate(input) {
  let errors = {};
  const validEmail = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
  const validPhone = new RegExp(/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/)

  if (!input.email) errors.email = "campo requerido";
  else if (!validEmail.test(input.email)) errors.email = "email invalido";

  if (!input.phone) errors.phone = "campo requerido";
  else if (!validPhone.test(input.phone)) errors.phone = "telefono invalido";

  return errors;
}

export default OptionGuest;