// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract HelloWorld {
  string public greeting = 'Hello World!';
  address public owner;

  constructor() {
    owner = msg.sender;
    greeting = 'Hello World!';
  }

  function sayHello() public view returns (string memory) {
    return greeting;
  }

  function setGreeting(string memory _greeting) public {
    require(msg.sender == owner, 'Only the owner can set the greeting.');
    greeting = _greeting;
  }
}
