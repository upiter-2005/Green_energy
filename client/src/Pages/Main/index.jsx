import React from "react";
import styles from "./Main.module.scss";
import { Link } from "react-router-dom";

function Main() {
  return (
    <div className={styles.mainWraper}>
      <div className={styles.mainTop}>
        <img src="img/logo-main.svg" alt="" />
      </div>
      <div className={styles.mainCenter}>
        <p className={styles.mainCenter_gradient}>
          Welcome to the exciting world of decentralized technologies!
        </p>
        <p className={styles.mainCenter_white}>
          ENERGY GALAXY is a long-term blockchain game in which you have to develop and improve the
          unusual Galaxy.
        </p>
        <Link to="/login" className={styles.mainLinks}>
          ВХОД
        </Link>
        <Link to="/register" className={styles.mainLinks}>
          РЕГИСТРАЦИЯ
        </Link>
      </div>
    </div>
  );
}

export default Main;
