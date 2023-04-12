import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Jackpot from "../Jackpot";
import FaqCabinet from "../FaqCabinet";
import FaqFinance from "../FaqFinance";
import FaqEarn from "../FaqEarn";
import FaqSave from "../FaqSave";
import FaqMultiple from "../FaqMultiple";
import FaqReklama from "../FaqReklama";

import styles from "./Education.module.scss";

function Education() {
  const [activeTab, setActiveTab] = useState("kabinet");
  return (
    <div className={styles.cabinetWrapp}>
      <Jackpot />
      <img src="img/education.png" className={styles.cabinetTitle_Img} alt="" />
      <div className="borderRound">
        <div className={styles.cabinetWrapp_mnu}>
          <span
            className={activeTab === "kabinet" ? styles.activeTab : undefined}
            onClick={() => setActiveTab("kabinet")}>
            Кабинет
          </span>
          <span
            className={activeTab === "finance" ? styles.activeTab : undefined}
            onClick={() => setActiveTab("finance")}>
            Финансы
          </span>
          <span
            className={activeTab === "earn" ? styles.activeTab : undefined}
            onClick={() => setActiveTab("earn")}>
            Заработать
          </span>
          <span
            className={activeTab === "save" ? styles.activeTab : undefined}
            onClick={() => setActiveTab("save")}>
            Сохранить
          </span>
          <span
            className={activeTab === "multiple" ? styles.activeTab : undefined}
            onClick={() => setActiveTab("multiple")}>
            Приумножить
          </span>
          <span
            className={activeTab === "reklama" ? styles.activeTab : undefined}
            onClick={() => setActiveTab("reklama")}>
            Рекламная
          </span>
        </div>

        <div className={styles.cabinetWrap_area}>
          {activeTab === "kabinet" && <FaqCabinet />}
          {activeTab === "finance" && <FaqFinance />}
          {activeTab === "earn" && <FaqEarn />}
          {activeTab === "save" && <FaqSave />}
          {activeTab === "multiple" && <FaqMultiple />}
          {activeTab === "reklama" && <FaqReklama />}
        </div>
      </div>
    </div>
  );
}

export default Education;
