// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Article {
    uint32 constant tagCount = 7;
    address owner;
    uint256[tagCount] public postCount;
    uint256 payPerInteraction = 1e18;

    mapping(uint256 => Post)[tagCount] public Posts;

    fallback() external payable {}
    receive() external payable{}
    constructor() payable {
        owner = msg.sender;
    }
    event post(
        address indexed from,
        string indexed newsLang,
        uint32 indexed tag,
        string headline,
        string content,
        uint256 timestamp
    );

    struct Post {
        uint id;
        address payable from;
        string newsLang; 
        uint32 tag; 
        string  headline; 
        string content;
        uint256 timestamp;
        uint256 rating;
        uint32 interactions;
        uint8 reports;
    }

    // * Functions for posting
    function postArticle(address payable from, string memory newsLang, uint32 tag, string memory headline, string memory content, uint256 rating) public {
        require(tag<tagCount && tag>=0, "Ivalid tag");

        Posts[tag][postCount[tag]] = Post(postCount[tag], from, newsLang, tag, headline, content, block.timestamp, rating, 0, 0);
        postCount[tag]++;
        
        emit post(from, newsLang, tag, headline, content, block.timestamp);
    }

    function withdraw(uint256 id, uint32 tag) payable public {
        Post memory current = Posts[tag][id];
        require(current.from == msg.sender, "You are not the owner of this post");

        Posts[tag][id].from.transfer(current.interactions*payPerInteraction);
    }

    function getPostByTags(uint32[] memory tags) payable public returns (Post memory result) {
        for(uint32 i=0; i<tags.length; i++)
            require(tags[i] < tagCount && tags[i] >=0, "Invalid tag");

        uint32 randTag;
        uint256 randIndex;
        do{
            uint32 random = uint32(uint(keccak256(abi.encodePacked(block.timestamp,block.difficulty, msg.sender))) % tags.length);
            randTag = tags[random];
        } while(postCount[randTag]==0);

        randIndex = uint(keccak256(abi.encodePacked(block.timestamp,block.difficulty, msg.sender))) % postCount[randTag];
        Posts[randTag][randIndex].interactions++;
        return Posts[randTag][randIndex];
    }

    // Function to fetch posts for user
    function getPostByID(uint256 id, uint32 tag) view public returns (Post memory result) {
        require(id>=0&&id<postCount[tag], "Invalid indices");
        return Posts[tag][id];
    }

    // Utility functions
    function includes(uint32 value, uint32[] memory array) private pure returns(bool) {
        for(uint32 i = 0; i<array.length; i++){
            if(value == array[i])
                return true;
        }
        return false;
    }
}
