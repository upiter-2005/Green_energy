import React from "react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  registerUser,
  checkIsAuth,
  changeFormState,
  cleanStatus,
} from "../../redux/slices/authSlice";
import { toast } from "react-toastify";
import axios from "../../utils/axios";
import qs from "qs";
import styles from "./Register.module.scss";
import ReactFlagsSelect from "react-flags-select";
import phoneCodes from "../../local_db/phoneCodes.json";
import Error from "../../Components/Error";
import Preloader from "../../Components/Preloader";

function Register() {
  const phoneRef = useRef();
  const [preloader, setPreloader] = useState(true);
  const [uplinerValid, setUplinerValid] = useState(null);
  const [uplinerDouble, setUplinerDouble] = useState(null);
  const [loginValid, setLoginValid] = useState(null);
  const [emailValid, setEmailValid] = useState(null);
  const [phoneValid, setPhoneValid] = useState(null);
  const [passwordValid, setPasswordValid] = useState(null);
  const [doublePassword, setDoublePassword] = useState(null);

  const [inputType, setInputType] = useState("password");
  const [upliner, setUpliner] = useState("");
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [selected, setSelected] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const status = useSelector((state) => state.auth.status);
  const registerEvent = useSelector((state) => state.auth.registerEvent);
  const isAuth = useSelector(checkIsAuth);

  useEffect(() => {
    if (status) {
      toast.success(status);
    }
    dispatch(cleanStatus());
    // if (isAuth) {
    //   navigate("/");
    // }
    const query = qs.parse(window.location.search.substring(1));
    if (window.localStorage.getItem("upliner")) {
      setUpliner(window.localStorage.getItem("upliner"));
    } else {
      window.localStorage.setItem("upliner", "GreenEnergy");
      setUpliner("GreenEnergy");
    }

    // if (query.upliner) {
    //   console.log(query.upliner);
    //   setUpliner(query.upliner);
    // }
  }, [status, isAuth]);

  const findCodeByFlag = (flag) => {
    console.log(flag);
    const code = phoneCodes.countries.find((obj) => obj.name === flag);
    setPhone(code.code);
    setSelected(flag);
  };

  const handleSubmit = () => {
    if (loginValid || emailValid || phoneValid || passwordValid || doublePassword || uplinerValid) {
      console.log("register error");
      return true;
    }
    try {
      console.log(upliner, login, email, phone, password);
      dispatch(registerUser({ upliner, login, email, phone, password }));
      setEmail("");
      setPassword("");
      setLogin("");
      setPasswordCheck("");
      setPhone("");
    } catch (error) {
      console.log(error);
    }
  };

  const validateLogin = (e) => {
    setLogin(e.target.value.toLowerCase());
    console.log("validate");
    console.log(login);
    if (e.target.value.length < 4) {
      setLoginValid("Insert your login! Minimum 4 symbols!");
    }
    // /\S+@\S+\.\S+/.test(email);
    else if (!/^[a-zA-Z](.[a-zA-Z0-9_-]*)$/.test(e.target.value)) {
      setLoginValid("The Login field can contain numbers,latin letters and symbols `-`, `_`.");
    } else {
      setLoginValid(null);
    }
  };

  const validateEmail = (e) => {
    setEmail(e.target.value.toLowerCase());
    console.log(email);
    if (e.target.value.length === 0) {
      setEmailValid("Insert your email!");
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e.target.value)) {
      setEmailValid("Email is not correct");
    } else {
      setEmailValid(null);
    }
  };

  const validatePhone = (e) => {
    setPhone(e.target.value);
    console.log("validate");
    console.log(e.target.value);
    if (e.target.value.length < 7) {
      setPhoneValid("Insert your login! Minimum 7 symbols!");
    } else if (!/^[+](\d){1,17}$/.test(e.target.value)) {
      setPhoneValid("The Phone field can contain only numbers ");
    } else {
      setPhoneValid(null);
    }
  };

  const validatePassword = (e) => {
    setPassword(e.target.value);
    console.log("validate");
    console.log(e.target.value.length);
    if (e.target.value.length < 8) {
      setPasswordValid(
        "The Password field must contain at least 8 characters, numbers, letters of the Latin alphabet and a capital letter.",
      );
    } else if (e.target.value.length >= 8) {
      setPasswordValid(null);
    }
    if (e.target.value !== passwordCheck) {
      setDoublePassword("Re-enter the password. There are not equal");
    }
    if (e.target.value === passwordCheck) {
      setDoublePassword(null);
    }
  };

  const validateDoublePassword = (e) => {
    setPasswordCheck(e.target.value);
    console.log("validate");
    console.log(e.target.value);
    if (e.target.value === password) {
      setDoublePassword(null);
      console.log("=========");
    } else {
      setDoublePassword("Re-enter the password.");
    }
  };

  const toggleInputType = () => {
    inputType === "password" ? setInputType("text") : setInputType("password");
  };

  const checkUpliner = async (e) => {
    if (e.target.value.length > 3) {
      setUplinerValid(null);
      setUpliner(e.target.value);
      const { data } = await axios.post("auth/checkUpliner", {
        login: e.target.value,
      });
      if (data.message) {
        setUplinerValid("Такого спонсора не существует");
      } else {
        setUplinerValid(null);
      }
    } else {
      setUplinerValid("Слишком короткий логин");
    }
    setUpliner(e.target.value);
  };

  useEffect(() => {
    if (registerEvent) {
      navigate("/login");
    }
  }, [registerEvent, navigate]);

  useEffect(() => {
    const query = qs.parse(window.location.search.substring(1));

    if (query.upliner !== window.localStorage.getItem("upliner")) {
      console.log(query.upliner);
      console.log(window.localStorage.getItem("upliner"));
      setUplinerDouble("Проверте правильность логина наставника");
    }
    setTimeout(() => {
      setPreloader(false);
    }, 3000);
  }, []);

  return preloader ? (
    <Preloader />
  ) : (
    <div className="registerWrapper">
      <div className="logo">
        <Link to="/">
          <img src="img/logo-main.svg" alt="" />
        </Link>
      </div>
      <form onSubmit={(e) => e.preventDefault()} className={styles.formWraper}>
        <h2>Регистрация</h2>
        <div style={{ position: "relative" }}>
          {uplinerDouble && <Error content={uplinerDouble} />}
        </div>
        <div className={styles.inputWrapper}>
          <label className="labelEl">Логин наставника</label>
          <input
            type="text"
            name="upliner"
            value={upliner}
            placeholder={upliner}
            className="inputCustom"
            onChange={checkUpliner}
          />
          {uplinerValid && <Error content={uplinerValid} />}
        </div>

        <div className={styles.inputWrapper}>
          <label className="labelEl">Логин </label>
          <input
            type="text"
            name="login"
            value={login}
            onChange={validateLogin}
            placeholder=""
            className="inputCustom"
          />
          {loginValid && <Error content={loginValid} />}
        </div>

        <div className={styles.inputWrapper}>
          <label className="labelEl">Email </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={validateEmail}
            placeholder=""
            className="inputCustom"
          />
          {emailValid && <Error content={emailValid} />}
        </div>

        <div className={`${styles.flagWrapper} ${styles.inputWrapper}`}>
          <label className="labelEl">Телефон </label>
          <div className={styles.combineInput}>
            <input className={styles.leftInput} />
            <input
              type="tel"
              name="phone"
              value={phone}
              //ref={phoneRef}
              onChange={validatePhone}
              placeholder=""
              className={`inputCustom ${styles.rightInput}`}
            />
          </div>

          <div className={styles.flagWrapperInner}>
            <ReactFlagsSelect
              selected={selected}
              selectedSize={14}
              optionsSize={14}
              placeholder="Страна"
              className="menu-flagsCustom"
              selectButtonClassName="menu-flagsMy-butMy"
              onSelect={(code) => findCodeByFlag(code)}
            />
          </div>
          {phoneValid && <Error content={phoneValid} />}
        </div>

        <div className={styles.inputWrapper}>
          <label htmlFor="" className="labelEl">
            Пароль
          </label>
          <input
            type={inputType}
            name="password"
            value={password}
            onChange={validatePassword}
            className="inputCustom"
          />
          <button className={styles.showPass} onClick={toggleInputType}>
            {inputType === "password" ? (
              <img src="img/show.svg" alt="" />
            ) : (
              <img src="img/hidden.svg" alt="" />
            )}
          </button>
          {passwordValid && <Error content={passwordValid} />}
        </div>

        <div className={styles.inputWrapper}>
          <label htmlFor="" className="labelEl">
            Повторите пароль
          </label>
          <input
            type={inputType}
            value={passwordCheck}
            name="repeatpassword"
            onChange={validateDoublePassword}
            className="inputCustom"
          />
          <button className={styles.showPass} onClick={toggleInputType}>
            {inputType === "password" ? (
              <img src="img/show.svg" alt="" />
            ) : (
              <img src="img/hidden.svg" alt="" />
            )}
          </button>
          {doublePassword && <Error content={doublePassword} />}
        </div>

        <button type="submit" className={styles.formButs} onClick={handleSubmit}>
          Регистрация
        </button>
        <div className={styles.langs}>
          <Link to="/login" className={styles.registerString}>
            Войти в систему
          </Link>
          {/* Сменить язык
          <button className={`${styles.langsButton} ${styles.activeLang}`}>ru</button>
          <button className={styles.langsButton}>en</button> */}
        </div>
      </form>
    </div>
  );
}

export default Register;
