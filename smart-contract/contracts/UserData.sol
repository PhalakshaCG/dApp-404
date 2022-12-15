// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "./Conversions.sol";

contract UserData{
    address walletPrime;

    int defaultMinBalanceThreshold = 0;
    int defaultPenaltyVal = 0;

    uint256 public userCount = 0;

    struct User{
        address wallet;
        int balance;
        int brownie;
        int reputation;

        bool exists;
    }

    mapping (address => User) public Users;


    constructor() {
        walletPrime = msg.sender;
        populate();
    }

    /*function checkUser(address wallet) public view returns(bool){
        return bytes(Users[wallet]).length > 0 ? true : false;
    }*/

    function createNewUser() public {
        require(!Users[msg.sender].exists,"User already exists\n");
        Users[msg.sender].wallet=msg.sender;
        Users[msg.sender].exists=true;
        userCount++;
    }

    function deposit() payable public{}

    function fundUser() public payable {
        require(Users[msg.sender].exists,"User does not exist\n");
        deposit();
        Users[msg.sender].balance+=int(msg.value);
    }

    function checkUserBalance() public view returns(int){
        require(Users[msg.sender].exists,"User does not exist\n");
        return Users[msg.sender].balance;
    }

    function checkUserBalance(address user) public view returns(int){
        require(msg.sender == walletPrime,"Not admin");
        require(Users[user].exists,"User does not exist\n");
        return Users[user].balance;
    }

    function checkMinUserBalanceReq() public view returns(bool){
        require(Users[msg.sender].exists,"User does not exist\n");
        return Users[msg.sender].balance>=defaultMinBalanceThreshold;
    }

    function checkMinUserBalanceReq(int minUserBalanceReq) public view returns(bool){
        require(Users[msg.sender].exists,"User does not exist\n");
        return Users[msg.sender].balance>=minUserBalanceReq;
    }

    function penalize(address user) public{
        require(msg.sender == walletPrime,"Not admin");
        require(Users[user].exists,"User does not exist\n");
        Users[user].balance-=defaultPenaltyVal;
    }

    function penalize(address user,int penalty) public{
        require(msg.sender == walletPrime,"Not admin");
        require(Users[user].exists,"User does not exist\n");
        Users[user].balance-=penalty;
    }


    function populate() internal{
        createNewUser();
    }

}