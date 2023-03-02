import React from "react";
import styles from "./Main.module.scss";
import Header from "../../Components/Header";

function Main() {
  return (
    <div className={styles.pageWrapper}>
      <Header />
    </div>
  );
}

export default Main;
