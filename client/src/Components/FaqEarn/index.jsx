import { useState, useEffect } from "react";

function FaqEarn() {
  return (
    <div className="accountDataBlock">
      <h3 className="accTitle">Заработать</h3>
      <p>
        {" "}
        Миссия Частного пенсионного фонда «Green Energy» - Обеспечить каждого участника проекта
        гарантированным получением минимальной пенсии в 650 $
      </p>
      <p>
        {" "}
        Это стало доступным благодаря Интернет площадке Green Turisn Club, которая и объединила все
        три рынка.{" "}
      </p>
      <p>Рынок Интернет. Реальный сектор бизнеса, и Рынок Инвестиций. </p>
      <p>
        Данная площадка оснащена всеми интернет ресурсами и инструментами для простого и понятного
        использования в сети интернет.
      </p>
      <p>
        Работа роботов и Искусственного интеллекта, будут способствовать Вам в получении активного и
        пассивного дохода в области рекламы.
      </p>
      <div className="video">
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/1AoXuZtY_eI"
          title="заработать"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen></iframe>
      </div>
    </div>
  );
}

export default FaqEarn;
