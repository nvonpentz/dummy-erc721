# Dummy ERC721
This repo contains the contracts and scripts for deploying an dummy ERC721 compliant contract for testing.

It's deployed to the Rinkeby testnet here: https://rinkeby.etherscan.io/address/0xF2c4BdB047720754E8dcE25dd5e0Fa9B5844e309.

In addition to normal ERC721 things, this contract allows you to update the token URI response for your NFT (see the updateTokenUri function - only the token owner can do this).

This allows you to test how different tokenURI responses are handled by your application, or how OpenSea renders your NFT (if you are an NFT developer). Basically this allows you to modify your NFT without having to deploy a new contract.


## Setup
1. Install `npm install`
1. Create and source a .env file using .env.example as template.

## Usage

### Local deploy
1. Launch a local blockchain with RPC endpoint at localhost:8545.  `npx hardhat node --network hardhat`
1. Deploy `npx hardhat run scripts/deploy.js --network hardhat`

### Local Test
```
npx hardhat test
```

### Deploy Rinkeby
```
npx hardhat run scripts/deploy.js --network rinkeby
```

### Verify Contract With Etherscan (for interface)
```
npx hardhat verify --network rinkeby 0xF2c4BdB047720754E8dcE25dd5e0Fa9B5844e309 DummyNFT DNFT ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/1817
```
