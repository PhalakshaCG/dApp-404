// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Article {
    event post(
        address indexed from,
        string indexed newsLang,
        string[] indexed tags,
        string headline,
        string content,
        uint256 timestamp
    );

    function postNewsArticle(address from, string memory newsLang, string[] memory tags, string memory headline, string memory content) public {
        emit post(from, newsLang, tags, headline, content, block.timestamp);
    }
}
