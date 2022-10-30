// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Article {
    uint256 public postCount = 0;
    event post(
        address indexed from,
        string indexed newsLang,
        uint32[] indexed tags,
        string headline,
        string content,
        uint256 timestamp
    );

    struct Post {
        uint id;
        address from;
        string newsLang; 
        uint32[] tags; 
        string  headline; 
        string content;
        uint256 timestamp;
    }

    mapping(uint256 => Post) public Posts;

    function postNewsArticle(address from, string memory newsLang, uint32[] memory tags, string memory headline, string memory content) public {
        Posts[postCount] = Post(postCount, from, newsLang, tags, headline, content, block.timestamp);
        postCount++;
        emit post(from, newsLang, tags, headline, content, block.timestamp);
    }

    function getPostsByTags(uint32[] memory tags, uint32 count) view public returns (Post[] memory) {
        Post[] memory result = new Post[](count);
        uint32 added=0;
        for(uint256 i=0;i<postCount && added<count;i++){
            for(uint16 j=0;j<Posts[i].tags.length;j++){
                bool found = false;
                uint32 tag = Posts[i].tags[j];
                for(uint16 k=0;k<tags.length;k++){
                    if(tag==tags[k]){
                        found = true;
                        break;
                    }
                }
                if(found){
                    result[added]=Posts[i];
                    added++;
                    break;
                }
            }
        }
        return result;
    }
}
