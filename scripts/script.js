const Random = artifacts.require("RandomNumberConsumer");
const LinkToken = artifacts.require("LinkToken");

module.exports = async () => {
  try {
    const [account] = await web3.eth.getAccounts();
    const vrn = await Random.deployed();
    const LINK_ABI = [
      {
        constant: true,
        inputs: [],
        name: "name",
        outputs: [
          {
            name: "",
            type: "string",
          },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: false,
        inputs: [
          {
            name: "_spender",
            type: "address",
          },
          {
            name: "_value",
            type: "uint256",
          },
        ],
        name: "approve",
        outputs: [
          {
            name: "",
            type: "bool",
          },
        ],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        constant: true,
        inputs: [],
        name: "totalSupply",
        outputs: [
          {
            name: "",
            type: "uint256",
          },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: false,
        inputs: [
          {
            name: "_from",
            type: "address",
          },
          {
            name: "_to",
            type: "address",
          },
          {
            name: "_value",
            type: "uint256",
          },
        ],
        name: "transferFrom",
        outputs: [
          {
            name: "",
            type: "bool",
          },
        ],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        constant: true,
        inputs: [],
        name: "decimals",
        outputs: [
          {
            name: "",
            type: "uint8",
          },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: true,
        inputs: [
          {
            name: "_owner",
            type: "address",
          },
        ],
        name: "balanceOf",
        outputs: [
          {
            name: "balance",
            type: "uint256",
          },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: true,
        inputs: [],
        name: "symbol",
        outputs: [
          {
            name: "",
            type: "string",
          },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: false,
        inputs: [
          {
            name: "_to",
            type: "address",
          },
          {
            name: "_value",
            type: "uint256",
          },
        ],
        name: "transfer",
        outputs: [
          {
            name: "",
            type: "bool",
          },
        ],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        constant: true,
        inputs: [
          {
            name: "_owner",
            type: "address",
          },
          {
            name: "_spender",
            type: "address",
          },
        ],
        name: "allowance",
        outputs: [
          {
            name: "",
            type: "uint256",
          },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        payable: true,
        stateMutability: "payable",
        type: "fallback",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            name: "owner",
            type: "address",
          },
          {
            indexed: true,
            name: "spender",
            type: "address",
          },
          {
            indexed: false,
            name: "value",
            type: "uint256",
          },
        ],
        name: "Approval",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            name: "from",
            type: "address",
          },
          {
            indexed: true,
            name: "to",
            type: "address",
          },
          {
            indexed: false,
            name: "value",
            type: "uint256",
          },
        ],
        name: "Transfer",
        type: "event",
      },
    ];

    const linkToken = new web3.eth.Contract(
      LINK_ABI,
      "0xa36085F69e2889c224210F603D836748e7dC0088"
    );

    // const tx = await vrn.getRandomNumber();
    // console.log(tx);

    let randomResult = await vrn.randomResult.call();
    console.log(parseFloat(randomResult));
    // console.log(BigInt(randomResult).toString());
    console.log(BigInt(randomResult).toString().slice(0, 2));

    // console.log(vrn.address);
    // console.log(await linkToken.methods.balanceOf(account).call());
    // console.log(account);
    // console.log(linkToken);
    // const tx = await vrn.getRandomNumber();
    // console.log(tx);

    // await vrn.getRandomNumber();
    // const random = await vrn.randomResult.call();
    // console.log(random.words[0]);

    // console.log(random);

    // console.log(await linkToken.methods.balanceOf(vrn.address).call());
    // console.log(
    //   await linkToken.methods
    //     .balanceOf("0xa36085F69e2889c224210F603D836748e7dC0088")
    //     .call()
    // );

    // console.log(await linkToken.methods.name().call());
    // console.log(await linkToken.methods.name().call());
    // const [account, account2, account3, _] = await web3.eth.getAccounts();
    // console.log(`account ${account}`);

    // const random = await vrn.getRandomNumber();
    // console.log(random);

    // const number = await vrn.randomResult.call();
    // console.log(number.words);

    // const value = web3.utils.toWei("1");

    // const accruedFeesContract = await cards.retrieveFunds({ from: account });
    // const totalFundsCollected = await cards.totalFundsCollected();
    // console.log(parseInt(totalFundsCollected));
  } catch (e) {
    console.log(e);
  }
};
