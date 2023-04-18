import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateData } from "../../redux/slices/authSlice";
import { getTree } from "../../redux/slices/optionsSlice";
import { toast } from "react-toastify";
import Preloader from "../../Components/Preloader";

function ProfileData() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [preloader, setPreloader] = useState(true);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [metamask, setMetamask] = useState("");
  const [payeer, setPayeer] = useState("");
  const [advcash, setAdvcash] = useState("");
  const user = useSelector((state) => state.auth.user);
  const tree = useSelector((state) => state.options.tree);

  const handleUpdate = () => {
    try {
      const data = {
        name,
        surname,
        payeer,
        advcash,
        wallet: metamask,
      };

      console.log(data);
      dispatch(updateData(data));
      toast.success("Данные обновлены!");
    } catch (e) {
      console.log(e);
    }

    console.log("Update func");
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    setName(user?.name);
    setSurname(user?.surname);
    setMetamask(user?.wallet);
    setPayeer(user?.payeer);
    setAdvcash(user?.advcash);
    dispatch(getTree());
  }, [user, navigate]);

  useEffect(() => {
    if (preloader) {
      setTimeout(() => {
        setPreloader(false);
      }, 3000);
    }
  }, []);

  console.log(tree);
  return (
    <div className="accountDataBlock">
      {preloader ? <Preloader /> : ""}
      <h3 className="accTitle">Основная информация</h3>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="accountInput">
          <span>Имя</span>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="accountInput">
          <span>Фамилия</span>
          <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} />
        </div>
        <div className="accountInput lockInput">
          <span>Логин</span>
          <input type="text" value={user?.email} disabled />
          <img src="img/lock.svg" alt="" />
        </div>
        <div className="accountInput lockInput">
          <span>Логин</span>
          <input type="text" value={user?.login} disabled />
          <img src="img/lock.svg" alt="" />
        </div>
        <div className="accountInput">
          <span>MetaMask</span>
          <input type="text" value={metamask} onChange={(e) => setMetamask(e.target.value)} />
        </div>
        <div className="accountInput">
          <span>Payeer</span>
          <input type="text" value={payeer} onChange={(e) => setPayeer(e.target.value)} />
        </div>
        <div className="accountInput">
          <span>AdvCash</span>
          <input type="text" value={advcash} onChange={(e) => setAdvcash(e.target.value)} />
        </div>
        {/* <div className="genderBlock">
          <div className="genderBlockTitle">Пол</div>
          <div className="genderBlock_val">
            <span>
              <img src="img/check.svg" width="27px" alt="" /> Мужской
            </span>
            <span>
              <img src="img/no_check.svg" width="23px" alt="" />
              Женский
            </span>
          </div>
        </div> */}
        <div>
          <button type="submit" className="saveBtn" onClick={handleUpdate}>
            Сохранить
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProfileData;
