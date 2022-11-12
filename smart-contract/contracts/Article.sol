    // SPDX-License-Identifier: UNLICENSED
    pragma solidity ^0.8.9;

    contract Article {
        uint32 constant tagCount = 7;
        address private owner;
        uint256[tagCount] public postCount; // tag 0 reserved for reports
        uint256 public reportCount = 0;
        uint256 payPerInteraction = 1e6;
        uint256 penaltyPerInteraction = 1e12;

        mapping(uint256 => Post)[tagCount] public Posts;
        mapping(uint256 => Report) public Reports;

        fallback() external payable {}
        receive() external payable{}
        constructor() payable {
            owner = msg.sender;
        }
        event post(
            uint256 id,
            address indexed from,
            string indexed newsLang,
            uint32 indexed tag,
            string headline,
            string content,
            uint256 timestamp
        );

        event viewPost(
            uint256 indexed id,
            Post post
        );

        event refuteArticle(
            uint32 tag,
            uint256 id,
            uint penalty
        );

        struct Report {
            uint id;
            bool isArchived;
            uint8 reportPostTag;
            uint reportPostID;
            address[] confirmations;
            address[] refutations;
        }
        struct Post {
            uint id;
            bool isReportPost;
            bool truth;
            address payable from;
            string newsLang; 
            uint32 tag; 
            string  headline; 
            string content;
            uint256 timestamp;
            uint256 rating;
            uint32 interactions;
            uint256[] reports;
        }

        // *
        // * Functions for posting
        // *
        function postArticle(address payable from, string memory newsLang, uint32 tag, string memory headline, string memory content, uint256 rating) public returns (uint256 id) {
            require(tag<tagCount && tag>=0, "Ivalid tag");

            Posts[tag][postCount[tag]] = Post(
                postCount[tag],
                false,
                true,
                from, 
                newsLang, 
                tag, 
                headline, 
                content, 
                block.timestamp, 
                rating, 
                0, 
                new uint256[](10)
            );
            postCount[tag]++;
            
            emit post(postCount[tag]-1, from, newsLang, tag, headline, content, block.timestamp);
            return postCount[tag]-1;
        }

        function withdraw(uint256 id, uint32 tag) payable public {
            Post memory current = Posts[tag][id];
            require(current.from == msg.sender, "You are not the owner of this post");
            require(Posts[tag][id].truth, "This post has been flagged false");
            Posts[tag][id].from.transfer(current.interactions*payPerInteraction);
            current.interactions=0;
        }

        function getPostByTag(uint32 tag) public returns (Post memory) {
            require(tag < tagCount && tag >=0, "Invalid tag");
            require(postCount[tag]>0);
            uint256 randIndex;
            randIndex = uint(keccak256(abi.encodePacked(block.timestamp,block.difficulty, msg.sender))) % postCount[tag];
            Posts[tag][randIndex].interactions++;
            return Posts[tag][randIndex];
        }

        // Function to fetch posts for user
        function getPostByID(uint256 id, uint32 tag) view public returns (Post memory result) {
            require(id>=0&&id<postCount[tag], "Invalid indices");
            return Posts[tag][id];
        }

        // Report
        function reportArticle(uint8 reportPostTag, uint256 reportPostID,address payable from, string memory newsLang, string memory headline, string memory content, uint256 rating) public {
            require(rating>85e6,"Rating must be greater than 85%");

            Posts[0][reportCount] = Post(
                reportCount,
                true,
                true,
                from, 
                newsLang, 
                0, 
                headline, 
                content, 
                block.timestamp, 
                rating, 
                0, 
                new uint256[](10)
            );

            Reports[reportCount] = Report(
                reportCount,
                false,
                reportPostTag,
                reportPostID,
                new address[](0),
                new address[](0)
            );
            Posts[reportPostTag][reportPostID].reports.push(reportCount);
            reportCount++;

            emit post(reportCount - 1, from, newsLang, 0, headline, content, block.timestamp);
        }

        function confirmReport(uint256 id) public {
            // require(msg.sender!=Posts[0][id].from);
            // require(!includes(msg.sender, Reports[id].confirmations), "You have already confirmed");
            require(!Reports[id].isArchived, "Report is refuted and archived");
            Reports[id].confirmations.push(msg.sender);
            if(Reports[id].confirmations.length==10){
                uint penalty = penaltyPerInteraction*Posts[Reports[id].reportPostTag][Reports[id].reportPostID].interactions;
                emit refuteArticle(
                    Reports[id].reportPostTag,
                    Reports[id].reportPostID,
                    penalty
                );
                Posts[Reports[id].reportPostTag][Reports[id].reportPostID].truth = false;
            }
        }

        function refuteReport(uint256 id) public {
            require(!includes(msg.sender, Reports[id].refutations));
            Reports[id].refutations.push(msg.sender);
            if(Reports[id].refutations.length==10){
                uint penalty = penaltyPerInteraction*Posts[0][id].interactions;
                emit refuteArticle(
                    0,
                    id,
                    penalty
                );
                Posts[0][id].truth = false;
                Reports[id].isArchived = true;
            }
        }

        function viewConfirmations(uint256 id) public view returns(address[] memory){
            return Reports[id].confirmations;
        }
        // Utility functions
        function includes(address value,address[] memory array) private pure returns(bool) {
            for(uint32 i = 0; i<array.length; i++){
                if(value == array[i])
                    return true;
            }
            return false;
        }
    }
