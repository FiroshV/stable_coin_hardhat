const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("nUSDStablecoin Contract", function () {
    let nUSDStablecoin, dataFeedMock;
    let owner, addr1, addr2;
    const initialPrice = ethers.utils.parseUnits("2000", "ether"); 

    before(async function () {
        [owner, addr1, addr2] = await ethers.getSigners();

        // Deploy the DataFeedMock contract
        const DataFeedMock = await ethers.getContractFactory("DataFeedMock");
        dataFeedMock = await DataFeedMock.deploy(initialPrice, 18); 
        await dataFeedMock.deployed();

        // Deploy the nUSDStablecoin contract
        const NUSDStablecoin = await ethers.getContractFactory("nUSDStablecoin");
        nUSDStablecoin = await NUSDStablecoin.deploy(dataFeedMock.address);
        await nUSDStablecoin.deployed();
    });

    describe("Deployment", function () {
        it("Should set the right owner", async function () {
            expect(await nUSDStablecoin.owner()).to.equal(owner.address);
        });

        it("Should have the correct name and symbol", async function () {
            expect(await nUSDStablecoin.name()).to.equal("nUSD Stablecoin");
            expect(await nUSDStablecoin.symbol()).to.equal("nUSD");
        });
    });

    describe("ETH Deposit and nUSD Minting", function () {
        it("Should mint nUSD upon ETH deposit", async function () {
            const depositAmount = ethers.utils.parseEther("1");
            await nUSDStablecoin.connect(addr1).depositETH({ value: depositAmount });
            const nUSDBalance = await nUSDStablecoin.balanceOf(addr1.address);
            expect(nUSDBalance).to.equal(depositAmount.mul(initialPrice).div(ethers.utils.parseUnits("2", "ether")));
        });
    });

    describe("nUSD Redemption and ETH Withdrawal", function () {
        it("Should burn nUSD and transfer ETH back to the user", async function () {
            const nUSDAmount = await nUSDStablecoin.balanceOf(addr1.address);
            await nUSDStablecoin.connect(addr1).redeemETH(nUSDAmount);
            const newBalance = await nUSDStablecoin.balanceOf(addr1.address);
            expect(newBalance).to.equal(0);
        });
    });


    describe("Total nUSD Supply", function () {
        it("Should initially have a total supply of 0", async function () {
            const totalSupply = await nUSDStablecoin.getTotalnUSDSupply();
            expect(totalSupply).to.equal(0);
        });

        it("Should reflect the correct total supply after minting nUSD", async function () {
            // Assuming depositETH mints nUSD tokens
            const depositAmount = ethers.utils.parseEther("1");
            await nUSDStablecoin.connect(addr1).depositETH({ value: depositAmount });
            const expectedSupply = depositAmount.mul(initialPrice).div(ethers.utils.parseUnits("2", "ether"));
            const totalSupply = await nUSDStablecoin.getTotalnUSDSupply();
            expect(totalSupply).to.equal(expectedSupply);
        });

        // Optional: Test for supply after burning tokens
        it("Should decrease the total supply after nUSD tokens are burned", async function () {
            const nUSDAmount = await nUSDStablecoin.balanceOf(addr1.address);
            await nUSDStablecoin.connect(addr1).redeemETH(nUSDAmount);
            const totalSupplyAfterBurn = await nUSDStablecoin.getTotalnUSDSupply();
            expect(totalSupplyAfterBurn).to.equal(0);
        });
    });
});
