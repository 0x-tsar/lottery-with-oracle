// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Lottery {
    address admin;

    //structure with time limit, (few minutes)

    struct LotteryStructure {
        uint256 prize;
        bool isOver;
    }

    mapping(type1 => type2) name;

    constructor() {
        admin = msg.sender;
    }
}
