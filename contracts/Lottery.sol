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
        uint256 totalTicketsSold;
    }

    mapping(uint256 => LotteryStructure) public lotteries;
    mapping(uint256 => bytes) public idToName;
    mapping(bytes => uint256) public nameToId;
    mapping(uint256 => mapping(uint256 => address)) eachTicket; //nextId,ticket number,address - the same address can buy more than one ticket

    function createLottery(bytes memory _name) external {
        lotteries[nextId] = LotteryStructure(
            nextId, //id
            false, //is over
            _name, //name
            block.timestamp + 10 minutes, //finish date
            0, //currentBalance
            0.001 ether, //min bid
            0, // final result
            0 //total tickets sold
        );

        idToName[nextId] = _name;
        nameToId[_name] = nextId;

        nextId++;
    }

    function redeemPrize(bytes memory _name) external {
        require(
            lotteries[nameToId[_name]].finishDate >= block.timestamp,
            "Lottery is not over Yet"
        );

        lotteries[nameToId[_name]].isOver = true;
        uint256 brutePrize = lotteries[nameToId[_name]].finalResult;
        lotteries[nameToId[_name]].finalResult = 0;
        payable(msg.sender).transfer(brutePrize);

        //GET THE RESULT FROM THE CHAINLINK FUNCTION HERE
    }

    function enterOnLottery(bytes memory _name, uint256 _ticketNumber)
        external
        payable
    {
        //checking if is over
        // require(
        //     !lotteries[nameToId[_name]].isOver,
        //     "This lottery is over! Check [FUNC] to check who is the winner"
        // );

        //check if time is up
        require(
            lotteries[nameToId[_name]].finishDate >= block.timestamp,
            "time is up!"
        );

        //checking if exists, maybe redundant
        require(
            lotteries[nameToId[_name]].finalResult > 0,
            "This lottery does not exist"
        );

        //checking if min bid is provided
        require(
            lotteries[nameToId[_name]].minBid >= 0.001 ether,
            "MININMAL BID WAS NOT MET!"
        );

        require(
            eachTicket[nameToId[_name]][_ticketNumber] != address(0),
            "This ticket was already taken"
        );

        lotteries[nextId].currentBalance += msg.value;
        lotteries[nextId].totalTicketsSold += 1;
        eachTicket[nextId][_ticketNumber] = msg.sender;

        // mapping(uint256 => mapping(uint256 => address)) eachTicket; //nextId,ticket number,address - the same address can buy more than one ticket
    }
}
