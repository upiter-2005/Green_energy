import React from "react";
import styles from "./LenearRow.module.scss";
import LenearItem from "../LenearItem";

function LenearRow({ data, level }) {
  console.log(data);
  return (
    <div className={styles.lenearWrap}>
      <div className={styles.lenearTitile}>LVL {level}</div>
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
  );
}

export default LenearRow;
