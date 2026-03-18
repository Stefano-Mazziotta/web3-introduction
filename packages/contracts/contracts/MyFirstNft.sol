// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract MyFirstNft is ERC721URIStorage, Ownable {
    uint256 private _nextTokenId;

    event NftMinted(address indexed to, uint256 indexed tokenId, string metadataUri);

    error InvalidRecipient();
    error EmptyMetadataUri();
    error InvalidInitialOwner();

    constructor(string memory name_, string memory symbol_, address initialOwner)
        ERC721(name_, symbol_)
    {
        if (initialOwner == address(0)) {
            revert InvalidInitialOwner();
        }

        transferOwnership(initialOwner);
    }

    function mintTo(address to, string calldata metadataUri) external onlyOwner returns (uint256) {
        if (to == address(0)) {
            revert InvalidRecipient();
        }

        if (bytes(metadataUri).length == 0) {
            revert EmptyMetadataUri();
        }

        uint256 tokenId = _nextTokenId;
        _nextTokenId += 1;

        _safeMint(to, tokenId);
        _setTokenURI(tokenId, metadataUri);

        emit NftMinted(to, tokenId, metadataUri);

        return tokenId;
    }
}
