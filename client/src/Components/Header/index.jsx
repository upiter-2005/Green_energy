import React from "react";

import styles from "./Header.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { checkIsAuth, logOut } from "../../redux/slices/authSlice";
import { useState } from "react";
import Copied from "../Copied";
import { toast } from "react-toastify";
function Header() {
  const isAuth = useSelector(checkIsAuth);
  const dispatch = useDispatch();
  const [copiedShow, setCopiedShow] = useState(false);
  const user = useSelector((state) => state.auth.user);

  const copyLink = () => {
    navigator.clipboard
      .writeText(`https://greenenergy.vip/register?upliner=${user?.login}`)
      .then(() => {
        //setCopiedShow(true);
        toast("Реферальная ссылка скопирована");
      });
  };

  return (
    <div className={styles.headerWrap}>
      <div>
        <img src="img/logo-main.svg" alt="" className={styles.logo} />
      </div>
      <div className={styles.headerCenter}>
        <span className={styles.headerCenter_text}>Реферальная ссылка:</span>
        <span
          className={styles.copyLink}>{`https://greenenergy.vip?upliner=${user?.login}`}</span>{" "}
        <img src="img/link.svg" alt="" className={styles.headerIco} onClick={copyLink} />
        <img src="img/share.svg" alt="" className={styles.headerIco} />
        <img src="img/ru.svg" alt="" className={styles.headerIco} />
        <img
          src="img/logout.svg"
          alt=""
          onClick={() => dispatch(logOut())}
          className={styles.headerIco}
        />
      </div>

      {/* <div className={styles.headerRight}>
        <img src="img/ru.svg" alt="" className={styles.headerIco} />
        <img
          src="img/logout.svg"
          alt=""
          onClick={() => dispatch(logOut())}
          className={styles.headerIco}
        />
      </div> */}
      {copiedShow && <Copied />}
    </div>
  );
}

export default Header;
