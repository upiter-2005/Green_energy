import { useEffect, useState, useRef } from "react";
import styles from "./Staking.module.scss";
import detectEthereumProvider from "@metamask/detect-provider";
import { ethers } from "ethers";

function Staking() {
  const [usdtAmount, setUsdtAmount] = useState(0);
  const [account, setAccount] = useState(null);
  const [usdtBalance, setUsdtBalance] = useState(0);

  //  read data from the USDT contract
  const usdtAddress = "0x337610d27c682E347C9cD60BD4b3b107C9d34dDd";

  const usdtAbi = [
    // Some details about the token
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function decimals() view returns (uint8)",
    "function balanceOf(address) view returns (uint)",
    "function totalSupply() view returns (uint256)",
    "function transfer(address to, uint amount)",
  ];

  // 1. Connect Metamask with Dapp
  async function connectMetamask() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const [selectedAddress] = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    const signer = provider.getSigner();

    console.log("Account address s:", await signer.getAddress());
    // const usdtContract = new ethers.Contract(usdtAddress, usdtAbi, provider);
    // const myBalance = await usdtContract.balanceOf(account);
    // const amount = myBalance / 1e18;
    // setUsdtBalance(amount);
    getBalance();
    setAccount(selectedAddress);
    window.ethereum.on("accountsChanged", async ([newAddress]) => {
      console.log("account change");
      updateMetamask(newAddress);
    });
  }

  const getBalance = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const usdtContract = new ethers.Contract(usdtAddress, usdtAbi, provider);
    const myBalance = await usdtContract.balanceOf(account);
    const amount = myBalance / 1e18;
    setUsdtBalance(amount);
  };
  // 4. Send Usdt to one account to another
  async function sendUsdtToAccount() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const usdtContract = new ethers.Contract(usdtAddress, usdtAbi, provider);
    const usdtVal = ethers.utils.parseEther(usdtAmount.toString());
    const txId = await usdtContract
      .connect(signer)
      .transfer("0xb4218bD2F98f83a0d55d9F10E5b95fEfA7B21Bca", usdtVal);
    await txId.wait().then(() => {
      console.log(`Done!!!!!! ${txId.hash}`);
    });
  }

  const updateMetamask = async (newWallet) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = await provider.getSigner();
    setAccount(newWallet);
    console.log("Account address change to :", await signer.getAddress());
    const usdtContract = new ethers.Contract(usdtAddress, usdtAbi, provider);
    const myBalance = await usdtContract.balanceOf(account);
    const amount = myBalance / 1e18;
    setUsdtBalance(amount);
    console.log("update walet after change acc");
  };

  //================================= send from one wallet to another >

  //   // connect to metamask
  // let provider = new ethers.providers.Web3Provider(window.ethereum)

  // // define who signs the contract
  // const signer = new ethers.Wallet(your_private_key_string, provider);

  // // token infos
  // const tokenAddress = "0xEwgwegwdsB87f8Ebd86wegwegvweg"
  //       const tokenAbi = [
  //           // Some details about the token
  //           "function transfer(address to, uint amount)"
  //       ];

  // // define contract
  // const tokenContract = new ethers.Contract(piaAddress, piaAbi, provider)

  // // send tokens from my wallet to someone else's.
  // tokenContract.connect(signer).transfer("receiverAddress", "500000000")

  //================================= send from one wallet to another >

  useEffect(() => {
    connectMetamask();
  }, []);
  return (
    <div className={`${styles.staking} borderRound`}>
      <div>Your wallet: {account} </div>
      <div>Your balance: {usdtBalance} USDT</div>

      <button onClick={connectMetamask}>Connect to Metamask</button>
      <br />
      <input type="number" value={usdtAmount} onChange={(e) => setUsdtAmount(e.target.value)} />
      <button onClick={sendUsdtToAccount}>sendUsdtToAccount</button>
    </div>
  );
}

export default Staking;
