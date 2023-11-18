// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract nUSDStablecoin is ERC20 {
    AggregatorV3Interface internal dataFeed;
    address public owner;

    // Setting the initial name and symbol for the nUSD token
    constructor(address _dataFeed) ERC20("nUSD Stablecoin", "nUSD") {
        dataFeed = AggregatorV3Interface(_dataFeed);
        owner = msg.sender;
    }

    // Modifier to restrict certain functions to the contract owner
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    // Function to get the latest ETH price from Chainlink Oracle
    function getLatestETHPrice() internal view returns (uint256) {
        (, int answer, , , ) = dataFeed.latestRoundData();
        uint8 decimals = dataFeed.decimals();
        return uint256(answer) * 10**(18-decimals); // Adjusting to 18 decimal places
    }

    // Function to deposit ETH and mint nUSD
    function depositETH() public payable {
        uint256 ethPrice = getLatestETHPrice();
        uint256 nUSDAmount = (msg.value * ethPrice) / (2 * 10**18); // Adjusting for 18 decimal places
        _mint(msg.sender, nUSDAmount);
    }

    // Function to redeem nUSD for ETH
    function redeemETH(uint256 nUSDAmount) public {
        require(balanceOf(msg.sender) >= nUSDAmount, "Insufficient nUSD balance");
        uint256 ethPrice = getLatestETHPrice();
        uint256 ethAmount = (nUSDAmount * 10**18) / (2 * ethPrice); // Adjusting for 18 decimal places
        _burn(msg.sender, nUSDAmount);
        payable(msg.sender).transfer(ethAmount);
    }

    // Function to get the contract's ETH balance
    function getETHBalance() public view returns (uint256) {
        return address(this).balance;
    }

    // Public view function to get the total nUSD supply
    function getTotalnUSDSupply() public view returns (uint256) {
        return totalSupply(); // Provided by ERC20 implementation
    }
}
