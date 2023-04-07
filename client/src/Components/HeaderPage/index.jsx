import React from "react";
import { Link } from "react-router-dom";
import styles from "./HeaderPage.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import MobileMnu from "../MobileMnu";

function HeaderPage() {
  const user = useSelector((state) => state.auth.user);
  const [butPopup, setButPopup] = useState(false);

  return (
    <div className={styles.headerWrap}>
      <div className={styles.inner}>
        <div className="d-md-none">
          <img src="img/mob-logo.svg" alt="" width={40} />
        </div>
        <div className={styles.inner_top}>
          <div>
            Всего участников <span>1750</span>
          </div>
          <div>
            Присоеденились за 24 часа <span>247</span>
          </div>
          <div>
            Заработали за все время <span> $ 792 945</span>
          </div>
        </div>
        <div className="d-md-none">
          <img
            src="img/mnu.svg"
            alt=""
            className={styles.mnu}
            onClick={() => setButPopup(true)}
            width={40}
          />
        </div>
        <div className="row ai-center pk">
          <img src="img/logo-main.svg" alt="" className={styles.logo} />
          <div className={styles.headerButs}>
            <Link to="/" className="btn-small header-btn">
              <span>Главная</span>
            </Link>
            <Link to="/marketing" className="btn-small header-btn">
              <span>Маркетинг</span>
            </Link>
            <Link to="/login" className="btn-small header-btn">
              <span>Вход</span>
            </Link>
            <Link to="/register" className="btn-small header-btn">
              <span>Регистрация</span>
            </Link>
          </div>
        </div>
      </div>
      <MobileMnu trigger={butPopup} setTriggerBut={setButPopup} />
    </div>
  );
}

export default HeaderPage;
