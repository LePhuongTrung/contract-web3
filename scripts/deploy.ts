import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Signer } from "ethers";

async function main(hre: HardhatRuntimeEnvironment) {
    const [deployer]: Signer[] = await hre.ethers.getSigners();

    console.log("🚀 Deploying contracts with the account:", await deployer.getAddress());
    const balance = await hre.ethers.provider.getBalance(await deployer.getAddress());
    console.log("💰 Account balance:", balance.toString(), "BNB");

    const HelloWorldContract = await hre.ethers.getContractFactory("HelloWorld");
    const helloWorld = await HelloWorldContract.deploy();

    await helloWorld.waitForDeployment();

    const contractAddress = helloWorld.target;
    console.log("✅ HelloWorld contract deployed to:", contractAddress);

    if (hre.network.name === "bscTestnet" || hre.network.name === "bscMainnet") {
        console.log("⏳ Waiting for 5 blocks confirmation before verifying...");
        if (helloWorld.deploymentTransaction()) {
            await helloWorld.deploymentTransaction()!.wait(5);
        } else {
            console.warn("Deployment transaction not found, skipping wait for confirmations.");
        }

        console.log("🔎 Verifying contract on BscScan...");
        try {
            await hre.run("verify:verify", {
                address: contractAddress,
                constructorArguments: [],
            });
            console.log("🎉 Contract verified successfully on BscScan!");
        } catch (error: any) { // Type 'any' for caught error
            if (error.message.includes("Reason: Already Verified")) {
                console.log("⚠️ Contract is already verified on BscScan. Skipping verification.");
            } else {
                console.error("❌ Error verifying contract:", error);
            }
        }
    } else {
        console.log("Skipping verification. Not on BSC Testnet or Mainnet.");
    }
}

main(require("hardhat"))
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });