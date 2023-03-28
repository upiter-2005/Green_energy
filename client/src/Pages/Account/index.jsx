import React from "react";
import styles from "./Account.module.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { checkIsAuth } from "../../redux/slices/authSlice";
import Header from "../../Components/Header";
import Profile from "../../Components/Profile";
import Staking from "../../Components/Staking";
import News from "../../Components/News";
import Cabinet from "../../Components/Cabinet";
import Structure from "../../Components/Structure";
import Education from "../../Components/Education";
import { toast } from "react-toastify";

function Account() {
  const [section, setSection] = useState("profile");

  const navigate = useNavigate();
  const isAuth = useSelector(checkIsAuth);
  useEffect(() => {
    if (!window.localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [isAuth]);

  return (
    <div className={styles.pageWrapper}>
      <Header />
      <div className={styles.accountWrapper}>
        <div className={styles.account_box}>
          <div className={styles.navigation}>
            <ul className={styles.navigation_link}>
              <li onClick={() => setSection("cabinet")}>
                <img src="img/cabinet.svg" alt="" />
              </li>

              <li onClick={() => setSection("profile")}>
                <img src="img/profile.svg" alt="" />
              </li>
              <li onClick={() => setSection("structure")}>
                <img src="img/structure.svg" alt="" />
              </li>
              {/* <li onClick={() => setSection("staking")}>
                <img src="img/staking.svg" alt="" />
              </li> */}
              <li onClick={() => toast.success("В разработке")}>
                <img src="img/staking.svg" alt="" />
              </li>
              <li onClick={() => setSection("news")}>
                <img src="img/news.svg" alt="" />
              </li>
              <li onClick={() => setSection("study")}>
                <img src="img/Education.svg" alt="" />
              </li>
            </ul>
          </div>

          {section === "cabinet" && <Cabinet />}
          {section === "profile" && <Profile />}
          {section === "structure" && <Structure />}
          {section === "staking" && <Staking />}
          {section === "news" && <News />}
          {section === "study" && <Education />}
        </div>
      </div>
    </div>
  );
}

export default Account;
