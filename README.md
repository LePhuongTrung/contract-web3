# Smart Contract Project

This project is a Hardhat boilerplate for developing, testing, and deploying Solidity smart contracts on the Binance Smart Chain (BSC) and the local Hardhat network.

---

## Table of Contents

1.  [Introduction](#1-introduction)
2.  [Project Structure](#2-project-structure)
3.  [Setup](#3-setup)
4.  [Configuration](#4-configuration)
5.  [Useful Commands](#5-useful-commands)
6.  [Contract Deployment](#6-contract-deployment)
7.  [Contract Testing](#7-contract-testing)
8.  [Contact](#8-contact)

---

### 1. Introduction

This project leverages **Hardhat**, a professional Ethereum development environment, to build and manage smart contracts. It includes:
* **Solidity** for contract source code.
* **Hardhat Network** for a local development environment.
* **Hardhat Ignition** for reliable deployments.
* **Ethers.js** for blockchain interaction.
* **Chai** for writing tests.
* **dotenv** for managing environment variables.

---

### 2. Project Structure

* `contracts/`: Contains your Solidity smart contract source files (`.sol`).
* `scripts/`: Holds Hardhat scripts for deployment, interaction, or other custom tasks.
* `test/`: Contains your smart contract test files.
* `ignition/modules/`: Stores deployment modules for Hardhat Ignition.
* `hardhat.config.ts`: The main Hardhat configuration file.
* `.env`: This file contains sensitive environment variables (private keys, API keys).
* `.prettierrc.json`: Prettier configuration for code formatting.
* `.env.example`: A template file for `.env`.

---

### 3. Setup

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd contract-web3
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```

---

### 4. Configuration

1.  **Create a `.env` file:**
    Create a file named `.env` in the root of your project. You can copy from `.env.example` and fill in your details.

    ```
    PRIVATE_KEY=<Enter your private key here>
    ETHERSCAN_API_KEY=<Enter your Etherscan/BscScan API key here>
    BSC_TESTNET_URL=[https://data-seed-prebsc-1-s1.binance.org:8545](https://data-seed-prebsc-1-s1.binance.org:8545)
    BSC_MAINNET_URL=[https://bsc-dataseed.binance.org/](https://bsc-dataseed.binance.org/)
    ```

    * `PRIVATE_KEY`: The private key of the account you'll use for deployment (needs sufficient BNB for gas fees). **NEVER SHARE THIS!**
    * `ETHERSCAN_API_KEY`: Your API key from BscScan for contract verification (register at [bscscan.com/myapikey](https://bscscan.com/myapikey)). Hardhat typically uses this variable name for both Etherscan and BscScan.
    * `BSC_TESTNET_URL` / `BSC_MAINNET_URL`: RPC URLs for the BSC network. You can use the default URLs or replace them with other nodes.

2.  **Configure `hardhat.config.ts`:**
    Ensure your `hardhat.config.ts` is correctly set up for BSC Testnet/Mainnet networks and connects to your `.env` variables.

---

### 5. Useful Commands

Here are the commands you can run in your terminal from the project's root directory:

* **`npm run compile`**: Compiles all Solidity smart contracts in the `contracts/` directory.
* **`npm test`**: Runs all test files (`.ts` or `.js`) located in the `test/` directory.
* **`npm run node`**: Starts a local Hardhat Network. This is a simulated Ethereum blockchain running on your machine, which is fast and gas-free for development and testing.
* **`npm run clean`**: Deletes the `artifacts/` and `cache/` directories to clean up old compilation files.

---

### 6. Contract Deployment

This project supports both traditional deployment and deployment using Hardhat Ignition.

#### a. Traditional Deployment (Using `scripts/deploy.ts`)

Use the `scripts/deploy.ts` script to deploy your contract.

* **Deploy to BSC Testnet:**
    ```bash
    npm run deploy:testnet
    ```
* **Deploy to BSC Mainnet:**
    ```bash
    npm run deploy:mainnet
    ```
    **Warning:** Exercise extreme caution when deploying to Mainnet.

#### b. Hardhat Ignition Deployment (Using `ignition/modules/`)

Hardhat Ignition provides a more reliable way to deploy complex contracts.

* **Deploy `DeployDemo` module to the local network (demo):**
    ```bash
    npm run deploy:demo
    ```
    This command will run the `ignition/modules/DeployDemo.ts` module on `localhost` (Hardhat Network).

* **Deploy `HelloWorldModule` to BSC Testnet:**
    * Ensure you have the `ignition/modules/HelloWorldModule.ts` file with the discussed content.
    ```bash
    npx hardhat ignition deploy HelloWorldModule --network bscTestnet
    ```
    Hardhat Ignition will automatically manage compilation, deployment, waiting for confirmations, and contract verification on BscScan.

---

### 7. Contract Testing

* **Run all tests:**
    ```bash
    npm test
    ```
* **Run demo interaction test on the local network:**
    ```bash
    npm run test:demo
    ```
    This command is typically used to run interaction scripts or tests on the local network after a demo contract has been deployed.

---

### 8. Contact

If you have any questions or issues, please feel free to reach out.