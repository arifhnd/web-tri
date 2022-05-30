// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract WavePortal {
    // Ini adalah state variable, nilai ini akan disimpan secara permanen pada contract storage
    uint256 totalWaves;
    string message;

    constructor() {
        console.log("Hello, World!");
    }

    function wave(string memory payloadMessage) public {
        message = payloadMessage;
        totalWaves++;
        // msg.sender adalah alamat dari pemilik yang memanggil fungsi ini
        console.log("%s has waved!", msg.sender);
    }

    function getTotalWaves() public view returns (uint256) {
        console.log("Total waves: %d", totalWaves);
        return totalWaves;
    }

    function getMessage() public view returns (string memory) {
        console.log("Message from waver: %s", message);
        return message;
    }
}