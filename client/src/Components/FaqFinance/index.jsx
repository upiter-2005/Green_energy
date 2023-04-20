import { useState, useEffect } from "react";
import styles from "./FaqFinance.module.scss";
function FaqFinance() {
  return (
    <div className={styles.accountDataBlock}>
      <h3 className="accTitle">Финансы</h3>
      <h4>ВНИМАНИЕ!!!</h4>
      <p>Прежде чем делать перевод, согласуйте с службой поддержки!</p>
      <p>Телеграмм канал @domblaga </p>
      <p>E-mail: itgrenclub@gmail.com</p>
      <h4>Инструкция по вводу денег на интернет площадку Green Energy</h4>
      <p>
        Интернет площадка имеет свою внутреннюю систему оплат товаров и услуг, не зависит ни от
        какой платежной системы. Ввод денег на внутренний счет, производится через самые
        распространенные платежные системы, такими как Meta Mask, Advcash, Payeer.{" "}
      </p>
      <p>
        Вывод с платежной системы клуба, осуществляется на указанный Вами счет, которым Вы
        пользуетесь.
      </p>
      <p>
        Для всех кто не имеет своего кошелька на Meta Mask, рекомендуем пройти регистрацию посмотрев
        двухминутный ролик.
      </p>
      <h4>1️. Установка Metamask в Google Chrome: </h4>
      <div className="video">
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/d52DHtEpwvI"
          title="METAMASK КОШЕЛЕК НАСТРОЙКА | КАК УСТАНОВИТЬ METSMASK  ДЛЯ БРАУЗЕРА | КАК НАСТРОИТЬ METAMASK"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen></iframe>
      </div>

      <h4>2️. Установка сети BSC в MetaMask: </h4>
      <p>
        {" "}
        <a
          href="https://academy.binance.com/en/articles/connecting-metamask-to-binance-smart-chain"
          target="blank">
          Перейти к руководству
        </a>
      </p>

      <h4>3️ Как пользоваться PancakeSwap:</h4>
      <div className="video">
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/IER97_LypW8"
          title="PANCAKESWAP - ВИДЕО ИСПОЛЬЗУЮТ МОШЕННИКИ ДЛЯ СКАМА."
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen></iframe>
      </div>
      <h4>
        Регистрация на Meta Mask{" "}
        <a href="https://metamask.io/" target="blank">
          https://metamask.io/
        </a>{" "}
      </h4>
      <div className="video">
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/IER97_LypW8"
          title="PANCAKESWAP - ВИДЕО ИСПОЛЬЗУЮТ МОШЕННИКИ ДЛЯ СКАМА."
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen></iframe>
      </div>
      <br />
      <br />
      <h4>
        {" "}
        Для всех кто не имеет своего кошелька на Paeer, рекомендуем пройти регистрацию посмотрев
        двухминутный ролик.
      </h4>
      <div className="video">
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/Hj_OZHvZD-g"
          title="Регистрация и верификация Paer кошелька"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen></iframe>
      </div>
      <h4> Регистрация на Payeer </h4>
      <p>
        <a href="https://globax.click/OhM" target="blank">
          https://globax.click/OhM
        </a>{" "}
      </p>

      <h4>
        Для всех кто не имеет своего кошелька на Аdvcash, рекомендуем пройти регистрацию посмотрев
        минутный ролик.{" "}
      </h4>
      <div className="video">
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/VHRBJLbJRAc"
          title="AdvCash - Как пройти Регистрацию, Верификацию Advanced Cash кошелька."
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen></iframe>
      </div>
      <h4> Регистрация на Адвакешь </h4>
      <p>
        <a href="https://globax.click/foly" target="blank">
          https://globax.click/foly
        </a>{" "}
      </p>
    </div>
  );
}

export default FaqFinance;
