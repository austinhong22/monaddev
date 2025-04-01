// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Split50 {
    address[2] public recipients; // storage로 선언: 블록체인에 영구 저장됨

    constructor(address _addr1, address _addr2) {
        recipients[0] = _addr1;
        recipients[1] = _addr2;
    }

    function split() external payable {
        require(msg.value > 0, "Must send some ether");

        uint256 half = msg.value / 2;

        // 5:5로 분배
        (bool sent1, ) = recipients[0].call{value: half}("");
        require(sent1, "Transfer to recipient 1 failed");

        (bool sent2, ) = recipients[1].call{value: msg.value - half}(""); // 나머지 전송 (잔돈 처리용)
        require(sent2, "Transfer to recipient 2 failed");
    }

    // 주소를 바꾸고 싶을 때 사용할 수 있는 함수 (예시용)
    function updateRecipients(address[2] memory _newRecipients) public {
        recipients = _newRecipients; // 여기서 memory → storage 복사 발생
    }

    // 현재 주소 목록 확인
    function getRecipients() public view returns (address[2] memory) {
        return recipients;
    }
}
