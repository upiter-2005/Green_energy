import React from "react";
import styles from "./List.module.scss";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers } from "../../redux/slices/authSlice";

import Header from "../../Components/Header";
import ListItem from "../../Components/ListItem";

function List() {
  const dispatch = useDispatch();
  const [searchUser, setSearchUser] = useState("");
  const [activeSearch, setActiveSearch] = useState(false);
  const [resultSearch, setResulrSearch] = useState(null);
  const users = useSelector((state) => state.auth.allUsers);

  const setDefault = () => {
    setActiveSearch(false);
    setSearchUser("");
    dispatch(getAllUsers());
  };
  const serching = (e) => {
    setActiveSearch(true);
    setSearchUser(e.target.value);
    if (e.target.value.length == 0) {
      setActiveSearch(false);
      dispatch(getAllUsers());
    }
    if (e.target.value.length > 2) {
      let searchResult = users.filter((obj) => obj.login.includes(e.target.value));
      console.log(searchResult);
      setResulrSearch(searchResult);
    }
  };

  const updateList = () => {
    dispatch(getAllUsers());
  };
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);
  return (
    <div className={styles.pageWrapper}>
      <Header />
      <div className={styles.accountWrapper}>
        <div className={styles.listSearch}>
          Поиск по логину:
          <input type="text" value={searchUser} onChange={serching} />
          <button onClick={setDefault}>x</button>
        </div>
        <div className={styles.list_box}>
          <div>
            <span>Login</span>
            <span>Email</span>
            <span>Name</span>
            <span>Phone</span>
            <span>Upliner / Sponsor</span>
            <span>Balance USD</span>
            <span>Staking</span>
            <span>SaveUser</span>
          </div>
          <br />
          {activeSearch
            ? resultSearch?.map((obj, i) => (
                <ListItem data={obj} key={obj._id} num={i} updateList={updateList} />
              ))
            : users?.map((obj, i) => (
                <ListItem data={obj} key={obj._id} num={i} updateList={updateList} />
              ))}
        </div>
      </div>
    </div>
  );
}

export default List;
