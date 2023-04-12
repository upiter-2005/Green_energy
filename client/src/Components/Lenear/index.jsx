import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMe, getStructure } from "../../redux/slices/authSlice";
import styles from "./Lenear.module.scss";
import LenearRow from "../LenearRow";

function Lenear() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const apiTree = useSelector((state) => state.options.tree);
  const [parsedTree, setParsedTree] = useState(null);
  const [myLenear, setMyLenear] = useState(null);

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

  const makeLenear = async () => {
    const myTree = await findUplinerTree(user._id);
    const result = zigzagOrder(myTree);
    setMyLenear(result);
  };

  useEffect(() => {
    const jsonparseTree = JSON.parse(apiTree);
    console.log(jsonparseTree);
    setParsedTree(jsonparseTree);
  }, []);

  useEffect(() => {
    console.log("Lenearrrr    UUUUUUSSSSSSERER");
    makeLenear();
  }, [parsedTree]);

  console.log(myLenear);
  console.log(user);
  console.log(apiTree);
  return <>{myLenear && myLenear.map((obj, i) => <LenearRow data={obj} level={i} key={i} />)}</>;
}

export default Lenear;
