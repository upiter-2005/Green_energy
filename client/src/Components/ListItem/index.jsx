import { useState, useEffect } from "react";
import styles from "./ListItem.module.scss";
import axios from "../../utils/axios";
import { toast } from "react-toastify";

function ListItem({ data, num, updateList }) {
  const [balanceVal, setBalanceVal] = useState(0);

  const saveData = async () => {
    console.log("saveData");
    const res = await axios.patch("/user/updateBalanceAdmin", {
      userId: data._id,
      balance: balanceVal,
    });
    if (res) {
      toast.success(`Баланс пользователя ${data.login} обновлен успешно!`);
      updateList();
    }
    console.log(res);
  };

  useEffect(() => {
    setBalanceVal(data.balance);
  }, []);
  return (
    <div>
      <span>
        {num}) {data.login}
      </span>
      <span>{data.email}</span>
      <span>{data.name}</span>
      <span>{data.phone}</span>
      <span>{data.upliner}</span>
      <input type="number" value={balanceVal} onChange={(e) => setBalanceVal(e.target.value)} />
      <button className={styles.saveBtn} onClick={saveData}>
        save
      </button>
    </div>
  );
}

export default ListItem;
