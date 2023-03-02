import React from "react";
import styles from "./Wallets.module.scss";
import { useSelector } from "react-redux";

function Wallets() {
  const user = useSelector((state) => state.auth.user);
  return <div>{user?.wallet}</div>;
}

export default Wallets;
