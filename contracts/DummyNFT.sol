//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/access/Ownable.sol';
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";


contract DummyNFT is ERC721, Ownable {
    using Counters for Counters.Counter;

    // Counter to keep track of which token ID is next
    Counters.Counter private tokenIds;

    // Token URI assigned on mint
    string private defaultUri;

    // Maps token ID to the URI it returns
    mapping(uint => string) private uris;

    modifier onlyTokenOwner(uint256 tokenId) {
        require(msg.sender == ERC721.ownerOf(tokenId), 'Only token owner can perform this action.');
        _;
    }

    constructor(
        string memory name_,
        string memory symbol_,
        string memory defaultUri_
    ) ERC721(name_, symbol_) {
        defaultUri = defaultUri_;
    }

    function mint(address recipient) external returns (uint) {
        tokenIds.increment();
        uint tokenId = tokenIds.current();
        _safeMint(recipient, tokenId);
        uris[tokenId] = defaultUri;
        return tokenId;
    }

    function tokenURI(uint tokenId)
        public
        view
        override
        returns (string memory)
    {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token!");
        return uris[tokenId];
    }

    function updateDefaultTokenUri(string memory uri) external onlyOwner {
        defaultUri = uri;
    }

    function updateTokenUri(uint256 tokenId, string memory uri) external onlyTokenOwner(tokenId) {
        uris[tokenId] = uri;
    }
}
