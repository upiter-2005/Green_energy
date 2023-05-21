import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { goTansfer } from "../../redux/slices/authSlice";
import styles from "./Transfer.module.scss";
import { toast } from "react-toastify";
import axios from "../../utils/axios";

function Transfer({ trigger, setTriggerBut }) {
  console.log(trigger);
  const dispatch = useDispatch();
  const [uplinerValid, setUplinerValid] = useState(0);
  const [amount, setAmount] = useState(0);
  const [login, setLogin] = useState("");
  const user = useSelector((state) => state.auth.user);
  const status = useSelector((state) => state.auth.status);
  const modalRef = useRef();

  useEffect(() => {
    document.body.addEventListener("click", handleOutSideClick);
    return () => {
      document.body.removeEventListener("click", handleOutSideClick);
      console.log("unmount");
    };
  }, []);

  const handleOutSideClick = (e) => {
    const path = e.path || (e.composedPath && e.composedPath());

    if (path[0] === modalRef.current) {
      setTriggerBut(false);
    }
  };
  useEffect(() => {
    toast.success(status);
  }, [status]);

  const checkUpliner = async (e) => {
    setLogin(e.target.value);
    if (e.target.value.length > 3) {
      setUplinerValid(null);

      const { data } = await axios.post("auth/checkUpliner", {
        login: e.target.value,
      });
      if (data.message) {
        toast.error("Такого спонсора не существует");
        setUplinerValid(1);
      } else {
        setUplinerValid(null);
        toast.success("Спонсор найден!");
      }
    } else {
      setUplinerValid(1);
    }
  };

  const makeTransfer = async () => {
    if (user?.balance < amount) {
      toast.error("Не достаточно средств для перевода!");
      return;
    }
    if (uplinerValid) {
      toast.error("Такого спонсора не существует");
    }
    if (uplinerValid === null) {
      const data = {
        amount,
        recepient: login,
      };
      dispatch(goTansfer(data));
      toast.success(`Перевод пользователю ${login} на сумму ${amount} выполнен успешно!`);
    }
  };

  return trigger ? (
    <div className={styles.popup} ref={modalRef}>
      <div className={styles.popup_inner}>
        <div className={styles.payMthod_box}>
          <h3 className={styles.payHeader}>ПЕРЕВОД USD ДРУГОМУ УЧАСТНИКУ</h3>
          <div className={styles.inputField}>
            <label htmlFor="ass">Укажите логин участника:</label>
            <input type="text" value={login} onChange={checkUpliner} />
          </div>
          <br />
          <div className={styles.inputField}>
            <div className={styles.inputField_info}>
              Ваш баланс: <span>{user?.balance} USD</span>
            </div>
            <label htmlFor="ass">Укажите сумму пополнения:</label>
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
            <span>USDT</span>
          </div>

          <button className={styles.submitPay} onClick={makeTransfer}>
            Перевести
          </button>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}

export default Transfer;
