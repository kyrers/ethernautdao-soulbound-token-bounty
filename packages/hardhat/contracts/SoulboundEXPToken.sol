// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
* @title EthernautDAO Soulbound EXP ERC20 Token
* @notice The token is soulbound and has no supply cap
* @author kyrers
*/
contract SoulboundEXPToken is ERC20, Ownable {
    /*------------------------------------------------------------
                                 VARIABLES
    --------------------------------------------------------------*/
    //Mapping of all allowed minters and if they're currently allowed to mint or not
    mapping(address => bool) public minters;

    /*------------------------------------------------------------
                                 MODIFIERS
    --------------------------------------------------------------*/
    modifier onlyApprovedMinter() {
        if (!minters[msg.sender]) revert MinterNotApproved();
        _;
    }

    /*------------------------------------------------------------
                                 EVENTS
    --------------------------------------------------------------*/
    event MinterStatusUpdated(address _newMinter, bool _allow);

    /*------------------------------------------------------------
                                 ERRORS
    --------------------------------------------------------------*/
    error ZeroAddress();
    error MinterNotApproved();
    error IsSoulbound();

    /*------------------------------------------------------------
                                 FUNCTIONS
    --------------------------------------------------------------*/
    constructor() ERC20("EthernautDAO Soulbound EXP Token", "EXP") {}


    /**
    * @notice Change a minter approval status
    * @dev Only owner
    * @param _newMinter The new minter 
    * @param _allow The new minter status
    */
    function setApprovedMinter(address _newMinter, bool _allow) external onlyOwner {
        //Check 0 address
        if (address(0) == _newMinter) revert ZeroAddress();

        minters[_newMinter] = _allow;
        emit MinterStatusUpdated(_newMinter, _allow);
    }

    /**
    * @notice Mint EXP tokens
    * @dev Only an approved minter can mint
    * @param _to The receiver address
    * @param _amount The amount of EXP tokens to be minted
    */
    function mint(address _to, uint256 _amount) external onlyApprovedMinter {
        _mint(_to, _amount);
    }

    /**
    * @dev Token is soulbound - all the following functions are overridden to make sure of this
    */
    function transfer(address to, uint256 amount) public pure override returns (bool) { revert IsSoulbound(); }
    function allowance(address owner, address spender) public pure override returns (uint256) { revert IsSoulbound(); }
    function approve(address spender, uint256 amount) public pure override returns (bool) { revert IsSoulbound(); }
    function transferFrom(address from, address to, uint256 amount) public pure override returns (bool) { revert IsSoulbound(); }
    function increaseAllowance(address spender, uint256 addedValue) public pure override returns (bool) { revert IsSoulbound(); }
    function decreaseAllowance(address spender, uint256 subtractedValue) public pure override returns (bool) { revert IsSoulbound(); }
}
