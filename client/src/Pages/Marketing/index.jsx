import { useState, useEffect } from "react";
import styles from "./Marketing.module.scss";
import { Link } from "react-router-dom";
import Accordion from "../../Components/Accordion";
import Preloader from "../../Components/Preloader";
import Footer from "../../Components/Footer";
import HeaderPage from "../../Components/HeaderPage";

function Marketing() {
  const [preloader, setPreloader] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setPreloader(false);
    }, 3000);
  }, []);
  return (
    <div className={styles.mainWraper}>
      {preloader ? <Preloader /> : ""}
      <HeaderPage />
      <div className={styles.topPart}>
        <img src="img/marketing.png" alt="" className="img-responsve" />
        <img src="img/marketing-title.svg" alt="" className={styles.market_title} />
        <div className="container_main">
          <h3 className={styles.boldy}>
            Приобретая пакет за <span>$30</span>, Вы автоматически занимаете место в матрице, что
            позволяет Вам создать долгосрочный пассивный доход.
          </h3>
        </div>

        <div className="row ">
          <div className="col-12">
            <p className={styles.titleFirstDescr}>
              Проект предусматривает <span>10 уровней</span>, и каждый новый участник,
              присоединившийся позже, который находится в Вашей структуре, приносит Вам доход в
              размере <span>$1</span> на каждом из <span>10 уровней</span>. Неважно, кто привел
              нового участника - Вы получаете прибыль от него.
            </p>
            <p className={styles.titleFirstDescr}>
              Ваша структура в матрице <span>2 х 10</span> увеличивается в геометрической прогрессии{" "}
              <span>2,4,8,16,32,64,128 и т.д. до 10 уровня. </span>
              Места распределяются сверху вниз, слева направо.
            </p>
            <p className={styles.titleFirstDescr}>
              Вы можете получать доход не дожидаясь заполнения всей структуры, так как за каждую
              позицию, которую приобретают другие участники, Вам начисляется прибыль на Ваш баланс.
              Приобретая несколько позиций, Вы можете значительно увеличить свой доход в несколько
              раз.
            </p>
          </div>
        </div>
        <div className="container_main">
          <img src="img/video.png" alt="" className="img-responsve mt50 " />
        </div>
      </div>

      <div className={styles.bottomPart}>
        <div className="container_main pb100">
          <div className={styles.compensation}>
            <p className={styles.compensation_label}>
              <span>+ 15$</span> за каждого нового участника, который зарегестрировался по вашей
              реферальной ссылке и активировал позицию в матрице.
            </p>
            <h2>Компенсационный план</h2>
            <p className="center">*без учета реферальных вознаграждений</p>
            <img src="img/grafik.svg" alt="" className="img-responsve mg100" />
            <p>
              Изображение наглядно демонстрирует, что заполнение всего 10 уровней матрицы приводит к
              доходу более $2046. А если вы приобретете несколько пакетов, ваш доход увеличится
              многократно!
            </p>

            <div className="row mg100 ">
              <div className="col-6 pr40  ">
                <h3>Партнерская программа:</h3>
                <p className={styles.marketingDescr}>
                  Наша партнерская программа предлагает реферальное вознаграждение в размере
                  <span> $15</span> за каждого приглашенного участника, который активирует свой
                  пакет.
                </p>
                <p className={styles.marketingDescr}>
                  Это стимулирует вас привлекать новых партнеров и обеспечивает долговременную
                  стабильность проекта.
                </p>
                <p className={styles.marketingDescr}>
                  Эти доходы могут быть использованы для реинвестирования в новые пакеты и
                  увеличения вашей прибыли в будущем.
                </p>
                <p className={styles.marketingDescr}>
                  Независимо от того, приобрели ли вы пакет за <span>$30</span> , вы можете получать
                  реферальные вознаграждения за каждого активированного участника,
                  зарегистрировавшегося по вашей ссылке.
                </p>
              </div>
              <div className="col-6 pl40">
                <h3>
                  Как распределяются <span> $30:</span>
                </h3>
                <p className={styles.marketingDescrFlex}>
                  <span>$10</span>
                  <div>
                    мгновенно начисляются на <span>10 уровней</span> вверх, по <span>$1</span>{" "}
                    каждому участнику.
                  </div>
                </p>
                <p className={styles.marketingDescrFlex}>
                  <span>$15</span>
                  <div>
                    предоставляются в виде реферального вознаграждения за лично приглашенного
                  </div>
                </p>
                <p className={styles.marketingDescrFlex}>
                  <span>$3</span>
                  <div>направляются на развитие проекта, рекламу и бонусы.</div>
                </p>
                <p className={styles.marketingDescrFlex}>
                  <span>$1</span>
                  <div>
                    отводятся на обеспечение ликвидности токена <span>ENERGY</span> .
                  </div>
                </p>
                <p className={styles.marketingDescrFlex}>
                  <span>$1</span>
                  <div>
                    помещаются в пулл <span>Джекпота</span>. Розыгрыш <span>Джекпота</span> проходит
                    в прямом эфире при помощи рандомайзера, где каждый купленный пакет дает{" "}
                    <span>1 тикет</span> в розыгрыше. <span>50%</span> пулла <span>Джекпота</span>{" "}
                    получает победитель, а оставшиеся <span>50%</span> переносятся в пулл розыгрыша
                    на следующий месяц.
                  </div>
                </p>
              </div>
            </div>
          </div>

          <div className={styles.example}>
            <h3 className="center">
              Пример получения прибыли с каждого человека в Вашей структуре:
            </h3>
            <img src="img/tree-ex.png" alt="" className="img-responsve mg100" />
            <p>
              Так как в проекте предусмотрены мощные переливы за счет выделяемых средств на рекламу
              и вышестоящих лидеров, то эта система хороша как для активных участников, так и для
              тех, кто не умеет или не хочет заниматься приглашениями.
            </p>
            <p>
              Матрица огромная, многоуровневая. Это дает возможность получать прибыль очень и очень
              долго!
            </p>
            <p>Побеждайте в различных конкурсах, получайте призы и поощрения! И ЭТО ЕЩЕ НЕ ВСЕ!</p>

            <img src="img/fond.png" alt="" className="img-responsve" />
            <h3 className={styles.fondTitle}>Наш частный пенсионный фонд</h3>
            <p>
              В проект <span>GREEN ENERGY</span> входит наш частный пенсионный фонд, который поможет
              Вам обеспечить финансовую стабильность на всю жизнь. Наша накопительная программа
              позволит Вам выйти на пенсию через пару лет, не тратя 30-40 лет своей жизни на работу
              для получения минимальной пенсии.
            </p>
            <p>
              Наш девиз: "Пенсии все возрасты покорны". Мы предлагаем Вам открыть свой счет всего за
              30 долларов и немного потрудиться, чтобы через пару лет начать получать минимальную
              пенсию в размере 650 долларов.
            </p>
            <p>
              Регистрируйтесь прямо сейчас и получите первый взнос в размере 5 долларов на свой счет
              под <span>120% годовых</span> . Мы предлагаем командную работу, которая может принести
              Вам доход в районе <span>2000 долларов</span> и выше ежемесячно.
            </p>
            <p>
              Не ждите, пока время пройдет мимо Вас. Обеспечьте себе финансовую стабильность на всю
              жизнь вместе с нашим пенсионным фондом!
            </p>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default Marketing;
