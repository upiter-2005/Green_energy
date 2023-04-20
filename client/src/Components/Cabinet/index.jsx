import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axios";
import { setTree } from "../../redux/slices/optionsSlice";
import { getMe, getStructure, checkIsAuth } from "../../redux/slices/authSlice";
import Popup from "../Popup";
import Deposit from "../Deposit";
import Transfer from "../Transfer";
import Jackpot from "../Jackpot";
import { toast } from "react-toastify";
import styles from "./Cabinet.module.scss";
import { getTree } from "../../redux/slices/optionsSlice";
import Preloader from "../../Components/Preloader";

function Cabinet() {
  const dispatch = useDispatch();
  const [butPopup, setButPopup] = useState(false);
  const [depositOpen, setDepositOpen] = useState(false);
  const [transferOpen, setTransferOpen] = useState(false);
  const [preloader, setPreloader] = useState(true);
  const [team, setTeam] = useState(false);
  const [nonActive, setNonActive] = useState(false);
  //parsed from server tree to Object
  const [parsedTree, setParsedTree] = useState(null);
  const [butType, setButType] = useState();

  const user = useSelector((state) => state.auth.user);
  //JSON string tree to from server
  const apiTree = useSelector((state) => state.options.tree);
  const id = useSelector((state) => state.options.id);
  const structure = useSelector((state) => state.auth.structure);
  console.log(structure);
  console.log(apiTree);

  const navigate = useNavigate();
  const isAuth = useSelector(checkIsAuth);

  // useEffect(() => {
  //   console.log(structure);
  //   // if (structure) {
  //   //   getNonActive();
  //   //   findPocketsNum(user?.login);
  //   // } else return;
  // }, [structure]);

  useEffect(() => {
    if (preloader) {
      setTimeout(() => {
        setPreloader(false);
      }, 2000);
    }
    dispatch(getTree());
  }, []);

  useEffect(() => {
    dispatch(getStructure());
    //findPocketsNum(user?.login);
    setButType(user?.is_active);
  }, [user, dispatch]);

  useEffect(() => {
    if (apiTree) {
      const jsonparseTree = JSON.parse(apiTree);
      setParsedTree(jsonparseTree);
      myTeam();
    }
  }, [apiTree]);

  useEffect(() => {
    myTeam();
  }, [parsedTree]);

  const findUplinerTree = (id) => {
    console.log(id);
    let nodesQueue = [];
    let nodesInCurrentLevel = 1;
    let nodesInNextLevel = 0;
    nodesQueue.push(parsedTree);
    while (nodesQueue.length !== 0) {
      let currNode = nodesQueue[0];
      nodesQueue.splice(0, 1);
      nodesInCurrentLevel--;
      if (currNode) {
        console.log(currNode.id);
        if (currNode.id == id) {
          console.log(currNode);
          return JSON.parse(JSON.stringify({ ...currNode }));
        }
        nodesQueue.push(currNode.l);
        nodesQueue.push(currNode.r);
        nodesInNextLevel += 2;
      }
      if (nodesInCurrentLevel == 0) {
        console.log("<br>");
        nodesInCurrentLevel = nodesInNextLevel;
        nodesInNextLevel = 0;
      }
    }
  };
  const findPocketsNum = async (login) => {
    console.log(id);
    let count = 0;
    let nodesQueue = [];
    let nodesInCurrentLevel = 1;
    let nodesInNextLevel = 0;
    const myTree = await findUplinerTree(user._id);
    nodesQueue.push(myTree);
    while (nodesQueue.length !== 0) {
      let currNode = nodesQueue[0];
      nodesQueue.splice(0, 1);
      nodesInCurrentLevel--;
      if (currNode) {
        if (currNode.v === login) {
          count++;
        }
        nodesQueue.push(currNode.l);
        nodesQueue.push(currNode.r);
        nodesInNextLevel += 2;
      }
      if (nodesInCurrentLevel == 0) {
        console.log("<br>");
        nodesInCurrentLevel = nodesInNextLevel;
        nodesInNextLevel = 0;
      }
    }
    console.log(count);
    // if (count === 1) {
    //   setPoketNum(count);
    // } else {
    //   setPoketNum(count);
    // }
  };

  // params (userTree, upliner login)
  const addNewUser = (userTree, v, userId) => {
    const queue = [userTree];

    while (queue.length) {
      const node = queue.shift();

      if (node.l) {
        queue.push(node.l);
      } else {
        node.l = {
          id: userId || new Date().getTime(),
          v: v,
          l: null,
          r: null,
        };
        return node.l.id;
      }
      if (node.r) {
        queue.push(node.r);
      } else {
        node.r = {
          id: userId || new Date().getTime(),
          v: v,
          l: null,
          r: null,
        };
        return node.r.id;
      }
    }
  };

  // params (upliner id, upliner tree)
  const updateApiTree = (upliner, uplinerTree) => {
    let nodesQueue = [];
    let nodesInCurrentLevel = 1;
    let nodesInNextLevel = 0;
    nodesQueue.push(parsedTree);
    while (nodesQueue.length !== 0) {
      let currNode = nodesQueue[0];
      nodesQueue.splice(0, 1);
      nodesInCurrentLevel--;
      if (currNode) {
        console.log(currNode.id);
        if (currNode.id === upliner) {
          currNode.l = uplinerTree.l;
          currNode.r = uplinerTree.r;
        }
        nodesQueue.push(currNode.l);
        nodesQueue.push(currNode.r);
        nodesInNextLevel += 2;
      }
      if (nodesInCurrentLevel == 0) {
        console.log("<br>");
        nodesInCurrentLevel = nodesInNextLevel;
        nodesInNextLevel = 0;
      }
    }

    return false;
  };

  const getParent = (root, n, parent) => {
    if (!root) return null;
    if (root.id === n) return parent;
    // return and chain with logical OR
    return getParent(root.l, n, root) || getParent(root.r, n, root);
  };

  const updateTree = () => {
    const newTree = JSON.stringify(parsedTree);
    // const apiTree222 = {
    //   root: "root_login",
    //   v: "GreenEnergy",
    //   id: "6404d74471238bcb42d89a03",
    //   l: {
    //     id: "64142282ededa8e759728028",
    //     v: "new_11",
    //     l: null,
    //     r: null,
    //   },
    //   r: {
    //     id: "641ae6baefff04ef66398d49",
    //     v: "pavel11",
    //     l: {
    //       id: "641ae733efff04ef66398d4f",
    //       v: "pavel22",
    //       l: null,
    //       r: null,
    //     },
    //     r: null,
    //   },
    // };

    // const newTree = JSON.stringify(apiTree222);

    dispatch(
      setTree({
        id: id,
        tree: newTree,
      }),
    );
  };

  const getNonActive = () => {
    const result = structure?.filter((obj) => {
      if (!obj.is_active) return true;
    });
    setNonActive(result?.length);
  };

  const updateBalance = async (login, deposit) => {
    try {
      const params = {
        login,
        balance: deposit,
      };
      const { data } = await axios.patch("/user/updateBalance", params);
    } catch (error) {
      console.log(error);
    }
  };
  const updateReinvestBalance = async (login, deposit) => {
    try {
      const params = {
        login,
        balanceReinvest: deposit,
      };
      const { data } = await axios.patch("/user/updateReinvestBalance", params);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const updateCashbackBalance = async (login, deposit) => {
    try {
      const params = {
        login,
        cashbackBalance: deposit,
      };
      const { data } = await axios.patch("/user/updateCashbackBalance", params);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const updateCashbackReinvest = async (login, deposit) => {
    try {
      const params = {
        login,
        cashbackReinvest: deposit,
      };
      const { data } = await axios.patch("/user/updateCashbackReinvest", params);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const addAwardToParticipants = async (login, deposit, refferal) => {
    refferal = refferal || false;

    // Get from addAwards func
    try {
      const { data } = await axios.post(`/user/getUserByLogin`, { login });
      console.log(data.user.login);
      let cashbackBalance = data.user.cashback_balance;
      let cashbackReinvest = data.user.cashback_reinvest;

      if (refferal) {
        let refAwr = data.user.refAwards + 15;
        let totalAwr = data.user.totalAwards + 15;

        const resultOne = await axios.patch("/user/updateRefAwards", { login, refAwards: refAwr });
        const resultTwo = await axios.patch("/user/updateTotalAwards", {
          login,
          totalAwards: totalAwr,
        });
      } else {
        let totalAwr = data.user.totalAwards + 1;
        const resultTwo = await axios.patch("/user/updateTotalAwards", {
          login,
          totalAwards: totalAwr,
        });
      }

      const remainBal = 30 - cashbackBalance; // 14$ remain
      const remainReinv = 50 - cashbackReinvest; // 50$ remain

      if (cashbackBalance < 30) {
        if (deposit > remainBal) {
          await updateCashbackBalance(login, 30);
          let toBalance = 30 - cashbackBalance; // 16
          await updateBalance(login, toBalance);
          deposit = deposit - toBalance; //2
          await updateReinvestBalance(login, deposit);
          await updateCashbackReinvest(login, deposit);
          return;
        } else {
          await updateBalance(login, deposit);
          await updateCashbackBalance(login, deposit);
          return;
        }
      } else if (cashbackReinvest < 50) {
        if (deposit > remainReinv) {
          await updateReinvestBalance(login, 50);
          await updateCashbackReinvest(login, 50);
          const toBalance = deposit - remainReinv;
          await updateBalance(login, toBalance);
          return;
        } else {
          await updateReinvestBalance(login, deposit);
          await updateCashbackReinvest(login, deposit);
          return;
        }
      } else {
        await updateBalance(login, deposit);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addAwards = async (newId, getFundMe) => {
    console.log(newId);
    if (getFundMe) {
      await addAwardToParticipants(user.login, 15, true);
    } else {
      await addAwardToParticipants(user.upliner, 15, true);
    }

    let parent = await getParent(parsedTree, newId, parsedTree);
    console.log("parent 1 ===========");
    console.log("id - " + parent?.id);
    console.log("login - " + parent?.v);

    await addAwardToParticipants(parent.v, 1);
    if (parent) {
      let p1 = await getParent(parsedTree, parent.id, parsedTree);

      // db.users.updateOne({login: "domblaga"}, {$inc:{ totalAwards: 1,}})

      if (!p1.id) {
        return;
      } else {
        await addAwardToParticipants(p1.v, 1);
        console.log("parent 2 ===========");
        console.log("id - " + p1.id);
        console.log("login - " + p1.v);

        let p2 = await getParent(parsedTree, p1.id, parsedTree);

        if (!p2.id) {
          return;
        } else {
          await addAwardToParticipants(p2.v, 1);
          console.log("parent 3 ===========");
          console.log("id - " + p2.id);
          console.log("login - " + p2.v);
          let p3 = await getParent(parsedTree, p2.id, parsedTree);

          if (!p3.id) {
            return;
          } else {
            await addAwardToParticipants(p3.v, 1);
            console.log("parent 4 ===========");
            console.log("id - " + p3.id);
            console.log("login - " + p3.v);
            let p4 = await getParent(parsedTree, p3.id, parsedTree);

            if (!p4.id) {
              return;
            } else {
              await addAwardToParticipants(p4.v, 1);
              console.log("parent 5 ===========");
              console.log("id - " + p4.id);
              console.log("login - " + p4.v);
              let p5 = await getParent(parsedTree, p4.id, parsedTree);

              if (!p5.id) {
                return;
              } else {
                await addAwardToParticipants(p5.v, 1);
                console.log("parent 6 ===========");
                console.log("id - " + p5.id);
                console.log("login - " + p5.v);
                let p6 = await getParent(parsedTree, p5.id, parsedTree);

                if (!p6.id) {
                  return;
                } else {
                  await addAwardToParticipants(p6.v, 1);
                  console.log("parent 7 ===========");
                  console.log("id - " + p6.id);
                  console.log("login - " + p6.v);
                  let p7 = await getParent(parsedTree, p6.id, parsedTree);

                  if (!p7.id) {
                    return;
                  } else {
                    await addAwardToParticipants(p7.v, 1);
                    console.log("parent 8 ===========");
                    console.log("id - " + p7.id);
                    console.log("login - " + p7.v);
                    let p8 = await getParent(parsedTree, p7.id, parsedTree);

                    if (!p8.id) {
                      return;
                    } else {
                      await addAwardToParticipants(p8.v, 1);
                      console.log("parent 9 ===========");
                      console.log("id - " + p8.id);
                      console.log("login - " + p8.v);
                      let p9 = await getParent(parsedTree, p8.id, parsedTree);
                      if (!p9.id) {
                        return;
                      } else {
                        await addAwardToParticipants(p9.v, 1);
                        console.log("parent 10 ===========");
                        console.log("id - " + p9.id);
                        console.log("login - " + p9.v);
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      dispatch(getMe());
      toast.success("Покупка места в структуре прошла успешно!");
    }
  };

  const test = async () => {
    //FOR DEPLOY
    const apiTree222 = {
      root: "root_login",
      v: "GreenEnergy",
      id: "6404d74471238bcb42d89a03",
      l: {
        id: "6404e8d771238bcb42d89a59",
        v: "domblaga",
        l: null,
        r: null,
      },
      r: null,
    };
    //FOR DEPLOY

    //FOR TEST
    // const apiTree222 = {
    //   root: "root_login",
    //   v: "GreenEnergy",
    //   id: "6404d74471238bcb42d89a03",
    //   l: {
    //     id: "64142282ededa8e759728028",
    //     v: "new_11",
    //     l: null,
    //     r: null,
    //   },
    //   r: {
    //     id: "641ae6baefff04ef66398d49",
    //     v: "pavel11",
    //     l: {
    //       id: "641ae733efff04ef66398d4f",
    //       v: "pavel22",
    //       l: null,
    //       r: null,
    //     },
    //     r: null,
    //   },
    // };
    //FOR TEST

    const newTree = JSON.stringify(apiTree222);

    dispatch(
      setTree({
        id: id,
        tree: newTree,
      }),
    );
  };

  var verticalOrder = function (root) {
    var store = {};
    traverse(parsedTree, 0, store);
    var columnKey = Object.keys(store).sort(function (a, b) {
      return a - b;
    });
    var results = [];
    for (var i = 0; i < columnKey.length; i++) {
      results.push(store[columnKey[i]]);
    }
    return results;
  };

  var traverse = (node, count, columns) => {
    if (!node) return;
    if (columns[count]) columns[count].push(node.v);
    else columns[count] = [node.v];
    if (node.l) traverse(node.l, count - 1, columns);
    if (node.r) traverse(node.r, count + 1, columns);
  };

  const zigzagOrder = (root) => {
    if (!root) return [];
    const queue = [root];
    const result = [];
    let count = 0;

    while (queue.length) {
      let len = queue.length;

      if (count % 2 === 0) {
        result.push(queue.map((node) => node.v));
      } else {
        result.push(queue.map((node) => node.v).reverse());
      }
      count++;
      while (len--) {
        let node = queue.shift();
        if (node.l) queue.push(node.l);
        if (node.r) queue.push(node.r);
      }
    }
    return result;
  };
  const myTeam = async () => {
    const myTee = await findUplinerTree(user._id);
    console.log(myTee);
    let count = 0;
    let nodesQueue = [];
    let nodesInCurrentLevel = 1;
    let nodesInNextLevel = 0;
    nodesQueue.push(myTee);
    while (nodesQueue.length !== 0) {
      let currNode = nodesQueue[0];
      nodesQueue.splice(0, 1);
      nodesInCurrentLevel--;
      if (currNode) {
        count++;

        nodesQueue.push(currNode.l);
        nodesQueue.push(currNode.r);
        nodesInNextLevel += 2;
      }
      if (nodesInCurrentLevel == 0) {
        nodesInCurrentLevel = nodesInNextLevel;
        nodesInNextLevel = 0;
      }
    }
    console.log(count);
    if (count === 0) {
      setTeam(0);
    } else {
      setTeam(count - 1);
    }
  };

  const buyCell = async () => {
    if (user.balance < 30) {
      toast.error("Не достаточно средств для покупки пакета!");
      return true;
    } else {
      await axios.patch("/user/balanceMinus", { idUser: user?._id, minusBalance: 30 });
      await axios.patch("/user/tokenPlus", { idUser: user?._id });
      await axios.patch("/user/pocketPlus", { idUser: user?._id });
      const rootId = "6404d74471238bcb42d89a03";
      let uplinerId = null;
      const { data } = await axios.get("/user/getUplinerInfo");
      await axios.patch("/user/activeOn", {});

      if (data.upliner.is_active) {
        uplinerId = data.upliner._id;
      } else {
        uplinerId = rootId;
      }

      const uplinerTree = await findUplinerTree(uplinerId);
      const lastId = await addNewUser(uplinerTree, user.login, user._id);

      await updateApiTree(uplinerId, uplinerTree);
      updateTree();
      setButType(true);
      addAwards(lastId);
    }
  };

  const buyPensia = async () => {
    if (user.balanceReinvest === 50) {
      await axios.patch("/user/balanceReinvestZero", { idUser: user?._id });
      const uplinerTree = await findUplinerTree(user?._id);
      const lastId = await addNewUser(uplinerTree, user.login);

      await updateApiTree(user._id, uplinerTree);
      updateTree();
      await axios.patch("/user/tokenPlus", { idUser: user?._id });
      await axios.patch("/user/pocketPlus", { idUser: user?._id });
      addAwards(lastId, true);
    } else {
      //user.balanceReinvest // 20$
      let remain = 50 - user.balanceReinvest; //30$
      if (user.balance < remain) {
        toast.error("Не достаточно средств для покупки пакета!");
        return true;
      } else {
        await axios.patch("/user/balanceReinvestZero", { idUser: user?._id });
        await axios.patch("/user/balanceMinus", { idUser: user?._id, minusBalance: remain });
        const uplinerTree = await findUplinerTree(user?._id);
        const lastId = await addNewUser(uplinerTree, user.login);
        await axios.patch("/user/tokenPlus", { idUser: user?._id });
        await axios.patch("/user/pocketPlus", { idUser: user?._id });
        await updateApiTree(user._id, uplinerTree);
        updateTree();

        addAwards(lastId, true);
      }
    }
  };

  if (!isAuth) {
    return navigate("/login");
  }
  return (
    <div className={styles.cabinetWrapp}>
      <Jackpot />
      {preloader ? <Preloader /> : ""}
      {/* {user?.email === "kasperov11@gmail.com" ? (
        <button onClick={() => test()}>Init tree</button>
      ) : (
        ""
      )} */}

      <img src="img/cabTitle.svg" className={styles.cabinetTitle_Img} alt="" />
      <div className="borderRound">
        <div className={styles.cabinet_area}>
          <div className={styles.cabinet_area_left}>
            <div className={styles.cabinet_area_leftTop}>
              {user?.avatar ? (
                <img src={`${process.env.REACT_APP_IMG_URL}${user.avatar}`} alt="" />
              ) : (
                <img src="img/avatar-default.svg" alt="" />
              )}

              <div>
                <h3>{user?.login}</h3>
                <p>
                  Ваш статус: <span>{user?.is_active ? "Активный" : "Не активный"}</span>
                </p>
                <p>
                  Ваш спонсор: <span>{user?.upliner ? user.upliner : " --- "}</span>
                  <button className={styles.socOpen} onClick={() => setButPopup(true)}>
                    <span>СОЦСЕТИ</span>
                  </button>
                </p>
              </div>
            </div>

            <div
              className={`${styles.userInfo} ${styles.mobVisible} ${styles.mobVisible_statstic}`}>
              <div className={styles.userInfoItem}>
                <p>{team + nonActive} </p>
                Моя команда
              </div>
              <div className={styles.userInfoItem}>
                <p>{user.comand}</p>
                Лично приглашенные
              </div>
              <div className={styles.userInfoItem}>
                <p>{team}</p>
                {/* <p>{team === 0 ? team : team - 1}</p> */}
                Активные партнеры
              </div>
              <div className={styles.userInfoItem}>
                <p>$ {user.refAwards}</p>
                Реферальные награды
              </div>
              <div className={styles.userInfoItem}>
                <p>$ {user.totalAwards}</p>
                Всего заработано
              </div>
            </div>

            <div className={styles.cabinet_area_leftCenter}>
              <h4>Балансы счетов:</h4>

              <div className={`${styles.balanceItem} ${styles.f1}`}>
                <div className={styles.flexRow}>
                  <span className={styles.title_text}>$USD</span>{" "}
                  <button className={styles.transfer} onClick={() => setTransferOpen(true)}>
                    <img src="img/transfer.svg" alt="" />
                  </button>
                </div>

                <div className={styles.flexRow}>
                  <div className={styles.flexRow_gorizont}>
                    <span className={styles.fz14}>Основной баланс:</span>
                    <span className={styles.fz20}>{user?.balance} USD</span>
                  </div>
                  <div className={styles.flexRow_gorizont}>
                    <button className={styles.buyUsdt} onClick={() => setDepositOpen(true)}>
                      <img src="img/buy.svg" alt="" />
                    </button>
                    <button
                      className={styles.withdraw}
                      onClick={() => {
                        toast.error("Вывод будет доступен 22-го апреля ");
                      }}>
                      <img src="img/withdraw.svg" alt="" />
                    </button>
                  </div>
                </div>
              </div>

              <div className={`${styles.balanceItem} ${styles.f2}`}>
                <div className={styles.flexRow}>
                  <span className={styles.title_text_min}>ПОКУПКА ПАКЕТА</span>{" "}
                  <span className={styles.title_text_24}>{butType ? "$50" : "$30"}</span>
                </div>
                <button>
                  {butType ? (
                    <img
                      src="img/pensiya-buy.svg"
                      alt=""
                      className={styles.buy_pocket}
                      //onClick={buyPensia}
                      onClick={() => {
                        toast.error("Покупка пакета будет активна 1-го мая");
                      }}
                    />
                  ) : (
                    <img
                      src="img/buy_packet.svg"
                      alt=""
                      className={styles.buy_pocket}
                      onClick={buyCell}
                    />
                  )}
                </button>
                <div className={styles.flexRow}>
                  <div className={styles.flexRow_vertical}>
                    <span className={styles.active_pockets}>Активных пакетов:</span>
                    {/* <span className={styles.title_text_24}>{pocketNum}</span> */}
                    <span className={styles.title_text_24}>{user?.qtyPocket}</span>
                  </div>
                  <div className={styles.flexRow_gorizont}>
                    <span className={styles.fz14}>Реинвест баланс:</span>
                    <span className={styles.fz16}>{user?.balanceReinvest} USD</span>
                  </div>
                </div>
              </div>
              <div className={`${styles.balanceItem} ${styles.f3}`}>
                <div className={styles.flexRow}>
                  <span className={styles.title_text}>ENERGY</span>{" "}
                  <button className={styles.transfer}>
                    <span className={styles.fz20}>1 = 10 USD</span>
                  </button>
                </div>

                <div className={styles.flexRow}>
                  <div className={styles.flexRow_gorizont}>
                    <span className={styles.fz14}>Мои токены:</span>
                    <span className={styles.fz20}>{(user?.tokens).toFixed(1)} ENERGY</span>
                  </div>
                  <div className={styles.flexRow_gorizont}>
                    <span className={styles.title_text_24}>${Math.ceil(user?.tokens * 10)}</span>
                  </div>
                </div>
              </div>
              <div className={`${styles.balanceItem} ${styles.f4}`}>
                <div className={styles.flexRow}>
                  <span className={styles.title_text_min}>КУПИТЬ РЕФЕРАЛА</span>{" "}
                  <span className={styles.title_text_24}>$5</span>
                </div>
                <button onClick={() => toast.success("В разработке")}>
                  <img src="img/buy_ref.svg" alt="" className={styles.buy_pocket} />
                </button>
                <div className={styles.flexRow}>
                  <div className={styles.flexRow_vertical}>
                    <span className={styles.active_pockets_ref}>Рефералов заказано:</span>
                    <span className={styles.title_text_24}>0</span>
                  </div>
                  <div className={styles.flexRow_vertical}>
                    <span className={styles.active_pockets_ref}>Рефералов получено:</span>
                    <span className={styles.title_text_24}>0</span>
                  </div>
                </div>
              </div>
            </div>

            <h4>Новые участники в структре:</h4>
            <div className={styles.cabinet_area_leftBottom}>
              <div className={styles.lastUser}>
                {user?.avatar ? (
                  <img
                    src={`${process.env.REACT_APP_IMG_URL}${user.avatar}`}
                    className={styles.lastUser_img}
                    alt=""
                  />
                ) : (
                  <img src="img/avatar2.png" alt="" className={styles.lastUser_img} />
                )}

                <p className={styles.lastUser_name}>User 01</p>
                <div className={styles.lastUser_data}>
                  <span>Статус:</span>
                  <span>Активный</span>
                </div>
                <div className={styles.lastUser_data}>
                  <span>Спонсор:</span>
                  <span>SuperUser02</span>
                </div>

                <button className={styles.lastUser_soc} onClick={() => setButPopup(true)}>
                  <span>СОЦСЕТИ</span>
                </button>
              </div>

              <div className={styles.lastUser}>
                {user?.avatar ? (
                  <img
                    src={`${process.env.REACT_APP_IMG_URL}${user.avatar}`}
                    className={styles.lastUser_img}
                    alt=""
                  />
                ) : (
                  <img src="img/avatar2.png" alt="" className={styles.lastUser_img} />
                )}

                <p className={styles.lastUser_name}>User 01</p>
                <div className={styles.lastUser_data}>
                  <span>Статус:</span>
                  <span>Активный</span>
                </div>
                <div className={styles.lastUser_data}>
                  <span>Спонсор:</span>
                  <span>SuperUser02</span>
                </div>

                <button className={styles.lastUser_soc} onClick={() => setButPopup(true)}>
                  <span>СОЦСЕТИ</span>
                </button>
              </div>

              <div className={styles.lastUser}>
                {user?.avatar ? (
                  <img
                    src={`${process.env.REACT_APP_IMG_URL}${user.avatar}`}
                    className={styles.lastUser_img}
                    alt=""
                  />
                ) : (
                  <img src="img/avatar2.png" alt="" className={styles.lastUser_img} />
                )}

                <p className={styles.lastUser_name}>User 01</p>
                <div className={styles.lastUser_data}>
                  <span>Статус:</span>
                  <span>Активный</span>
                </div>
                <div className={styles.lastUser_data}>
                  <span>Спонсор:</span>
                  <span>SuperUser02</span>
                </div>

                <button className={styles.lastUser_soc} onClick={() => setButPopup(true)}>
                  <span>СОЦСЕТИ</span>
                </button>
              </div>
            </div>
          </div>
          <div className={styles.cabinet_area_right}>
            <div className={`${styles.userInfo} ${styles.pkVisible}`}>
              <div className={styles.userInfoItem}>
                <p>{team + nonActive} </p>
                Моя команда
              </div>
              <div className={styles.userInfoItem}>
                <p>{user.comand}</p>
                Лично приглашенные
              </div>
              <div className={styles.userInfoItem}>
                <p>{team}</p>
                {/* <p>{team === 0 ? team : team - 1}</p> */}
                Активные партнеры
              </div>
              <div className={styles.userInfoItem}>
                <p>$ {user.refAwards}</p>
                Реферальные награды
              </div>
              <div className={styles.userInfoItem}>
                <p>$ {user.totalAwards}</p>
                Всего заработано
              </div>
            </div>

            <div className={styles.userPensia}>
              <img src="img/pensiafon-ico.png" alt="" className={styles.pensiafon_ico} />
              <div className={styles.userPensia_info}>
                <h3>Мои пенсионные накопления:</h3>
                <div className={styles.userPensia_Balance}>${user?.staking}</div>
                <button onClick={() => toast.success("В разработке")}>
                  Посмотреть мои накопления
                </button>
              </div>
            </div>
            <a href="#" alt="" className={styles.new_item}>
              <img src="img/new-item.png" alt="" />
            </a>
          </div>
        </div>
      </div>

      <Popup
        trigger={butPopup}
        telegram={user?.telegram}
        whatsapp={user?.whatsapp}
        facebook={user?.facebook}
        instagram={user?.instagram}
        twitter={user?.twitter}
        setTriggerBut={setButPopup}>
        <h2>telegram</h2>
      </Popup>
      <Deposit trigger={depositOpen} setTriggerBut={setDepositOpen} />

      <Transfer trigger={transferOpen} setTriggerBut={setTransferOpen} />
    </div>
  );
}

export default Cabinet;
