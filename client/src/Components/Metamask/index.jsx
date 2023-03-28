import { useEffect, useState } from "react";
import styles from "./Metamask.module.scss";
import detectEthereumProvider from "@metamask/detect-provider";
import { ethers } from "ethers";

function Metamask() {
  const [usdtAmount, setUsdtAmount] = useState(0);
  const [account, setAccount] = useState(null);
  const [usdtBalance, setUsdtBalance] = useState(0);
  const [metamaskInstall, setMetamaskInstall] = useState(false);

  console.log(usdtBalance);
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
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const [selectedAddress] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      const signer = provider.getSigner();

      console.log("Account address s:", await signer.getAddress());
      const usdtContract = new ethers.Contract(usdtAddress, usdtAbi, provider);
      const myBalance = await usdtContract.balanceOf(selectedAddress);
      const amount = myBalance / 1e18;
      setUsdtBalance(amount);

      setAccount(selectedAddress);
      //await getBalance();
      window.ethereum.on("accountsChanged", async ([newAddress]) => {
        console.log("account change");
        updateMetamask(newAddress);
        const usdtContract = new ethers.Contract(usdtAddress, usdtAbi, provider);
        const myBalance = await usdtContract.balanceOf(newAddress);
        const amount = myBalance / 1e18;
        setUsdtBalance(amount);
      });
    } catch (e) {
      console.log(e);
    }
  }

  const getBalance = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const usdtContract = new ethers.Contract(usdtAddress, usdtAbi, provider);
      const myBalance = await usdtContract.balanceOf(account);
      const amount = myBalance / 1e18;
      setUsdtBalance(amount);
      return amount;
    } catch (e) {
      console.log(e);
    }
  };
  // 4. Send Usdt to one account to another
  async function sendUsdtToAccount() {
    try {
      if (usdtAmount > usdtBalance) {
        alert("insurficient balance!");
        return;
      }
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
    } catch (e) {
      console.log(e);
    }
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

  const send_token = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    let private_key = "0eb5a18450dd12339960e0bf68cda5a02be3f2df2b7b6b5a89b07f89e36831ae";
    let send_token_amount = "1";
    let to_address = "0xc3e2cA2DFb6AfEB705234A909230e64eF0BaF778";
    let send_account = "0xb4218bD2F98f83a0d55d9F10E5b95fEfA7B21Bca";
    let gas_limit = "0x100000";
    let wallet = new ethers.Wallet(private_key);
    let walletSigner = wallet.connect(provider);
    let contract_address = "0x337610d27c682E347C9cD60BD4b3b107C9d34dDd";

    provider.getGasPrice().then((currentGasPrice) => {
      let gas_price = ethers.utils.hexlify(parseInt(currentGasPrice));
      console.log(`gas_price: ${gas_price}`);

      if (contract_address) {
        const send_abi = ["function transfer(address to, uint amount)"];
        // general token send
        let contract = new ethers.Contract(contract_address, send_abi, walletSigner);

        // How many tokens?
        let numberOfTokens = ethers.utils.parseUnits(send_token_amount, 18);
        console.log(`numberOfTokens: ${numberOfTokens}`);

        // Send tokens
        contract.transfer(to_address, numberOfTokens).then((transferResult) => {
          console.dir(transferResult);
          alert("sent token");
        });
      } // ether send
      else {
        const tx = {
          from: send_account,
          to: to_address,
          value: ethers.utils.parseEther(send_token_amount),
          //nonce: provider.getTransactionCount(send_account, "latest"),
          gasLimit: ethers.utils.hexlify(gas_limit), // 100000
          gasPrice: gas_price,
        };
        console.dir(tx);
        try {
          walletSigner.sendTransaction(tx).then((transaction) => {
            console.dir(transaction);
            alert("Send finished!");
          });
        } catch (error) {
          alert("failed to send!!");
        }
      }
    });
  };

  const detectMetamask = async () => {
    const provider = await detectEthereumProvider();
    if (provider) {
      setMetamaskInstall(true);
      console.log("install");
    } else {
      setMetamaskInstall(false);
      alert("Install metamask!");
    }
  };
  useEffect(() => {
    connectMetamask();
    detectMetamask();
  }, []);

  return (
    <div className={styles.payMthod_box}>
      <h3 className={styles.payHeader}>ПОПОЛНЕНИЕ</h3>
      <div className={styles.inputField}>
        <div className={styles.inputField_info}>
          Ваш кошелек (BSC): <span>{account} </span>{" "}
        </div>
        <div className={styles.inputField_info}>
          Ваш баланс: <span>{usdtBalance} USDT</span>
        </div>
        <label htmlFor="ass">Укажите сумму пополнения:</label>
        <input type="number" value={usdtAmount} onChange={(e) => setUsdtAmount(e.target.value)} />
        <span>USDT</span>
      </div>
      {metamaskInstall && (
        <button className={styles.submitPay} onClick={sendUsdtToAccount}>
          Одобрить пополнение USDT
        </button>
      )}
    </div>
  );
}

export default Metamask;
