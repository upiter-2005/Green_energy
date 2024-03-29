import React from "react";
import { useSelector } from "react-redux";
import styles from "./Payeer.module.scss";
import { toast } from "react-toastify";

function Payeer() {
  const user = useSelector((state) => state.auth.user);
  const copyLink = (val) => {
    navigator.clipboard.writeText(val).then(() => {
      //setCopiedShow(true);
      toast.success("Cкопировано");
    });
  };
  console.log(user);
  return (
    <div className={styles.payMthod_box}>
      <h3 className={styles.payHeader}>Пополнение через платежную систему PAYEER</h3>
      <div className={styles.pay_text}>
        Для пополнения баланса на своём счёте в Green Energy необходимо выполнить перевод с вашего
        счета Paeer на счет P1039128630 , указав нужную сумму увеличенную на 2% эквивалентных
        денежных средств в USD.
      </div>
      <div className={styles.inputField}>
        <input type="text" value={user?.payeer} />
        <span>
          <button onClick={() => copyLink(user.payeer)}>
            <img src="img/copy.svg" alt="" />
          </button>
        </span>
      </div>
      <div className={styles.pay_text}>
        <p>Скриншот перевода следует отправить во вложении с текстом на почту: </p>
        <p>
          itgrenclub@gmail.com
          <button onClick={() => copyLink("itgrenclub@gmail.com")}>
            <img src="img/copy.svg" alt="" />
          </button>
        </p>
        <p>
          "Я совершил(а) перевод на сумму ….USD через систему Payeer. <br /> Мой логин в клубе …..
        </p>
        <p>
          Адрес моей почты ({user.email})".
          <button onClick={() => copyLink(user.email)}>
            <img src="img/copy.svg" alt="" />
          </button>
        </p>
        <p> После чего Вам, на указанный Вами адрес почты, поступит уведомление:</p>
        <p>"Деньги в количестве …….USD успешно зачислены на Ваш лицевой счет".</p>
      </div>
    </div>
  );
}

export default Payeer;
