// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Lottery {
    address admin;

    // mapping (type1=>type2) name;

    constructor() {
        admin = msg.sender;
    }
}
