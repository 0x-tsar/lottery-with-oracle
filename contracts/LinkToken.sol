// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract LinkToken {
    IERC20 linkToken;

    constructor() {
        linkToken = IERC20(0xa36085F69e2889c224210F603D836748e7dC0088);
    }
}
