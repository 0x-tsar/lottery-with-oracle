const RandomNumberConsumer = require("./contracts/RandomNumberConsumer.json");
const Lottery = require("./contracts/Lottery.json");
import Web3 from "web3";

export const loadEthereum = async () =>
  new Promise(async (resolve, reject) => {
    window.addEventListener("load", async () => {
      const web3 = await new Web3(window.ethereum);
      window.ethereum.enable();
      let chainId = await window.ethereum.networkVersion;

      if (chainId !== "42") {
        alert("change to 42 network");
      } else {
        const lottery = new web3.eth.Contract(
          Lottery.abi,
          Lottery.networks[chainId].address
        );

        window.ethereum.on("chainChanged", (change) => {
          console.log("change it");
          window.location.reload();
        });

        window.ethereum.on("accountsChanged", (change) => {
          window.location.reload();
        });

        resolve({ lottery, web3 });
      }
      resolve({ lottery: undefined, web3: undefined });
    });
  });
