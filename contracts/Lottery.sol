// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Lottery {
    address admin;
    uint256 public nextId;

    constructor() {
        admin = msg.sender;
    }

    event evWinner(address winner, uint256 amount, uint256 timestamp);
    event evCreateLottery(bytes name, uint256 prize, uint256 timestamp);

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

    function createLottery(bytes memory _name) external payable {
        require(
            msg.value >= 0.001 ether,
            "value must be equal or higher than 0.1 eth"
        );
        lotteries[nextId] = LotteryStructure(
            nextId, //id
            false, //is over
            _name, //name
            block.timestamp + 10 minutes, //finish date
            msg.value, //currentBalance
            0.001 ether, //min bid
            0, // final result
            0 //total tickets sold
        );

        idToName[nextId] = _name;
        nameToId[_name] = nextId;

        nextId++;

        emit evCreateLottery(_name, msg.value, block.timestamp);
    }

    function redeemPrize(bytes memory _name) external {
        require(
            lotteries[nameToId[_name]].finishDate >= block.timestamp,
            "Lottery is not over Yet"
        );

        //GET THE RESULT FROM THE CHAINLINK FUNCTION HERE

        require(
            eachTicket[nameToId[_name]][
                lotteries[nameToId[_name]].finalResult
            ] == msg.sender,
            "YOU ARE NOT THE WINNER"
        );

        lotteries[nameToId[_name]].isOver = true;
        uint256 brutePrize = lotteries[nameToId[_name]].finalResult;
        // lotteries[nameToId[_name]].finalResult = 0; //dont need to set the chosen number to 0
        payable(msg.sender).transfer(brutePrize);

        emit evWinner(msg.sender, brutePrize, block.timestamp);
    }

    function isOver(bytes memory _name) external view returns (bool) {
        return lotteries[nameToId[_name]].finishDate >= block.timestamp;
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
    }
}
