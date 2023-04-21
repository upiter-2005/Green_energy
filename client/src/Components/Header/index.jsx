import React from "react";

import styles from "./Header.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { checkIsAuth, logOut } from "../../redux/slices/authSlice";
import { useState } from "react";
import { Link } from "react-router-dom";
import Copied from "../Copied";
import MobileMnu from "../MobileMnu";
import { toast } from "react-toastify";
function Header() {
  const isAuth = useSelector(checkIsAuth);
  const dispatch = useDispatch();
  const [copiedShow, setCopiedShow] = useState(false);
  const [butPopup, setButPopup] = useState(false);
  const user = useSelector((state) => state.auth.user);

  const copyLink = () => {
    navigator.clipboard.writeText(`https://greenenergy.vip/?upliner=${user?.login}`).then(() => {
      //setCopiedShow(true);
      toast.success("Реферальная ссылка скопирована");
    });
  };

  return (
    <div className={styles.headerWrap}>
      <div className={`d-md-none ${styles.mobLogo}`}>
        <img src="img/mob-logo.svg" alt="" width={40} />
      </div>
      <div>
        <Link to="/">
          <img src="img/logo-main.svg" alt="" className={styles.logo} />
        </Link>
      </div>

      <div className={`d-md-none ${styles.mnuMob}`}>
        <img
          src="img/account-mnu.svg"
          alt=""
          className={styles.mnu}
          onClick={() => setButPopup(true)}
          width={40}
        />
      </div>
      <div className={styles.headerCenter}>
        <span className={styles.headerCenter_text}>Реферальная ссылка:</span>
        <span className={styles.copyLink}>{`https://greenenergy.vip?upliner=${user?.login}`}</span>
        <img src="img/link.svg" alt="" className={styles.headerIco} onClick={copyLink} />
        <img src="img/share.svg" alt="" className={styles.headerIco} />
      </div>

      <div className={styles.headerRight}>
        <a href="https://t.me/Greentur_club" target="blank">
          <img src="img/tg.svg" alt="" className={styles.headerIco} />
        </a>
        <img src="img/ru.svg" alt="" className={styles.headerIco} />
        {user?.avatar ? (
          <img
            src={`${process.env.REACT_APP_IMG_URL}${user?.avatar}`}
            width="45px"
            alt=""
            className={styles.headerIcoAvatar}
          />
        ) : (
          <Link to="/account">
            <img src="img/avatar-ico.svg" alt="" className={styles.headerIco} />
          </Link>
        )}

        <img
          src="img/logout.svg"
          alt=""
          onClick={() => dispatch(logOut())}
          className={styles.headerIco}
        />
      </div>
      {copiedShow && <Copied />}
      <MobileMnu trigger={butPopup} setTriggerBut={setButPopup} />
    </div>
  );
}

export default Header;
