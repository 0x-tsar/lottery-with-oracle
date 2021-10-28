// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Lottery {
    address admin;
    uint256 public nextId;

    constructor() {
        admin = msg.sender;
    }

    struct LotteryStructure {
        uint256 id;
        bool isOver;
        bytes name;
        uint256 finishDate;
        uint256 currentBalance;
        uint256 minBid;
        uint256 finalResult;
    }

    mapping(uint256 => LotteryStructure) public lotteries;
    mapping(uint256 => bytes) public idToName;
    mapping(bytes => uint256) public nameToId;

    function createLottery(bytes memory _name) external {
        lotteries[nextId] = LotteryStructure(
            nextId,
            false,
            _name,
            block.timestamp + 10 minutes,
            0,
            0.001 ether,
            0
        );

        idToName[nextId] = _name;
        nameToId[_name] = nextId;

        nextId++;
    }

    function enterOnLottery(bytes memory _name) external {
        //checking if is over
        require(
            !lotteries[nameToId[_name]].isOver,
            "This lottery is over! Check [FUNC] to check who is the winner"
        );
        //checking if exists, maybe redundant
        require(
            lotteries[nameToId[_name]].finalResult > 0,
            "This lottery does not exist"
        );

        //
    }
}
