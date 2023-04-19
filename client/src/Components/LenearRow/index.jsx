import React from "react";
import styles from "./LenearRow.module.scss";
import LenearItem from "../LenearItem";

function LenearRow({ data, level }) {
  console.log(data);
  return level < 11 ? (
    <div className={styles.lenearWrap}>
      <div className={styles.lenearTitile}> {level > 0 ? `LVL ${level}` : "My account"}</div>
      <div className={styles.lenearStripe}>
        {data && data.map((element, i) => <LenearItem login={element} key={i} />)}

        {/* <LenearItem />
      <LenearItem />
      <LenearItem />
      <LenearItem />
      <LenearItem />
      <LenearItem /> */}
      </div>
    </div>
  ) : (
    ""
  );
}

export default LenearRow;
