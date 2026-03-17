// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract HelloChain {
    string private message;

    event MessageUpdated(string newMessage, address indexed updatedBy);

    constructor(string memory initialMessage) {
        message = initialMessage;
    }

    function getMessage() external view returns (string memory) {
        return message;
    }

    function setMessage(string calldata newMessage) external {
        require(bytes(newMessage).length > 0, "Message cannot be empty");
        message = newMessage;
        emit MessageUpdated(newMessage, msg.sender);
    }
}
