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
        const cards = new web3.eth.Contract(
          Cards.abi,
          Cards.networks[chainId].address
        );

        window.ethereum.on("chainChanged", (change) => {
          console.log("change it");
          window.location.reload();
        });

        window.ethereum.on("accountsChanged", (change) => {
          window.location.reload();
        });

        resolve({ cards, web3 });
      }
      resolve({ cards: undefined, web3: undefined });
    });
  });
