import React from "react";
import styles from "./Footer.module.scss";
function Footer() {
  return (
    <div className={styles.footerWrap}>
      <div className="row ai-center d-md-block">
        <img src="img/logo-main.svg" alt="" />
        <div className={styles.copy}>© 2023 All Rights Reserved Disclaimer</div>
      </div>

      <img src="img/footer-ask.svg" alt="" />

      <div className="row ai-center d-md-none">
        <div className={styles.copy}>© 2023 All Rights Reserved Disclaimer</div>
      </div>
    </div>
  );
}

export default Footer;
