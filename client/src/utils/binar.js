const apiTree = {
  root: "root_login",
  l: {
    id: "640b638371238bcb42d89b67",
    v: "user_1",
    l: {
      id: 2,
      v: "user_323",
      l: {
        id: 3,
        v: "user_5",
        l: null,
        r: null,
      },
      r: {
        id: 4,
        v: "user_7",
        l: null,
        r: null,
      },
    },
    r: {
      id: 5,
      v: "user_4",
      l: null,
      r: null,
    },
  },
  r: {
    id: 6,
    v: "user_2",
    l: {
      id: 7,
      v: "user_6",
      l: null,
      r: null,
    },
    r: null,
  },
};

// {"root":"root_login","l":{"id":1,"v":"user_1","l":{"id":2,"v":"user_323","l":{"id":3,"v":"user_5","l":null,"r":null},"r":{"id":4,"v":"user_7","l":null,"r":null}},"r":{"id":5,"v":"user_4","l":null,"r":null}},"r":{"id":6,"v":"user_2","l":{"id":7,"v":"user_6","l":null,"r":null},"r":null}}

//function for 9 levels award refereal// pass to argument id v for search
const findUplinerTree = (id) => {
  var current = apiTree;
  while (current) {
    if (id === current.id) {
      return JSON.parse(JSON.stringify({ ...current }));
    }
    if (id !== current.id) {
      current = current.l;
    } else {
      current = current.r;
    }
  }
  return false;
};

// params (userTree, upliner login)
const addNewUser = (userTree, v) => {
  const queue = [userTree];

  while (queue.length) {
    const node = queue.shift();

    if (node.l) {
      queue.push(node.l);
    } else {
      node.l = {
        id: new Date().getTime(),
        v: v,
        l: null,
        r: null,
      };
      return;
    }
    if (node.r) {
      queue.push(node.r);
    } else {
      node.r = {
        id: new Date().getTime(),
        v: v,
        l: null,
        r: null,
      };
      return;
    }
  }
};

// params (upliner id, upliner tree)
const updateApiTree = (upliner, uplinerTree) => {
  let current = apiTree;
  while (current) {
    if (upliner === current.id) {
      console.log(current);
      current.l = uplinerTree.l;
      current.r = uplinerTree.r;

      return;
    }
    if (upliner !== current.id) {
      current = current.l;
    } else {
      current = current.r;
    }
  }
  return false;
};

const getParent = function (root, n, parent) {
  if (!root) return null;
  if (root.id === n) return parent;
  // return and chain with logical OR
  return getParent(root.l, n, root) || getParent(root.r, n, root);
};

console.log("default tree");
console.log(apiTree);

const upliner = 1;
const currentLogin = "user_1";

const uplinerTree = findUplinerTree(upliner);
console.log("upliner tree");
console.log(uplinerTree);

addNewUser(uplinerTree, currentLogin);
console.log("new upliner tree");

const parent = getParent(apiTree, 5, apiTree);
console.log(parent);

setTimeout(() => {
  updateApiTree(upliner, uplinerTree);
  console.log("after action");
  console.log(apiTree);
}, 8000);
