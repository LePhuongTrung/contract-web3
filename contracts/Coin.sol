// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/utils/Strings.sol';

contract MyPureERC20Token {
  string public constant name = 'LE PHUONG TRUNG';
  string public constant symbol = 'LPT';
  uint8 public constant decimals = 6;
  uint256 public totalSupply;
  uint256 public MIN_TRANSFER_AMOUNT;
  uint public constant MAX_SUPPLY = 700e12;

  address public owner;

  mapping(address => uint256) public balanceOf;
  mapping(address => mapping(address => uint256)) public allowance;

  event Transfer(address indexed from, address indexed to, uint256 value);
  event Approval(address indexed owner, address indexed spender, uint256 value);
  event Mint(address indexed to, uint256 amount);

  constructor(uint256 _minTransferAmount) {
    totalSupply = 0;
    // balanceOf[msg.sender] = _initialSupply;
    MIN_TRANSFER_AMOUNT = _minTransferAmount;
  }

  modifier onlyOwner() {
    require(msg.sender == owner, 'Ownable: caller is not the owner');
    _;
  }

  function transferOwnership(address newOwner) public onlyOwner {
    require(newOwner != address(0), 'Ownable: new owner is the zero address');
    owner = newOwner;
  }

  function decimals() public view returns (uint8) {
    return decimals;
  }

  function transfer(address _to, uint256 _value) public returns (bool) {
    require(_to != address(0), 'ERC20: transfer to the zero address');
    require(balanceOf[msg.sender] >= _value, 'ERC20: transfer amount exceeds balance');
    require(
      _value >= MIN_TRANSFER_AMOUNT,
      string.concat('ERC20: transfer amount must be greater than or equal to ', Strings.toString(MIN_TRANSFER_AMOUNT))
    );

    balanceOf[msg.sender] -= _value;
    balanceOf[_to] += _value;
    emit Transfer(msg.sender, _to, _value);
    return true;
  }

  function approve(address _spender, uint256 _value) public returns (bool) {
    require(_spender != address(0), 'ERC20: approve to the zero address');

    allowance[msg.sender][_spender] = _value;
    emit Approval(msg.sender, _spender, _value);
    return true;
  }

  function transferFrom(address _from, address _to, uint256 _value) public returns (bool) {
    require(_from != address(0), 'ERC20: transfer from the zero address');
    require(_to != address(0), 'ERC20: transfer to the zero address');
    require(balanceOf[_from] >= _value, 'ERC20: transfer amount exceeds balance');
    require(allowance[_from][msg.sender] >= _value, 'ERC20: transfer amount exceeds allowance');

    balanceOf[_from] -= _value;
    balanceOf[_to] += _value;
    allowance[_from][msg.sender] -= _value;
    emit Transfer(_from, _to, _value);
    return true;
  }

  function increaseAllowance(address _spender, uint256 _addedValue) public returns (bool) {
    approve(_spender, allowance[msg.sender][_spender] + _addedValue);
    return true;
  }

  function decreaseAllowance(address _spender, uint256 _subtractedValue) public returns (bool) {
    uint256 currentAllowance = allowance[msg.sender][_spender];
    require(currentAllowance >= _subtractedValue, 'ERC20: decreased allowance below zero');
    approve(_spender, currentAllowance - _subtractedValue);
    return true;
  }

  function totalSupply() public view returns (uint256) {
    return totalSupply;
  }

  function balanceOf(address _owner) public view returns (uint256) {
    return balanceOf[_owner];
  }

  function allowance(address _owner, address _spender) public view returns (uint256) {
    return allowance[_owner][_spender];
  }
}
