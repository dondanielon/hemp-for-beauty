import React, { useState, useEffect } from "react";
import styles from "./Carousel.module.css";
import { useNavigate } from "react-router-dom";

const imageSlider = [
  {
    name: "Acerca de nosotros",
    description: "Mas informacion acerca de Hemp for Beauty.",
    btn: "Conocenos",
    url: "https://i.ibb.co/ph7pJYD/image0-1-3-2.jpg",
    to: "/nosotros"
  },
  {
    name: "Productos",
    description: "Ve a nuestro catalogo.",
    btn: "Ver productos",
    url: "https://i.ibb.co/ww1B2GX/all.jpg",
    to: "/productos"
  }
];

function Carousel() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  function next() {
    currentIndex < imageSlider.length -1 ? setCurrentIndex(currentIndex + 1) : setCurrentIndex(0)
  }

  function back() {
    currentIndex > 0 ? setCurrentIndex(currentIndex - 1): setCurrentIndex(imageSlider.length - 1)
  }

  useEffect(() => {
    const time = setTimeout(next, 10000);
    return () => clearTimeout(time);
  },[currentIndex]);
  
  
  return (
    <div className={`${styles.container} ${styles.fade}`} key={currentIndex}>
      <img className={`${styles.image} ${styles.scaledown}`} src={imageSlider[currentIndex].url} />
      <div className={styles.carouselInfo}>
        <label className={styles.title}>{imageSlider[currentIndex].name.toLocaleUpperCase()}</label>
        <label className={styles.description}>{imageSlider[currentIndex].description}</label>
        <button className={styles.redirect} onClick={() => navigate(imageSlider[currentIndex].to)}>{imageSlider[currentIndex].btn.toLocaleUpperCase()}</button>
        <div className={styles.dotContainer}>
          {imageSlider.length && imageSlider.map((e, k) => <span key={k + 1} className={currentIndex !== k ? styles.dot : styles.activeDot} onClick={() => setCurrentIndex(k)}></span>)}
        </div>
      </div>
    </div>
  );
};

export default Carousel;