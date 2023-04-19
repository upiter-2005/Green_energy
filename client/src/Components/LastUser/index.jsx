import React from "react";
import styles from "./LastUser.module.scss";
import moment from "moment";

function LastUser({ data, index }) {
  return (
    <>
      <div key={index} className={styles.LastUserItem}>
        <div>{data.login}</div>
        <div>{data.upliner}</div>
        <div>{moment(data.updatedAt).format("HH:MM:SS")}</div>
        <div>{moment(data.updatedAt).format("DD.MM.YYYY")}</div>
      </div>
    </>
  );
}

export default LastUser;
