import React from "react";
import styles from "./Index.module.scss";
import { useSelector } from "react-redux";

function Index() {
  const user = useSelector((state) => state.auth.user);

  console.log(user);
  return (
    <div>
      <div className={styles.userAvatar}>
        {user?.avatar ? (
          <img src={user.avatar} alt="account" />
        ) : (
          <img src="img/avatar.png" alt="account" />
        )}
        <button>Upload avatar</button>
      </div>
      <div className={styles.userEmail}>
        <input type="email" value={user?.email} />
      </div>
      <div className={styles.userEmail}>
        <input type="text" value={user?.username} />
      </div>
      <div className={styles.userEmail}>
        <input type="text" value={user?.teegram} />
      </div>
    </div>
  );
}

export default Index;
