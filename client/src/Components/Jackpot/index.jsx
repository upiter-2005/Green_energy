import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import styles from "./Jackpot.module.scss";

function Jackpot() {
  return (
    <div className={styles.jackpotWrapp}>
      <div className={styles.jackpotWrapp_value}>
        <span>$1000</span>
      </div>
      <div className={styles.jackpotWrapp_text}>Розыгрыш: 01.06.2023</div>
      <div className={styles.jackpotWrapp_vin}>
        Последний победитель:{" "}
        {/* <button>
          <img src="img/ask.svg" alt="" />
        </button> */}
      </div>
      <div className={styles.jackpotWrapp_user}>User 001</div>
    </div>
  );
}

export default Jackpot;
