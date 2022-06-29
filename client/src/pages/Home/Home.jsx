import React from "react";
import Carousel from "../../components/Carousel/Carousel";
import styles from "./Home.module.css";

function Home() {
  return (
    <>
      <Carousel />
      <div className={styles.container}>hola</div>
    </>
  );
};

export default Home;