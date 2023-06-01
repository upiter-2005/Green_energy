import React from "react";
import styles from "./Soon.module.scss";

function Soon() {
  return (
    <div className={styles.soonWrapper}>
      <img src="img/logo-main.svg" alt="" className={styles.logoSoon} />

      <img src="img/soon.svg" alt="" />
      <h1>Сайт находится на техническом обслуживании!</h1>
      <a href="https://t.me/GreenEnergy_channel" target="blank">
        <img src="img/ch-telegram.svg" alt="" /> <span>Telegram</span>
      </a>
    </div>
  );
}

export default Soon;
