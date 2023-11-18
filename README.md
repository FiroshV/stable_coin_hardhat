
# nUSDStablecoin Hardhat Project

## Introduction

`nUSDStablecoin` is a Solidity-based smart contract for creating a stablecoin pegged to the value of ETH. It integrates with Chainlink oracles for accurate, real-time ETH price data and adheres to the ERC20 token standard.

## Features

- ERC20 token standard implementation.
- Real-time ETH price fetching using Chainlink oracles.
- Functions for depositing ETH, minting nUSD, and redeeming nUSD for ETH.

## Prerequisites

- Node.js installed on your system.
- npm or Yarn for managing packages.
- An Ethereum wallet with Ethereum and SEPOLIA testnet ETH.
- SEPOLIA RPC URL from a provider like Infura or Alchemy.

## Installation

1. Clone the project repository.
2. Install dependencies:
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```
3. Set up a `.env` file in the root directory with the following contents:
   ```
   SEPOLIA_PRIVATE_KEY=Your_Sepolia_Private_Key
   SEPOLIA_RPC_URL=Your_Sepolia_RPC_URL
   ```

## Compilation

Compile the smart contract using Hardhat:
```bash
npx hardhat compile
```

## Testing

To test the smart contract, run:
```bash
npx hardhat test ./test/nUSDStablecoin.test.js
```

## Deployment

Deploy the contract to the SEPOLIA testnet:
```bash
npx hardhat run scripts/deploy.js --network sepolia
```

## Security and Usage Notes

- The project is for demonstration and should be used with caution in production.
- Keep your private keys secure and never share them.

