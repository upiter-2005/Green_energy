import { useState, useEffect } from "react";

import Jackpot from "../Jackpot";
import styles from "./News.module.scss";
import Preloader from "../../Components/Preloader";

function News() {
  const [preloader, setPreloader] = useState(true);

  useEffect(() => {
    if (preloader) {
      setTimeout(() => {
        setPreloader(false);
      }, 2000);
    }
  }, []);
  return (
    <div className={styles.newsWrapp}>
      {preloader ? <Preloader /> : ""}
      <Jackpot />
      <img src="img/news.png" className={styles.cabinetTitle_Img} alt="" />
      <div className="borderRound">
        <div className={styles.newsWrapp_area}>
          <a href="#" className={styles.new_itemBlock}>
            <img src="img/new-item.png" alt="" />
          </a>
          <a href="#" className={styles.new_itemBlock}>
            <img src="img/new-item.png" alt="" />
          </a>
          <a href="#" className={styles.new_itemBlock}>
            <img src="img/new-item.png" alt="" />
          </a>
          <a href="#" className={styles.new_itemBlock}>
            <img src="img/new-item.png" alt="" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default News;
