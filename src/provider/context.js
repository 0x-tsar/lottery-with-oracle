import React, { useState, createContext, useEffect } from "react";
import { loadEthereum } from "../ethereum";

export const AuthContext = createContext({});

export const AuthProvider = (props) => {
  const [info, setInfo] = useState([]);
  const [web3, setWeb3] = useState(undefined);
  const [lottery, setLottery] = useState(undefined);

  useEffect(() => {
    const done = async () => {
      const { lottery, web3 } = await loadEthereum();
      const account = web3.givenProvider.selectedAddress;

      if (lottery && web3) {
        // setTimeout(async () => {
        //   console.log("called");
        //   const value = await web3.utils.toWei("0.01");

        //   const tx = await lottery.methods.createLottery("one").send({
        //     from: account,
        //     value: value,
        //   });

        //   console.log(tx);
        // }, 5000);

        lottery.events
          .evCreateLottery({
            fromBlock: 0,
          })
          .on("data", async function (event) {
            console.log("ok");
            console.log(event.returnValues);
            // Do something here
          })
          .on("error", console.error);
      } else {
        console.log(error);
      }
    };
    done();
  }, []);

  return (
    <AuthContext.Provider
      value={{ info, web3, lottery, setInfo, setWeb3, setLottery }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
