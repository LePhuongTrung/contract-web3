import { ethers } from "hardhat";

async function main() {
    const contractAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";

    const HelloWorldFactory = await ethers.getContractFactory("HelloWorld");

    const helloWorld = HelloWorldFactory.attach(contractAddress);

    console.log("--- Interacting with HelloWorld Contract ---");

    const initialGreeting = await helloWorld.greeting();
    console.log(`Initial greeting value: "${initialGreeting}"`);

    const helloMessage = await helloWorld.sayHello();
    console.log(`Result from sayHello(): "${helloMessage}"`);

    console.log("\nCalling setGreeting('Hello from Hardhat!')...");
    const tx = await helloWorld.setGreeting("Hello from Hardhat!");
    await tx.wait();
    console.log("Greeting successfully changed.");

    const newGreeting = await helloWorld.greeting();
    console.log(`New greeting value: "${newGreeting}"`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });