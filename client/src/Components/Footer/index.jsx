import React from "react";
import styles from "./Footer.module.scss";
function Footer() {
  return (
    <div className={styles.footerWrap}>
      <div className="row ai-center">
        <img src="img/logo-main.svg" alt="" />
        <div className={styles.copy}>© 2023 All Rights Reserved Disclaimer</div>
      </div>
      <img src="img/footer-ask.svg" alt="" />
    </div>
  );
}

export default Footer;
