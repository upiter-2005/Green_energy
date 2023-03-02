import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateData } from "../../redux/slices/authSlice";
import { toast } from "react-toastify";

function ProfileData() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const user = useSelector((state) => state.auth.user);

  console.log(user);

  const handleUpdate = () => {
    try {
      const data = {
        name,
        surname,
      };

      console.log(data);
      dispatch(updateData(data));
      toast("Данные обновлены!");
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
  }, [user]);

  return (
    <div className="accountDataBlock">
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
          <input type="text" value={user?.login} disabled />
          <img src="img/lock.svg" alt="" />
        </div>
        <div className="genderBlock">
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

export default ProfileData;
