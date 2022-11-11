// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
library Conversions {

    function etherToWei(uint valueEther) public pure returns (uint){
       return valueEther*(10**18);
    }

    function weiToEther(uint valueWei) public pure returns (uint){
       return valueWei/(10**18);
    }

    function etherToGWei(uint valueEther) public pure returns (uint){
       return valueEther*(10**9);
    }

    function gweiToEther(uint valueGwei) public pure returns (uint){
       return valueGwei/(10**9);
    }

    function weiToGwei(uint valueWei) public pure returns (uint){
        return valueWei/(10**9);
    }

    function gweiToWei(uint valueGwei) public pure returns (uint){
        return valueGwei*(10**9);
    }
}