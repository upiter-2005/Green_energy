import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateContacts } from "../../redux/slices/authSlice";
import { toast } from "react-toastify";

function ProfileContacts() {
  const dispatch = useDispatch();
  const [phone, setPhone] = useState("");
  const [telegram, setTelegram] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [twitter, setTwitter] = useState("");

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    setPhone(user.phone);
    setTelegram(user.telegram);
    setWhatsapp(user.whatsapp);
    setFacebook(user.facebook);
    setInstagram(user.instagram);
    setTwitter(user.twitter);
  }, [user]);

  const handleUpdate = () => {
    console.log("Update func");
    const data = {
      phone,
      telegram,
      whatsapp,
      facebook,
      instagram,
      twitter,
    };
    dispatch(updateContacts(data));
    toast("Данные сохранены успешно!");
  };

  return (
    <div className="accountDataBlock">
      <h3 className="accTitle">Контакты</h3>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="accountInput lockInput">
          <span>Логин</span>
          <input type="text" value={user.login} disabled />
          <img src="img/lock.svg" alt="" />
        </div>
        <div className="accountInput">
          <span>Телефон</span>
          <input
            type="text"
            value={phone}
            placeholder={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="accountInput">
          <span>Telegram</span>
          <input type="text" value={telegram} onChange={(e) => setTelegram(e.target.value)} />
        </div>
        <div className="accountInput">
          <span>Whatsapp</span>
          <input type="text" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} />
        </div>
        <div className="accountInput">
          <span>Facebook</span>
          <input type="text" value={facebook} onChange={(e) => setFacebook(e.target.value)} />
        </div>
        <div className="accountInput">
          <span>Instagram</span>
          <input type="text" value={instagram} onChange={(e) => setInstagram(e.target.value)} />
        </div>
        <div className="accountInput">
          <span>Twitter</span>
          <input type="text" value={twitter} onChange={(e) => setTwitter(e.target.value)} />
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

export default ProfileContacts;
