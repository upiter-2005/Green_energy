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
        <p className={styles.mainCenter_gradient}>Добро пожаловать в Бизнес Интернет Сообщество!</p>
        <p className={styles.mainCenter_white}>
          Green Energy - первая ступень к свободной и перспективной жизни. <br /> Миссия площадки:
          Зарабатывая сохраняешь, Сохраняя приумножаешь.
        </p>
        <Link to="/login" className={styles.mainLinks}>
          ВХОД
        </Link>
        <Link to="/register?upliner=GreenEnergy" className={styles.mainLinks}>
          РЕГИСТРАЦИЯ
        </Link>
      </div>
    </div>
  );
}

export default Main;
