import { useEffect, useRef, useState } from "react";
import styles from "./Withdraw.module.scss";
import { toast } from "react-toastify";

import MetamaskWithdraw from "../MetamaskWithdraw";
import Payeer from "../Payeer";
import Advcash from "../Advcash";

function Withdraw({ trigger, setTriggerBut }) {
  const modalRef = useRef();
  const [payMethod, setPayMethod] = useState("");

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
      setPayMethod("");
    }
  };

  const copyLink = (link) => {
    navigator.clipboard.writeText(link).then(() => {
      toast.success("Cсылка скопирована");
    });
  };

  return trigger ? (
    <div className={styles.popup} ref={modalRef}>
      <div className={styles.popup_inner}>
        {!payMethod && (
          <>
            <h3 className={styles.payHeader}>ВЫВОД СРЕДСТВ</h3>
            {/* <div className={styles.inputField}>
              <label htmlFor="ass">Укажите сумму пополнения:</label>
              <input type="number" />
              <span>USD</span>
            </div> */}
            <div className={styles.payMethods}>
              <button onClick={() => setPayMethod("metamask")}>
                <img src="img/metamask.svg" alt="" />
              </button>

              <button
                onClick={() => {
                  //setPayMethod("payeer");
                  toast.error("В разработке ");
                }}>
                <img src="img/payeer.svg" alt="" />
              </button>

              <button
                onClick={() => {
                  //setPayMethod("advcash");
                  toast.error("В разработке ");
                }}>
                <img src="img/advcash.svg" alt="" />
              </button>
            </div>
          </>
        )}

        {payMethod === "metamask" && <MetamaskWithdraw />}
        {payMethod === "payeer" && <Payeer />}
        {payMethod == "advcash" && <Advcash />}

        <div
          className={styles.close}
          onClick={() => {
            setTriggerBut(false);
            setPayMethod("");
          }}>
          <img src="img/p-close.svg" alt="" />
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}

export default Withdraw;
