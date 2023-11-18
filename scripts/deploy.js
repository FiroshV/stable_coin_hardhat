
const hre = require("hardhat");

async function main() {
 // dataFeedAddress for Sepolia chain
 const dataFeedAddress = "0x694AA1769357215DE4FAC081bf1f309aDC325306"; 
  const Stablecoin = await hre.ethers.getContractFactory("nUSDStablecoin");
  const stablecoin = await Stablecoin.deploy(dataFeedAddress);

  await stablecoin.deployed();

  console.log("Stablecoin deployed to:", stablecoin.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
