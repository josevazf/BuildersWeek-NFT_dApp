//SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "../node_modules/hardhat/console.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract BWminter is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;

	uint8 public toMint;
	uint256 public endTime;

	mapping(address => bool) public isAlreadyMinted;
    
    constructor() ERC721("Builders Week 2023", "BW23") {
        console.log("Contract has been deployed!");
		endTime = block.timestamp + 30 days;
		toMint = 123;
    }

    // Presale mint
    function mintNFT(string memory tokenURI) public {
		require(block.timestamp < endTime, "Time to mint has ended!");
		require(toMint > 0, "Sold out! All NFTs have been minted.");
		require(!isAlreadyMinted[msg.sender], "You have already minted your NFT...");
        _mintSingleNFT(tokenURI);

		isAlreadyMinted[msg.sender] = true;
		toMint--;
    }

    function _mintSingleNFT(string memory URI) private {
        uint256 newTokenID = _tokenIds.current();
        _mint(msg.sender, newTokenID);
        _setTokenURI(newTokenID, URI);
        _tokenIds.increment();
    }

    function withdraw() public {
		require(msg.sender == owner(), "Sorry you are not the owner...");
        (bool ok, ) = msg.sender.call{value: viewBalance()}("");
		require(ok);
	}

	function viewBalance() public view returns (uint256) {
		return address(this).balance;
	}

	receive() external payable {}
}
