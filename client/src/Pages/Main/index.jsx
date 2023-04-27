/* eslint-disable array-callback-return */
import { useState, useEffect } from "react";
import styles from "./Main.module.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Accordion from "../../Components/Accordion";
import Footer from "../../Components/Footer";
import Preloader from "../../Components/Preloader";
import HeaderPage from "../../Components/HeaderPage";
import LastUser from "../../Components/LastUser";
import Slider from "react-slick";
import qs from "qs";
import { getAllUsers } from "../../redux/slices/authSlice";

function Main() {
  const dispatch = useDispatch();
  const [imageIndex, setImageIndex] = useState(0);
  const [preloader, setPreloader] = useState(true);
  const users = useSelector((state) => state.auth.allUsers);

  const images = ["img/s1.png", "img/s2.png", "img/s3.png", "img/s4.png", "img/s5.png"];

  const settings = {
    infinite: true,
    arrows: false,
    lazyLoad: true,
    speed: 900,
    slidesToShow: 3,
    centerMode: true,
    centerPadding: 0,
    autoplay: true,
    autoplaySpeed: 2000,

    // nextArrow: <NextArrow />,
    // prevArrow: <PrevArrow />,
    beforeChange: (current, next) => setImageIndex(next),
  };

  useEffect(() => {
    if (preloader) {
      setTimeout(() => {
        setPreloader(false);
      }, 3000);
    }
  }, []);

  useEffect(() => {
    dispatch(getAllUsers());
    const query = qs.parse(window.location.search.substring(1));

    if (query.upliner) {
      window.localStorage.setItem("upliner", query.upliner);
    } else {
      window.localStorage.setItem("upliner", "GreenEnergy");
    }
  }, []);

  return (
    <div className={styles.mainWraper}>
      {preloader ? <Preloader /> : ""}
      <HeaderPage />
      <div className={styles.topPart}>
        <div className="container_main center">
          <div>
            <img src="img/jackpot-main.svg" className={styles.banerJackpot} alt="" />
          </div>
          <div className={styles.centerBlock}>
            {" "}
            <img src="img/main-title.svg" alt="" />{" "}
          </div>
          <p className={styles.titleDesrc}>
            Инструмент <span>№1</span> <br /> для получения пожизненного дохода
          </p>
          <Link to="/register" className="btn-small">
            <span>Регистрация</span>
          </Link>
        </div>

        <div className="row globe-fon">
          <div className="col-6">
            <p className={styles.titleFirstDescr}>
              <span>GREEN ENERGY</span> - это международный проект, созданный для обеспечения
              каждого участника множеством финансовых потоков за выполненную работу. Данный проект
              предлагает вам возможность совместными усилиями получать ежемесячный доход в размере{" "}
              <span>$2000</span>, даже без приглашений, что в итоге приведет к получению пожизненной
              минимальной пенсии в размере <span>$700</span>.
            </p>
            <p className={styles.titleDesrBlock}>
              Для большей уверенности в проекте, на старте каждому участнику мы дарим подарок в
              накопительный пенсионный фонд в размере <span>$5</span> под <span>10%</span> в месяц
              за регистрацию в проекте, плюс бонус <span>$1</span> в токенах проекта!
            </p>
            <p className={styles.titleDesrBlock}>
              Не упустите возможность стать частью захватывающего проекта и позвольте себе
              заработать больше!
            </p>
          </div>
        </div>

        <div className={styles.bullets}>
          <div className={styles.bulletsItem}>
            <p>Токен ENERGY</p>
            <div>
              Постоянный рост цены токена позволит каждому пользователю получать большие доходы от
              покупки или продажи токена.
            </div>
            <a href="https://t.me/Greentur_club" target="blank">
              Получить ENERGY <img src="img/arr.svg" alt="" />
            </a>
          </div>

          <div className={styles.bulletsItem}>
            <p>Накопления</p>
            <div>
              Участвуя в проекте, вы создаете свое будущее и получаете возможность получать
              минимальный ежемесячный доход пожизненно.
            </div>
            <a href="google.com">
              Получить подарочные $5 <img src="img/arr.svg" alt="" />
            </a>
          </div>
          <div className={styles.bulletsItem}>
            <p>Живой чат</p>
            <div>
              Telegram чат, в котором можно поделиться своими успехами в проекте, и задать любой
              вопрос опытным участникам.
            </div>
            <a href="google.com">
              Стать частью сообщества <img src="img/arr.svg" alt="" />
            </a>
          </div>
        </div>
      </div>

      <div className={styles.bottomPart}>
        <div className={styles.lastRegister}>
          <div className="container_main">
            <h2>Последние регистрации</h2>
            <p>Последние присоединившиеся участники в режиме реального времени</p>
            <div className={styles.lastUsersTable}>
              <div className={styles.lastUsersTableTitles}>
                <div>Логин</div>
                <div>Спонсор</div>
                <div>Время</div>
                <div>Дата</div>
              </div>
              {console.log(users)}
              {users && users?.slice(-9).map((obj, i) => <LastUser data={obj} index={i} />)}
            </div>
            <h3>Результаты партнеров</h3>
            <p>
              Клуб, в котором находятся профессионалы и новички в инвестировании, объединенные
              желанием помочь друг другу преумножить свой капитал
            </p>
            <div className="row">
              <div className="col-6">
                <div className={styles.qtyAccounts}>50000</div>
                <span>Количество аккаунтов</span>
              </div>
              <div className="col-6">
                <div className={styles.qtyPool}>1 375 591 147</div>
                <span>Сумарный результат, USD</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.sliderWrapp}>
          <img src="img/present-title.png" alt="" />
          <Slider {...settings}>
            {images.map((img, idx) => (
              <div className={idx === imageIndex ? "slide activeSlide" : "slide"}>
                <img src={img} alt={img} />
              </div>
            ))}
          </Slider>
        </div>

        <div className={styles.mainCab}>
          <h2>Удобный кабинет</h2>
          <img src="img/main-cab.png" alt="" />
        </div>

        <div className={styles.faq}>
          <div className="container_main">
            <h2>Часто задаваемые вопросы</h2>
            <div>
              <Accordion
                title="Какие бонусы я получаю от участия в проекте?"
                content="<p>1. Бонус за регистрацию: на баланс Вашего счета в пенсионном фонде начисляются +$5 под 10% годовых, которые сразу же включаются в работу, бонус действителен в течении 3 – х месяцев, если партнер не начал работать в программе бонус переходит в счет клуба.        </p>
                <p>2. Вы получаете реферальную ссылку, которая дает Вам возможность заработать деньги на вход. Пригласив всего 2 человека – Вы получаете +$30 на свой счет. Этого достаточно для покупки Пакета.</p>
                <p>3.После покупки Пакета Вы получаете место в матрично-линейном маркетинге, где до 10 уровней, независимо от приглашений, каждая покупка пакета, или реинвеста пакетов, Вам начисляется по $1, что позволяет получать до бесконечности, за счет постоянных реинвестов пассивный доход, $2046 при заполнении 10 уровней матрично-линейного маркетинга плюс $15 за каждую регистрацию.</p>
                <p>4.За каждый активированный пакет Вы получаете токены ENERGY на сумму $1, которые дают Вам возможность участвовать в Суперивентах и получать дополнительный пассивный доход.</p>
                <p>5.Вы автоматически участвуете в ежемесячном розыгрыше «Джекпота» размером от $1000. Один активный пакет = 1 Билет в розыгрыше.</p>
                <p>6.Каждый пакет «PREMIUM», прибавляет к Вашему балансу в нашем частном пенсионном фонде от +$20 - $100, которые стабильно приносят вам прибыль до 300% годовых. Наша цель: чтобы каждый участник проекта получал пожизненно от $700 в месяц, и благодаря этому, жил беззаботной жизнью, не беспокоился о будущем.</p>"
              />
              <Accordion
                title="Как активировать позицию в матрице?"
                content="<p>Оплата за активацию Пакета производится в личном кабинете. В разделе «КАБИНЕТ» кликните на кнопку «Пополнить» в разделе «Балансы счетов».</p>
                <p>Выберите самый удобный для Вас способ пополнения баланса.</p>
                <p>После пополнения баланса на нужную сумму – нажмите кнопку «КУПИТЬ ПАКЕТ». Подтвердите операцию во всплывающем окне.</p>
                <p>Поздравляем! Теперь Вы успешно заняли место в матрице и Вам стали доступны все привилегии активного участника проекта.</p>"
              />
              <Accordion
                title="Как вывести свою прибыль?"
                content="<p>После активации места в матрице, Ваша прибыль начинает поступать на Ваш баланс в проекте. Первые заработанные $30 идут на Основной баланс, с которого Вы можете вывести свою прибыль удобным для Вас способом. <p/>
                <p>Следующие заработанные $50 идут на счёт «Реинвест баланс», который используется для покупки нового Стартового Пакета из которого часть средств возвращается на Ваш основной счет, а часть идет на накопительный пенсионный фонд. <p/>
                <p>Вся последующая прибыль начисляется на Основной баланс, который доступен для вывода. При покупке следующего Пакета данная система начислений запускается заново. (30$ / 50$ / ∞).<p/>
              "
              />
              <Accordion
                title="Кто такой спонсор / реферал / лично приглашенный? "
                content="<p>Спонсор - это человек, который приглашает других пользователей в проект. Когда новый пользователь регистрируется по ссылке спонсора, этот спонсор становится его наставником и информационным спонсором. Спонсор имеет заинтересованность в успехе своих рефералов, так как от их успеха зависит и его собственная прибыль в проекте.</p>
                <p>Реферал или лично приглашенный - это пользователь, который зарегистрировался в проекте по реферальной ссылке своего спонсора. Каждый реферал имеет своего спонсора, который получает вознаграждение за активность своих рефералов в проекте.</p>
                <p>Если речь идет о том, кому достается спонсор, то можно сказать, что новый пользователь, который регистрируется по реферальной ссылке, становится рефералом того спонсора, чья ссылка была использована при регистрации. Таким образом, спонсорство достается тому, чья ссылка была использована при регистрации нового пользователя.</p>"
              />
              <Accordion
                title="Если я активирую позицию раньше человека, который меня пригласил?"
                content="<p>В этом случае Вы автоматически займете позицию в структуре участника, который пригласил Вашего спонсора.</p>
                <p>Реферальный бонус в виде $15 не теряется, даже если у Вашего спонсора не активирован пакет, эти начисления можно направить на активацию своего пакета.</p>"
              />
              <Accordion
                title="Обязательно ли указывать Telegram, Twitter, Facebook?"
                content="<p>В нашем проекте нет никаких обязательств, но. </p>
                <p>Для Вашего же успеха, и для коммуникации между Вашими наставниками и Вашей командой, желательно указать Ваши данные. Ваши наставники смогут раньше оказать Вам необходимую поддержку, с Вами смогут связаться Ваши партнеры. </p>
                <p>Указание своих данный и фотографии в Вашем профиле, говорит о Вашем серьёзном отношении к бизнесу и к Вашим партнёрам. </p>
                <p>Фотография в виде животных или других персонажей, воспринимается как несерьезность человека и не располагает людей как к проекту, так и к наставнику.</p>
                <p>Поэтому рекомендация заполнить правильно свои данные и получить поддержку.</p>"
              />
            </div>
          </div>
        </div>

        <div className={styles.channels}>
          <div className="container_main">
            <h2>Официальные каналы</h2>
            <div className="row jc-center">
              <a href="https://t.me/GreenEnergy_channel" target="blank">
                <img src="img/ch-telegram.svg" alt="" /> <span>Telegram канал</span>
              </a>

              <a href="https://t.me/Greentur_club" target="blank">
                <img src="img/ch-telegram.svg" alt="" /> <span>Telegram чат</span>
              </a>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Main;
