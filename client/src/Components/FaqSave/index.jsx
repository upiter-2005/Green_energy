import { useState, useEffect } from "react";

function FaqSave() {
  return (
    <div className="accountDataBlock">
      <h3 className="accTitle">Сохранить</h3>
      <p> Рынок Недвижимости во все времена имеет свою ценность. </p>
      <p>Никакой кризис не может обесценить жильё. Особенно жильё, которое сдается в Аренду.</p>
      <p>Цель данного проекта - научить сохранять свои заработанные деньги. </p>
      <p>
        Автономные поселения и Зеленый туризм, всё Больше, и больше становится востребованным,
        особенно в это кризисное и неспокойное время.
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

export default FaqSave;
