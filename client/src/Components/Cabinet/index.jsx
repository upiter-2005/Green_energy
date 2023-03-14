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
            <div className={styles.cabinet_area_leftCenter}></div>
            <div className={styles.cabinet_area_leftBottom}></div>
          </div>
          <div className={styles.cabinet_area_right}></div>
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
