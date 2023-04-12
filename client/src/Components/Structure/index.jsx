import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getStructure } from "../../redux/slices/authSlice";
import Popup from "../Popup";
import Jackpot from "../Jackpot";
import Lenear from "../Lenear";
import styles from "./Structure.module.scss";

function Structure() {
  const dispatch = useDispatch();
  const structure = useSelector((state) => state.auth.structure);
  const [butPopup, setButPopup] = useState(false);
  const [lenear, setLenear] = useState(false);

  const [telegram, setTelegram] = useState(null);
  const [whatsapp, setWhatsapp] = useState(null);
  const [facebook, setFacebook] = useState(null);
  const [instagram, setInstagram] = useState(null);
  const [twitter, setTwitter] = useState(null);

  useEffect(() => {
    dispatch(getStructure());
  }, [dispatch]);

  const passSocials = (telegram, whatsapp, facebook, instagram, twitter) => {
    setTelegram(telegram);
    setWhatsapp(whatsapp);
    setFacebook(facebook);
    setInstagram(instagram);
    setTwitter(twitter);
    setButPopup(true);
  };

  console.log(structure);
  return (
    <div className={styles.cabinetWrapp}>
      <Jackpot />
      <img src="img/structureTitle.svg" className={styles.cabinetTitle_Img} alt="" />
      <div className="borderRound">
        <div className={styles.switcher}>
          <p>Вид отображения:</p>
          <button
            className={!lenear ? " switcherBtn activeSwitcher" : "switcherBtn"}
            onClick={() => setLenear(false)}>
            Табличный
          </button>
          <button
            className={lenear ? " switcherBtn activeSwitcher" : "switcherBtn"}
            onClick={() => setLenear(true)}>
            Линейный
          </button>
        </div>
        <div className={styles.structure_area}>
          {!lenear ? (
            <table className={styles.tableTitile}>
              <thead>
                <th>Логин</th>

                <th>Email</th>
                <th>Телефон</th>
                <th>Статус партнера</th>
                <th>Депозит в стейкинге</th>
                <th>Команда</th>
                <th>Соцсети</th>
              </thead>
              {structure &&
                structure.map((obj, i) => (
                  <tr key={i}>
                    <td>{obj.login}</td>

                    <td>{obj.email}</td>
                    <td>{obj.phone}</td>
                    <td>{obj.is_active ? "Активный" : "Не активный"}</td>
                    <td>{obj.staking}</td>
                    <td>{obj.comand}</td>
                    <td>
                      <button
                        onClick={() =>
                          passSocials(
                            obj.telegram,
                            obj.whatsapp,
                            obj.facebook,
                            obj.instagram,
                            obj.twitter,
                          )
                        }
                        className={styles.socPopup}>
                        <span>Показать</span>
                      </button>
                    </td>
                  </tr>
                ))}
            </table>
          ) : (
            <Lenear />
          )}
        </div>
      </div>

      <Popup
        trigger={butPopup}
        telegram={telegram}
        whatsapp={whatsapp}
        facebook={facebook}
        instagram={instagram}
        twitter={twitter}
        setTriggerBut={setButPopup}>
        <h2>telegram</h2>
      </Popup>
    </div>
  );
}

export default Structure;
