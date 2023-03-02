import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import axios from "../../utils/axios";
import styles from "./ProfileSponsor.module.scss";

function ProfileSponsor() {
  const [upliner, setUpliner] = useState();
  const user = useSelector((state) => state.auth.user);
  console.log(user);

  const getSponsor = useCallback(async () => {
    const { data } = await axios.get("/user/getUplinerInfo");
    console.log(data);
    setUpliner(data.upliner);
  }, []);

  useEffect(() => {
    setUpliner(user?.upliner);
    getSponsor();
  }, [user, getSponsor]);

  return (
    <div className="accountDataBlock">
      <h3 className="accTitle">Спонсор</h3>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="accountInput sponsorInput">
          <span>Имя</span>
          <input type="text" value={upliner?.name} disabled />
          <button className="copyBtn">
            <img src="img/copy.svg" alt="" />
          </button>
        </div>
        <div className="accountInput sponsorInput">
          <span>Фамилия</span>
          <input type="text" value={upliner?.surname} disabled />
          <button className="copyBtn">
            <img src="img/copy.svg" alt="" />
          </button>
        </div>
        <div className="accountInput sponsorInput">
          <span>Логин</span>
          <input type="text" value={upliner?.login} disabled />
          <button className="copyBtn">
            <img src="img/copy.svg" alt="" />
          </button>
        </div>
        <div className="accountInput sponsorInput">
          <span>Email</span>
          <input type="text" value={upliner?.email} disabled />
          <button className="copyBtn">
            <img src="img/copy.svg" alt="" />
          </button>
        </div>
        <div className="accountInput sponsorInput">
          <span>Telegram</span>
          <input type="text" value={upliner?.telegram} disabled />
          <button className="copyBtn">
            <img src="img/copy.svg" alt="" />
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProfileSponsor;
