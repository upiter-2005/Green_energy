import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkIsAuth, loginUser, changeFormState, cleanStatus } from "../../redux/slices/authSlice";
import { toast } from "react-toastify";
import styles from "./Login.module.scss";

export default function Login() {
  const [remember, setRemember] = useState(false);
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [inputType, setInputType] = useState("password");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const status = useSelector((state) => state.auth.status);
  const isAuth = useSelector(checkIsAuth);

  useEffect(() => {
    if (window.localStorage.getItem("userEmail") || window.localStorage.getItem("userPassword")) {
      setRemember(true);
      setemail(window.localStorage.getItem("userEmail"));
      setPassword(window.localStorage.getItem("userPassword"));
    }
  }, []);
  useEffect(() => {
    if (status) {
      toast.success(status);
    }
    dispatch(cleanStatus());
    if (isAuth) {
      navigate("/account");
    }
  }, [isAuth, dispatch]);

  const handleSubmit = () => {
    if (!email && !password) {
      toast.error("Введите логин и пароль");
      return;
    }
    if (!email || !password) {
      toast.error("Заполните пропущенное поле");
      return;
    }
    try {
      dispatch(loginUser({ email, password }));
      setemail("");
      setPassword("");
      toast.success(status);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleInputType = () => {
    inputType === "password" ? setInputType("text") : setInputType("password");
  };

  const toggleRemember = () => {
    if (!remember) {
      window.localStorage.setItem("userEmail", email);
      window.localStorage.setItem("userPassword", password);
    } else {
      window.localStorage.removeItem("userEmail");
      window.localStorage.removeItem("userPassword");
    }
    setRemember(!remember);
  };
  return (
    <div className="loginWrapper">
      <div className="logo">
        <img src="img/logo-main.svg" alt="" />
      </div>
      <form onSubmit={(e) => e.preventDefault()} className={styles.formWraper}>
        <h2>Авторизация</h2>
        <div className={styles.inputWrapper}>
          <label htmlFor="" className="labelEl">
            Введите email
          </label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            className="inputCustom"
          />
        </div>

        <div className={styles.inputWrapper}>
          <label htmlFor="" className="labelEl">
            Пароль
          </label>
          <input
            type={inputType}
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="inputCustom"
          />
          <button className={styles.showPass} onClick={toggleInputType}>
            {inputType === "password" ? (
              <img src="img/show.svg" alt="" />
            ) : (
              <img src="img/hidden.svg" alt="" />
            )}
          </button>
        </div>

        <div className={styles.inputWrapper}>
          <div className={styles.rememberMe} onClick={toggleRemember}>
            <span>{remember && <img src="img/remember.svg" alt="green tour" />}</span> Запомнить
            меня
          </div>
        </div>

        <button type="submit" className={styles.formButs} onClick={handleSubmit}>
          Войти
        </button>
        <div className={styles.langs}>
          Сменить язык
          <button className={`${styles.langsButton} ${styles.activeLang}`}>ru</button>
          <button className={styles.langsButton}>en</button>
        </div>
      </form>
    </div>
  );
}
