import { useState, useEffect } from "react";

function FaqCabinet() {
  return (
    <div className="accountDataBlock">
      <h3 className="accTitle">Кабинет</h3>
      <p>Большой бизнес возможен только в шикарном офисе.</p>
      <p>
        Ваш личный кабинет в международном фонде «GreenEnergy» - Это современный дизайн, удобный и
        многофункциональный интерфейс, простые и понятные инструменты выполнены по последнему крику
        моды.{" "}
      </p>
      <p>
        {" "}
        Мультиязычный кабинет позволяет работать в международном сегменте общества. Прозрачность и
        полный отчет в движении финансов, с набором всех необходимых инструментов.
      </p>

      <div className="video">
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/nRgiQYILfOo"
          title="кабинет"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen></iframe>
      </div>
    </div>
  );
}

export default FaqCabinet;
