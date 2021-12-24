# Lido contracts for Evmos testnet

## Install

0. Install npm
```
npm init
```

1. Install hardhat
```
npm install --save-dev hardhat
```

2. Install dependencies
```
npm install dotenv --save
npm install --save-dev @nomiclabs/hardhat-ethers 'ethers@^5.0.0'
```

After that you need add environments:
```
export PRIVATE_KEY=<PRIVATE_KEY>
export PUBLIC_KEY=<PUBLIC_KEY>
export API_URL=https://ethereum.rpc.evmos.dev
```

## Build contracts

```
npm run compile
```

## Deploy

### NFT Contract
```
npm run deploy_nft
```

### DEFI Contract
```
npm run deploy_staking
```

### DAO Contract

1. Change names for voting
2. Run deploy script:
```
npm run deploy_voting
```

## Usage

### NFT Contract

1. Change contract address in mint-nft.js:11
2. Change url with data for nft in mint-nft.js:54
3. Run script:
```
npm run mint_nft
```

### DEFI Contract
1. Change contract address in stake.js:10
2. Run script:
```
npm run stake
```

### DAO Contract
1. Change contract address in vote.js:10
2. Run script:
```
npm run vote
```