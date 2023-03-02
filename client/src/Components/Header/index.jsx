import React from "react";

import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkIsAuth, logOut } from "../../redux/slices/authSlice";

function Header() {
  const isAuth = useSelector(checkIsAuth);
  const dispatch = useDispatch();
  return (
    <div className={styles.headerWrap}>
      <div>
        <img src="img/logo.svg" alt="" className={styles.logo} />
      </div>
      <div className={styles.headerCenter}>
        <span className={styles.headerCenter_text}>Реферальная ссылка:</span>
        <span className={styles.copyLink}>https://greentour.com.ndjdkvw</span>{" "}
        <img src="img/link.svg" alt="" className={styles.headerIco} />
        <img src="img/share.svg" alt="" className={styles.headerIco} />
      </div>

      <div className={styles.headerRight}>
        <img src="img/ru.svg" alt="" className={styles.headerIco} />
        <img
          src="img/logout.svg"
          alt=""
          onClick={() => dispatch(logOut())}
          className={styles.headerIco}
        />
      </div>
    </div>
  );
}

export default Header;
