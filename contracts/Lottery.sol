// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Lottery {
    address admin;
    uint256 public nextId;

    //structure with time limit, (few minutes)
    struct LotteryStructure {
        uint256 id;
        bool isOver;
        bytes name;
        uint256 finishTime;
        uint256 currentBalance;
        uint256 minBid;
    }

    mapping(uint256 => LotteryStructure) lotteries;

    constructor() {
        admin = msg.sender;
    }
}
