import React from "react";
import styles from "./Preloader.module.scss";

function Preloader() {
  return (
    <div className={styles.preloader}>
      <img src="img/preloader.svg" alt="" />
    </div>
  );
}

export default Preloader;
