import { useState, useEffect } from "react";

import Jackpot from "../Jackpot";
import styles from "./News.module.scss";

function News() {
  return (
    <div className={styles.newsWrapp}>
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
