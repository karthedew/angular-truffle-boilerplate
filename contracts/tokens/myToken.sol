// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Burnable.sol";

contract myToken is ERC20, ERC20Burnable {

    // NOTE: Rename to DittoEther with Symbol dEth

    address owner;

    // --- SETUP YOUR EVENTS ---
    event Mint(address indexed to, uint256 amount);

    // --- CALLBACK FUNCTION ---
    receive() external payable {}

    // --- THE CONSTRUCTOR ---
    constructor() ERC20("DittoEth", "dEth") {
        owner = msg.sender;
        _mint(msg.sender, 1000);
    }


    function deposit() minimumAmount external payable {
        // STEP 1 - Validate Sender

        uint256 tt = 20 * 10**18;

        // STEP 2 - Mint tokens equivalent to ETH sent.
        _mint(msg.sender, tt);
        emit Mint(msg.sender, msg.value);
        // STEP 3 - Send equivalent minted tokens to sender.
    }


    /*
    User wants to withdraw funds back to ETH
    from MyEth coin.
    */
    function withdraw(uint256 amount) external {

        uint256 dexBalance = balanceOf(address(this));
        
        // --- WHAT IS REQUIRED ---
        require(msg.sender != address(0), "Cannot transfer from the zero address");
        require(amount <= dexBalance, "Cannot request more than the available ETH balance");

        // --- Send Token to Smart Contract ---
        transfer(owner, amount);

        // Check to see if the user sent 
        address(this).transfer(10000);

        // Once we transfer the ETH out, we want to
        // burn the rest.
    }

    // --- CREATE A LIST OF REQUIREMENT MODIFIERS ---
    modifier minimumAmount {
        require(msg.value > 100000);
        _;
    }
}