import { useEffect, useRef } from "react";
import styles from "./Popup.module.scss";
import { toast } from "react-toastify";

function Popup({ trigger, telegram, whatsapp, facebook, instagram, twitter, setTriggerBut }) {
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
    console.log(path);
    if (path[0] === modalRef.current) {
      setTriggerBut(false);
    }
  };

  const copyLink = (link) => {
    navigator.clipboard.writeText(link).then(() => {
      toast("Cсылка скопирована");
    });
  };

  return trigger ? (
    <div className={styles.popup} ref={modalRef}>
      <div className={styles.popup_inner}>
        <h3>Соцсети</h3>
        {!telegram && !whatsapp && !facebook && !instagram && !twitter ? (
          <div style={{ textAlign: "center" }}>Нет соцсетей</div>
        ) : (
          ""
        )}
        {telegram && (
          <div className={styles.socItem}>
            <img src="img/p-telegram.svg" alt="" />
            <input type="text" value={telegram} disabled />
            <button className={styles.popupCopy} onClick={() => copyLink(telegram)}>
              <img src="img/p-copy.svg" alt="" />
            </button>
          </div>
        )}
        {whatsapp && (
          <div className={styles.socItem}>
            <img src="img/p-whatsapp.svg" alt="" />
            <input type="text" value={whatsapp} disabled />
            <button className={styles.popupCopy} onClick={() => copyLink(whatsapp)}>
              <img src="img/p-copy.svg" alt="" />
            </button>
          </div>
        )}
        {facebook && (
          <div className={styles.socItem}>
            <img src="img/p-fb.svg" alt="" />
            <input type="text" value={facebook} disabled />
            <button className={styles.popupCopy} onClick={() => copyLink(facebook)}>
              <img src="img/p-copy.svg" alt="" />
            </button>
          </div>
        )}
        {instagram && (
          <div className={styles.socItem}>
            <img src="img/p-insta.svg" alt="" />
            <input type="text" value={instagram} disabled />
            <button className={styles.popupCopy} onClick={() => copyLink(instagram)}>
              <img src="img/p-copy.svg" alt="" />
            </button>
          </div>
        )}
        {twitter && (
          <div className={styles.socItem}>
            <img src="img/p-twitter.svg" alt="" />
            <input type="text" value={twitter} disabled />
            <button className={styles.popupCopy} onClick={() => copyLink(twitter)}>
              <img src="img/p-copy.svg" alt="" />
            </button>
          </div>
        )}

        <div className={styles.close} onClick={() => setTriggerBut(false)}>
          <img src="img/p-close.svg" alt="" />
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}

export default Popup;
