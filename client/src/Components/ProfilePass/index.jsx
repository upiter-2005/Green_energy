import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./ProfilePass.module.scss";
import { toast } from "react-toastify";
import { passwordUpdate } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

function ProfilePass() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputType, setInputType] = useState("password");
  const [inputCurrent, setInputCurent] = useState("");
  const [newPass, setNewPass] = useState("");
  const [repeatPass, setRepeatPass] = useState("");

  const user = useSelector((state) => state.auth.user);

  console.log(user);

  const handleUpdate = () => {
    console.log("Update func");
    if (newPass !== repeatPass) {
      return toast("Новый пароль не совпадает");
    }
    if (!newPass || !repeatPass) {
      return toast("Заполните поле с новым паролем");
    }
    if (!inputCurrent) {
      return toast("Введите старый пароль");
    }

    const data = { inputCurrent, newPass };
    dispatch(passwordUpdate(data));
    toast("Пароль успешно обновлен!");
    window.localStorage.removeItem("userPassword");
    //dispatch(logOut());
  };

  const toggleInputType = () => {
    inputType === "password" ? setInputType("text") : setInputType("password");
  };

  return (
    <div className="accountDataBlock">
      <h3 className="accTitle">Пароль</h3>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="accountInput passInputAcc">
          <span>Введите текущий пароль</span>
          <input
            type={inputType}
            value={inputCurrent}
            onChange={(e) => setInputCurent(e.target.value)}
          />
          <button className="changePassButShow" onClick={toggleInputType}>
            {inputType === "password" ? (
              <img src="img/show.svg" alt="" />
            ) : (
              <img src="img/hidden.svg" alt="" />
            )}
          </button>
        </div>
        <div className="accountInput passInputAcc">
          <span>Введите новый пароль</span>
          <input type={inputType} value={newPass} onChange={(e) => setNewPass(e.target.value)} />
          <button className="changePassButShow" onClick={toggleInputType}>
            {inputType === "password" ? (
              <img src="img/show.svg" alt="" />
            ) : (
              <img src="img/hidden.svg" alt="" />
            )}
          </button>
        </div>
        <div className="accountInput  passInputAcc">
          <span>Введите новый пароль еще раз</span>
          <input
            type={inputType}
            value={repeatPass}
            onChange={(e) => setRepeatPass(e.target.value)}
          />
          <button className="changePassButShow" onClick={toggleInputType}>
            {inputType === "password" ? (
              <img src="img/show.svg" alt="" />
            ) : (
              <img src="img/hidden.svg" alt="" />
            )}
          </button>
        </div>

        <div>
          <button type="submit" className="saveBtn" onClick={handleUpdate}>
            Сохранить
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProfilePass;
