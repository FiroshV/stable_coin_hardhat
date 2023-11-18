// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

interface AggregatorV3Interface {
  function decimals() external view returns (uint8);

  function latestRoundData()
    external
    view
    returns (
      uint80 roundId,
      int256 answer,
      uint256 startedAt,
      uint256 updatedAt,
      uint80 answeredInRound
    );
}

contract DataFeedMock is AggregatorV3Interface {
    int256 private price;
    uint8 private decimals_;

    constructor(int256 _price, uint8 _decimals) {
        decimals_ = _decimals;
        price = _price;
    }

    function setLatestRoundData(int256 _price) public {
        price = _price;
    }

    function setDecimals(uint8 _decimals) public {
        decimals_ = _decimals;
    }

    function latestRoundData()
        public
        view
        override
        returns (
            uint80, 
            int256, 
            uint256, 
            uint256, 
            uint80 
        )
    {
        return (0, price, 0, 0, 0);
    }

    function decimals() public view override returns (uint8) {
        return decimals_;
    }

}
