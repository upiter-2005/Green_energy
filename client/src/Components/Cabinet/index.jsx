import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Popup from "../Popup";
import styles from "./Cabinet.module.scss";

function Cabinet() {
  const dispatch = useDispatch();
  const [butPopup, setButPopup] = useState(false);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {}, [dispatch]);
  console.log(user);
  return (
    <div className={styles.cabinetWrapp}>
      <img src="img/cabTitle.svg" className={styles.cabinetTitle_Img} alt="" />
      <div className="borderRound">
        <div className={styles.cabinet_area}>
          <div className={styles.cabinet_area_left}>
            <div className={styles.cabinet_area_leftTop}>
              <img src="img/avatar-default.svg" alt="" />
              <div>
                <h3>{user.login}</h3>
                <p>
                  Ваш статус: <span>{user.status ? "Активный" : "Не активный"}</span>
                </p>
                <p>
                  Ваш спонсор: <span>{user.upliner ? user.upliner : " --- "}</span>
                  <button onClick={() => setButPopup(true)}>
                    <span>СОЦСЕТИ</span>
                  </button>
                </p>
              </div>
            </div>

            <div className={styles.cabinet_area_leftCenter}>
              <h4>Балансы счетов:</h4>

              <div className={`${styles.balanceItem} ${styles.f1}`}>
                <div className={styles.flexRow}>
                  <span className={styles.title_text}>$USD</span>{" "}
                  <button className={styles.transfer}>
                    <img src="img/transfer.svg" alt="" />
                  </button>
                </div>

                <div className={styles.flexRow}>
                  <div className={styles.flexRow_gorizont}>
                    <span className={styles.fz14}>Основной баланс:</span>
                    <span className={styles.fz20}>0.00 USD</span>
                  </div>
                  <div className={styles.flexRow_gorizont}>
                    <button className={styles.buyUsdt}>
                      <img src="img/buy.svg" alt="" />
                    </button>
                    <button className={styles.withdraw}>
                      <img src="img/withdraw.svg" alt="" />
                    </button>
                  </div>
                </div>
              </div>

              <div className={`${styles.balanceItem} ${styles.f2}`}>
                <div className={styles.flexRow}>
                  <span className={styles.title_text_min}>ПОКУПКА ПАКЕТА</span>{" "}
                  <span className={styles.title_text_24}>$30</span>
                </div>
                <button>
                  <img src="img/buy_packet.svg" alt="" className={styles.buy_pocket} />
                </button>
                <div className={styles.flexRow}>
                  <div className={styles.flexRow_vertical}>
                    <span className={styles.active_pockets}>Активных пакетов:</span>
                    <span className={styles.title_text_24}>3</span>
                  </div>
                  <div className={styles.flexRow_gorizont}>
                    <span className={styles.fz14}>Реинвест баланс:</span>
                    <span className={styles.fz16}>0.00 USD</span>
                  </div>
                </div>
              </div>
              <div className={`${styles.balanceItem} ${styles.f3}`}>
                <div className={styles.flexRow}>
                  <span className={styles.title_text}>ENERGY</span>{" "}
                  <button className={styles.transfer}>
                    <span className={styles.fz20}>1 = 0.01 USD</span>
                  </button>
                </div>

                <div className={styles.flexRow}>
                  <div className={styles.flexRow_gorizont}>
                    <span className={styles.fz14}>Мои токены:</span>
                    <span className={styles.fz20}>3000 ENERGY</span>
                  </div>
                  <div className={styles.flexRow_gorizont}>
                    <span className={styles.title_text_24}>$30</span>
                  </div>
                </div>
              </div>
              <div className={`${styles.balanceItem} ${styles.f4}`}>
                <div className={styles.flexRow}>
                  <span className={styles.title_text_min}>КУПИТЬ РЕФЕРАЛА</span>{" "}
                  <span className={styles.title_text_24}>$5</span>
                </div>
                <button>
                  <img src="img/buy_ref.svg" alt="" className={styles.buy_pocket} />
                </button>
                <div className={styles.flexRow}>
                  <div className={styles.flexRow_gorizont}>
                    <span className={styles.textBalance}>Основной баланс:</span>
                    <span className={styles.mainBalance}>0.00 USD</span>
                  </div>
                  <div className={styles.flexRow_gorizont}>
                    <button className={styles.buyUsdt}>
                      <span>ПОПОЛНИТЬ</span>
                    </button>
                    <button className={styles.withdraw}>
                      <span>ВЫВЕСТИ</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.cabinet_area_leftBottom}></div>
          </div>
          <div className={styles.cabinet_area_right}>
            <div className={styles.userInfo}>
              <div className={styles.userInfoItem}>
                <p>0</p>
                Моя команда
              </div>
              <div className={styles.userInfoItem}>
                <p>0</p>
                Лично приглашенные
              </div>
              <div className={styles.userInfoItem}>
                <p>0</p>
                Активные партнеры
              </div>
              <div className={styles.userInfoItem}>
                <p>$ 0</p>
                Реферальные награды
              </div>
              <div className={styles.userInfoItem}>
                <p>$ 0</p>
                Всего заработано
              </div>
            </div>
          </div>
        </div>
      </div>

      <Popup
        trigger={butPopup}
        telegram={user?.telegram}
        whatsapp={user?.whatsapp}
        facebook={user?.facebook}
        instagram={user?.instagram}
        twitter={user?.twitter}
        setTriggerBut={setButPopup}>
        <h2>telegram</h2>
      </Popup>
    </div>
  );
}

export default Cabinet;
