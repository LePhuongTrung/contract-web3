const {
    loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");

describe("HelloWorld", function () {
    async function deployHelloWorldFixture() {
        const [owner, otherAccount] = await ethers.getSigners();

        const HelloWorldContract = await ethers.getContractFactory("HelloWorld");
        const helloWorld = await HelloWorldContract.deploy();

        return { helloWorld, owner, otherAccount };
    }

    describe("sayHello", function () {
        it("Should deploy with the correct greeting", async function () {
            const { helloWorld } = await loadFixture(deployHelloWorldFixture);

            expect(await helloWorld.greeting()).to.equal("Hello World!");
        });

        it("Should return the correct greeting from sayHello function", async function () {
            const { helloWorld } = await loadFixture(deployHelloWorldFixture);

            expect(await helloWorld.sayHello()).to.equal("Hello World!");
        });
    });

    describe("setGreeting", function () {
        it("Should allow the owner to set a new greeting", async function () {
            const { helloWorld, owner } = await loadFixture(deployHelloWorldFixture);

            const newGreeting = "Xin chào!";
            await helloWorld.connect(owner).setGreeting(newGreeting);

            expect(await helloWorld.greeting()).to.equal(newGreeting);
        });

        it("Should revert if a non-owner tries to set the greeting", async function () {
            const { helloWorld, otherAccount } = await loadFixture(deployHelloWorldFixture);

            await expect(
                helloWorld.connect(otherAccount).setGreeting("Hacker message")
            ).to.be.revertedWith("Only the owner can set the greeting.");
        });
    });
});