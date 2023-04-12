import { useCallback, useEffect, useState } from "react";
import styles from "./LenearItem.module.scss";
import axios from "../../utils/axios";

function LenearItem({ login }) {
  const [upliner, setUpliner] = useState();
  const [trimLogin, setTrimLogin] = useState("");

  const getSponsor = useCallback(async () => {
    const { data } = await axios.post(`/user/getUserByLogin`, { login });
    console.log(data);
    setUpliner(data.user);
  }, []);

  useEffect(() => {
    console.log(login.length);
    if (login.length > 9) {
      let trim = login.substring(0, 9) + "...";
      setTrimLogin(trim);
    } else {
      setTrimLogin(login);
    }
    getSponsor();
  }, []);

  return (
    <div className={styles.lenearItem}>
      {trimLogin}
      <div className={styles.lenearItem_info}>
        <div className={styles.lenearItem_infoItem}>
          <span>Логин:</span>
          <span>{upliner?.login}</span>
        </div>
        <div className={styles.lenearItem_infoItem}>
          <span>Email:</span>
          <span>{upliner?.email}</span>
        </div>
        <div className={styles.lenearItem_infoItem}>
          <span>Telegram:</span>
          <span>{upliner?.telegram}</span>
        </div>
        <div className={styles.lenearItem_infoItem}>
          <span>Спонсор:</span>
          <span>{upliner?.upliner}</span>
        </div>
      </div>
    </div>
  );
}

export default LenearItem;
