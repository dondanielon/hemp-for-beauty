import React, { useState, useEffect } from 'react'
import styles from "./MakeOrderAs.module.css";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import LoginForm from '../LoginForm/LoginForm';
import RegisterForm from '../RegisterForm/RegisterForm';
import useAuth from '../../hooks/useAuth';

function OptionUser({ setSelection }) {
  const [isRegisterSelected, setIsRegisterSelected] = useState(false);
  const {isAuthenticated} = useAuth();

  useEffect(() => {
    if (isAuthenticated) setSelection("SELECT_BUY_AS_USER");
  }, [isAuthenticated])

  const handleGoBack = (e) => {
    e.preventDefault();
    setSelection("NONE");
  }

  return (
    <div className={styles.userSelection}>
      <div className={styles.userTop}>
        <button className={styles.backBtn} onClick={handleGoBack}><ArrowBackIosIcon/> Ir atras</button>
        <div className={styles.modeSelection}>
          <button className={isRegisterSelected ? styles.modeBtn : styles.modeBtnSelected} onClick={() => setIsRegisterSelected(false)}>Iniciar Sesion</button>
          <div className={styles.split}/>
          <button className={isRegisterSelected ? styles.modeBtnSelected : styles.modeBtn} onClick={() => setIsRegisterSelected(true)}>Crear cuenta</button>
        </div>
      </div>
      <div className={styles.userBottom}>
        {
          isRegisterSelected ? (
            <RegisterForm />
          ) : (
            <LoginForm />
          )
        }
      </div>
    </div>
  )
}

export default OptionUser;