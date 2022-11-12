// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Advertise{

    address walletPrime;
    uint numTags = 0;

    uint256 public adsCount = 0;

    struct Ad {
        uint id;
        address adOwner;
        uint32 tag; 
        string  title; 
        string content;
        uint256 timestamp;
        uint256 impressions;
        uint256 remainingViewsPaidFor;
    }

    //mapping(uint256 => Ad) public Ads;

    string[] public Tags;
    //mapping (uint => string) Tags;
    mapping (uint => uint) numAdsInTag;
    mapping (uint => mapping(uint => Ad)) public Ads;

    constructor() {
        walletPrime = msg.sender;
        populate();
    }

    function createNewTag(string memory tagName) internal{
        bool found=false;
        for(uint32 i=1; i<numTags; i++){
            if(keccak256(abi.encodePacked((Tags[i]))) == keccak256(abi.encodePacked((tagName)))){
                found=true;
            }
        }
        if(!found){
            Tags.push(tagName);
            numAdsInTag[numTags]=0;
            numTags++;
        }
    }

    function makeNewAd(uint32 tag, string memory title, string memory content) public {
        
        require(tag<numTags && tag >=0,"Tag Invalid");
        Ads[tag][numAdsInTag[tag]++] = Ad(adsCount, msg.sender, tag, title, content, block.timestamp,0,0);
        adsCount++;
        
    }

    function deposit() payable public{}

    function fundAd(uint tag,uint id) public payable {
        require(tag<numTags && tag >=0,"Tag Invalid");
        require(numAdsInTag[tag]>id,"Ad not found");
        require(Ads[tag][id].adOwner==msg.sender,"You are not the Ad owner");
        require(weiToGwei(msg.value)>=1,"Insufficient amount");
        deposit();
        Ads[tag][id].remainingViewsPaidFor+=weiToGwei(msg.value);
    }

    function balanceOf() public view returns(uint) {
        return address(this).balance;
    }

    function getAdByID(uint tag,uint id) public view returns(Ad memory){
        require(tag<numTags && tag >=0,"Tag Invalid");
        require(numAdsInTag[tag]>id,"Ad not found");
        require(Ads[tag][id].adOwner==msg.sender,"You are not the Ad owner");
        return Ads[tag][id];
    }


    function getRandAdByTag(uint32[] memory tags) public returns(Ad memory){
        for(uint32 i=0; i<tags.length; i++)
            require(tags[i]<numTags && tags[i] >=0,"Invalid tags");
        

        uint randTagIndex = uint32(uint(keccak256(abi.encodePacked(block.timestamp,block.difficulty, msg.sender))) % tags.length);
        uint randTag = tags[randTagIndex];

        uint count= 0;

        bool found = false;

        Ad memory result = Ad(0, walletPrime, 0, "Checkmate", "Thank for using Checkmate. Please help us with donations", block.timestamp,0,0);


        while(!found && count < tags.length){
            
            while(count < tags.length && numAdsInTag[randTag]==0){
                randTagIndex =( randTagIndex + 1 ) % tags.length;
                randTag = tags[randTagIndex];
                count++;
            }
            if(count >= tags.length){
                break;
            }
            
            uint randIndex = uint(keccak256(abi.encodePacked(block.timestamp,block.difficulty, msg.sender))) % numAdsInTag[randTag];
            
            
            for(uint i = 0 ; i<numAdsInTag[randTag] && !found ; i++){
                if(Ads[randTag][randIndex].remainingViewsPaidFor>0){
                    found=true;
                    result=Ads[randTag][randIndex];
                    Ads[randTag][randIndex].impressions++;
                    Ads[randTag][randIndex].remainingViewsPaidFor--;
                }

                randIndex = (randIndex + 1 )%numAdsInTag[randTag];
            }


            randTagIndex =( randTagIndex + 1 ) % tags.length;

            count++;
        }

        return result;

    }

    function fetchAllTags() public view returns(string[] memory){
        return Tags;
    }


    function makeNewDummyAd (uint32 tag, string memory title,uint256 impressions, string memory content) internal{
        makeNewAd(tag,title,content);
        Ads[tag][numAdsInTag[tag]-1].impressions=impressions;
    } 

    function populate() internal{

        createNewTag("Education");
        createNewTag("Fashion");
        createNewTag("Sports");
        createNewTag("Appliances");

        makeNewDummyAd(0,"BIJU EdTech",600,"<div><div id=\"animation_container\" style=\"background-color:rgba(255, 255, 255, 1.00); width:300px; height:250px\"><canvas height=\"312\" id=\"canvas\" style=\"position: absolute; display: block; background-color: rgb(255, 255, 255); width: 300px; height: 250px;\" width=\"375\"></canvas><div id=\"dom_overlay_container\" style=\"pointer-events:none; overflow:hidden; width:300px; height:250px; position: absolute; left: 0px; top: 0px; display: block;\"></div></div></div>");
        makeNewDummyAd(1,"Starlight",6000,"<div><div class=\"image\"><img src=\"https://cdn.myanimelist.net/resources/mxj_panel/2022/20221104_writingcontest.png\"></div></div>");
        makeNewDummyAd(2,"Khilla Bats",70000,"<div><div class=\"rightrail--promo rightrail--promo\"><a class=\"rightrail--promo__details\" target=\"_self\" href=\"/events/tc-sessions-crypto-2022/?promo=rightnav&amp;display=true\"><div class=\"rightrail--promo__details-left\"><div class=\"gradient-text gradient-text--green-gradient\"><h2 class=\"rightrail--promo__details-left__title gradient-text\">TechCrunch Sessions: Crypto</h2></div></div><div class=\"rightrail--promo__details-right\"><div class=\"rightrail--promo__details-right__location\">Miami, Florida November 17</div></div></a><a class=\"button button--black button--secondary\" target=\"_self\" href=\"/events/tc-sessions-crypto-2022/?promo=rightnav&amp;display=true\">Register Now</a></div></div>");
        makeNewDummyAd(2,"CricStar",200,"<div><canvas id=\"canvas\" width=\"375\" height=\"312\" style=\"position: absolute; display: block; background-color: rgb(255, 255, 255); width: 300px; height: 250px;\"></canvas></div>");
    }
    
    //Utils
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