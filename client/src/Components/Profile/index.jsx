import { useState, useEffect } from "react";
import styles from "./Profile.module.scss";
import ProfileData from "../ProfileData";
import ProfileContacts from "../ProfileContacts";
import ProfilePhoto from "../ProfilePhoto";
import ProfilePass from "../ProfilePass";
import ProfileSponsor from "../ProfileSponsor";
import Jackpot from "../Jackpot";
import Preloader from "../../Components/Preloader";

function Profile() {
  const [activeTab, setActiveTab] = useState("lk");
  const [preloader, setPreloader] = useState(true);

  useEffect(() => {
    if (preloader) {
      setTimeout(() => {
        setPreloader(false);
      }, 2000);
    }
  }, []);
  return (
    <div className={styles.cabinetWrapp}>
      {preloader ? <Preloader /> : ""}
      <Jackpot />
      <img src="img/cabinetTitle.svg" className={styles.cabinetTitle_Img} alt="" />
      <div className="borderRound">
        <div className={styles.cabinetWrapp_mnu}>
          <span
            className={activeTab === "lk" ? styles.activeTab : undefined}
            onClick={() => setActiveTab("lk")}>
            Личные данные
          </span>
          <span
            className={activeTab === "contacts" ? styles.activeTab : undefined}
            onClick={() => setActiveTab("contacts")}>
            Контакты
          </span>
          <span
            className={activeTab === "photo" ? styles.activeTab : undefined}
            onClick={() => setActiveTab("photo")}>
            Фотография
          </span>
          <span
            className={activeTab === "pass" ? styles.activeTab : undefined}
            onClick={() => setActiveTab("pass")}>
            Пароль
          </span>
          <span
            className={activeTab === "sponsor" ? styles.activeTab : undefined}
            onClick={() => setActiveTab("sponsor")}>
            Спонсор
          </span>
        </div>

        <div className={styles.cabinetWrap_area}>
          {activeTab === "lk" && <ProfileData />}
          {activeTab === "contacts" && <ProfileContacts />}
          {activeTab === "photo" && <ProfilePhoto />}
          {activeTab === "pass" && <ProfilePass />}
          {activeTab === "sponsor" && <ProfileSponsor />}
        </div>
      </div>
    </div>
  );
}

export default Profile;
