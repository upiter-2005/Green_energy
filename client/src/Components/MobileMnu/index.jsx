import { useEffect, useRef } from "react";
import styles from "./MobileMnu.module.scss";
import { Link } from "react-router-dom";

function MobileMnu({ trigger, setTriggerBut }) {
  const modalRef = useRef();
  useEffect(() => {
    document.body.addEventListener("click", handleOutSideClick);
    return () => {
      document.body.removeEventListener("click", handleOutSideClick);
      console.log("unount");
    };
  }, []);

  const handleOutSideClick = (e) => {
    const path = e.path || (e.composedPath && e.composedPath());

    if (path[0] === modalRef.current) {
      setTriggerBut(false);
    }
  };

  return trigger ? (
    <div className={styles.popupMNU} ref={modalRef}>
      <div className={styles.popupMNU_inner}>
        <Link to="/" className={styles.mnu_link}>
          Главная
        </Link>
        <Link to="/marketing" className={styles.mnu_link}>
          Маркетинг
        </Link>
        <Link to="/login" className={styles.mnu_link}>
          Вход
        </Link>
        <Link to="/register" className={styles.mnu_link}>
          Регистрация
        </Link>
        <a href="/" className={styles.langs}>
          RU
        </a>
        <div className={styles.tgBox}>
          <a href="/">
            <img src="img/mobtg.svg" alt="" />{" "}
          </a>
          <a href="/">
            <img src="img/mob-chat.svg" alt="" />{" "}
          </a>
        </div>
      </div>
      <div className={styles.close} onClick={() => setTriggerBut(false)}>
        <img src="img/mob-close.svg" alt="" />
      </div>
    </div>
  ) : (
    ""
  );
}

export default MobileMnu;
