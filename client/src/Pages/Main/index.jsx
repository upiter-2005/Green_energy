import { useState, useEffect } from "react";
import styles from "./Main.module.scss";
import { Link } from "react-router-dom";
import Accordion from "../../Components/Accordion";
import Footer from "../../Components/Footer";
import Preloader from "../../Components/Preloader";
import HeaderPage from "../../Components/HeaderPage";
import Slider from "react-slick";
function Main() {
  const [imageIndex, setImageIndex] = useState(0);
  const [preloader, setPreloader] = useState(true);

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
    setTimeout(() => {
      setPreloader(false);
    }, 3000);
  }, []);
  return !preloader ? (
    <div className={styles.mainWraper}>
      <HeaderPage />
      <div className={styles.topPart}>
        <div className="container_main center">
          <div>
            <img src="img/jackpot-main.svg" alt="" />
          </div>
          <div className={styles.centerBlock}>
            {" "}
            <img src="img/main-title.svg" alt="" />{" "}
          </div>
          <p className={styles.titleDesrc}>
            Инструмент <span>№1</span> <br /> по заработку денег
          </p>
          <Link to="/register" className="btn-small">
            <span>Регистрация</span>
          </Link>
        </div>

        <div className="row globe-fon">
          <div className="col-6">
            <p className={styles.titleFirstDescr}>
              <span>GREEN ENERGY</span> - это крупномасштабный международный проект, который был
              создан для обеспечения бесконечного финансового потока его участникам.
            </p>
            <p className={styles.titleDesrBlock}>
              Вы можете зарабатывать более <span>$2046</span> , даже без необходимости приглашать
              других участников!
            </p>
            <p className={styles.titleDesrBlock}>
              А чтобы убедиться, что вы получите наилучший старт, мы дарим вам подарок{" "}
              <span>$5</span> за регистрацию, а также бонус в <span>$1</span> в токенах проекта!
            </p>
            <p className={styles.titleDesrBlock}>
              Не упустите возможность стать частью этого захватывающего проекта и позвольте себе
              больше!
            </p>
          </div>
        </div>

        <div className={styles.bullets}>
          <div className={styles.bulletsItem}>
            <p>Токен ENERGY</p>
            <div>
              Тщательно разработанная механика роста цены токена, которая позволяет пользователям
              получать большие дополнительные доходы в проекте
            </div>
            <a href="google.com">
              Получить ENERGY <img src="img/arr.svg" alt="" />
            </a>
          </div>

          <div className={styles.bulletsItem}>
            <p>Накопления</p>
            <div>
              Создание постоянного ежемесячного дохода в размере не менее $700, чтобы вы могли
              чувствовать уверенность в своем будущем
            </div>
            <a href="google.com">
              Получить подарочные $5 <img src="img/arr.svg" alt="" />
            </a>
          </div>
          <div className={styles.bulletsItem}>
            <p>Живой чат</p>
            <div>
              Telegram чат, в котором можно поделиться своими успехами в проекте, и задать любой
              вопрос опытным участникам
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
              <div className={styles.lastUsersTable_item}>
                <div>User001</div>
                <div>Upliner</div>
                <div>14:37:09</div>
                <div>22.03.2023</div>
              </div>
              <div className={styles.lastUsersTable_item}>
                <div>User001</div>
                <div>Upliner</div>
                <div>14:37:09</div>
                <div>22.03.2023</div>
              </div>
              <div className={styles.lastUsersTable_item}>
                <div>User001</div>
                <div>Upliner</div>
                <div>14:37:09</div>
                <div>22.03.2023</div>
              </div>
              <div className={styles.lastUsersTable_item}>
                <div>User001</div>
                <div>Upliner</div>
                <div>14:37:09</div>
                <div>22.03.2023</div>
              </div>
              <div className={styles.lastUsersTable_item}>
                <div>User001</div>
                <div>Upliner</div>
                <div>14:37:09</div>
                <div>22.03.2023</div>
              </div>
              <div className={styles.lastUsersTable_item}>
                <div>User001</div>
                <div>Upliner</div>
                <div>14:37:09</div>
                <div>22.03.2023</div>
              </div>
              <div className={styles.lastUsersTable_item}>
                <div>User001</div>
                <div>Upliner</div>
                <div>14:37:09</div>
                <div>22.03.2023</div>
              </div>
              <div className={styles.lastUsersTable_item}>
                <div>User001</div>
                <div>Upliner</div>
                <div>14:37:09</div>
                <div>22.03.2023</div>
              </div>
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
                content="<p>1.Бонус за регистрацию: на баланс Вашего счета в пенсионном фонде начисляются +5$, которые сразу же включаются в работу, и приносят вам прибыль до 300% годовых.</p>
                <p>2.Вы получаете реферальную ссылку, которая дает Вам возможность заработать деньги на вход.
                Пригласив всего 2 человека – Вы получаете +30$ на свой счет. Этого достаточно для покупки Пакета.</p>
                <p>3.После покупки Пакета Вы получаете место в матрице, и пассивно зарабатываете от 2046$ при заполнении 10 уровней матрицы.</p>
                <p>4.За каждый активированный пакет Вы получаете токены ENERGY на сумму 1$, которые дают Вам возможность участвовать в Суперивентах и получать дополнительный пассивный доход.</p>
                <p>5.Вы автоматически участвуете в ежемесячном розыгрыше Джекпота размером от 1000$. Один активный пакет = 1 Билет в розыгрыше.</p>
                <p>6.Каждый пакет PREMIUM прибавляет к Вашему балансу в нашем частном пенсионном фонде по +20$, которые стабильно приносят вам прибыль до 300% годовых. 
                Наша цель: чтобы каждый участник проекта получал пожизненно 700$ в месяц, и благодаря этому жил беззаботной жизнью, и не беспокоился о будущем.</p>"
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
                content="<p>С момента активации места в матрице, вся Ваша прибыль автоматически и мгновенно поступает на Ваш баланс в проекте. <p/>
                <p>Первые заработанные 30$ поступают на Основной баланс, с которого Вы можете вывести свою прибыль удобным для Вас способом.<p/>
                <p>Следующие заработанные 50$ поступают на Реинвест баланс, который используется для покупки Стартового Пакета, а также Пакетов PREMIUM.<p/>
                <p>Вся остальная прибыль начисляется на Основной баланс.<p/>
                <p>При покупке следующего Пакета – данная система начислений запускается заново (30$ / 50$ / ∞).<p/>"
              />
              <Accordion
                title="Кто такой спонсор / реферал / лично приглашенный? "
                content="<p>Реферал / лично приглашенный - это пользователь, который зарегистрировался по Вашей партнерской ссылке.</p>
                <p>Спонсор - это участник, по ссылке которого Вы зарегистрировались. Он заинтересован в том, чтобы помочь Вам преуспеть в данном проекте.</p>"
              />
              <Accordion
                title="Если я активирую позицию раньше человека, который меня пригласил?"
                content="<p>В этом случае Вы автоматически займете позицию в структуре участника, который пригласил Вашего спонсора. </p>
                <p>Ваш спонсор получит реферальный бонус в виде 15$, которые ему необходимы для покупки пакета.</p>"
              />
              <Accordion
                title="Обязательно ли указывать Telegram, Twitter, Facebook?"
                content="<p>Не обязательно. Но рекомендуется указывать о себе как можно больше информации, чтобы Вашим партнерам было легче связаться с Вами в случае необходимости.</p>"
              />
            </div>
          </div>
        </div>

        <div className={styles.channels}>
          <div className="container_main">
            <h2>Официальные каналы</h2>
            <div className="row jc-center">
              <a href="#">
                <img src="img/ch-telegram.svg" alt="" /> <span>Telegram канал</span>
              </a>
              <a href="#">
                <img src="img/ch-telegram.svg" alt="" /> <span>Telegram чат</span>
              </a>
            </div>
          </div>
        </div>
        <Footer />
      </div>

      {/* <div className={styles.mainTop}>
        <img src="img/logo-main.svg" alt="" />
      </div>
      <div className={styles.mainCenter}>
        <p className={styles.mainCenter_gradient}>Добро пожаловать в Бизнес Интернет Сообщество!</p>
        <p className={styles.mainCenter_white}>
          Green Energy - первая ступень к свободной и перспективной жизни. <br /> Миссия площадки:
          Зарабатывая сохраняешь, Сохраняя приумножаешь.
        </p>
        <Link to="/login" className={styles.mainLinks}>
          ВХОД
        </Link>
        <Link to="/register?upliner=GreenEnergy" className={styles.mainLinks}>
          РЕГИСТРАЦИЯ
        </Link>
      </div> */}
    </div>
  ) : (
    <Preloader />
  );
}

export default Main;
