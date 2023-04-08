import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Jackpot from "../Jackpot";

import styles from "./Education.module.scss";

function Education() {
  return (
    <div className={styles.cabinetWrapp}>
      <Jackpot />
      <img src="img/education.png" className={styles.cabinetTitle_Img} alt="" />
      <div className="borderRound">
        <div className={styles.structure_area}>Education</div>
      </div>
    </div>
  );
}

export default Education;
