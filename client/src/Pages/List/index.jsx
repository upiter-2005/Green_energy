import React from "react";
import styles from "./List.module.scss";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers } from "../../redux/slices/authSlice";

import Header from "../../Components/Header";

function Account() {
  const dispatch = useDispatch();
  const [section, setSection] = useState("profile");
  const users = useSelector((state) => state.auth.allUsers);
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);
  return (
    <div className={styles.pageWrapper}>
      <Header />
      <div className={styles.accountWrapper}>
        <div className={styles.list_box}>
          <div>
            <span>Login</span>
            <span>Email</span>
            <span>Name</span>
            <span>Surname</span>
            <span>Phone</span>
            <span>Upliner / Sponsor</span>
          </div>
          <br />
          {users &&
            users.map((obj, i) => (
              <div key={i}>
                <span>
                  {i}) {obj.login}
                </span>
                <span>{obj.email}</span>
                <span>{obj.name}</span>
                <span>{obj.surname}</span>
                <span>{obj.phone}</span>
                <span>{obj.upliner}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Account;
