// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract AllTourist {
    address[] public TouristAlladdress;
    event SaveTourist(
        address indexed Touristaddress,
        string name,
        bytes32 Passhash,
        bytes32 ownphno,
        bytes32 famiphno,
        string tripstart,
        string tripend
    );

    function TouristIDRegistration(
        string memory name,
        bytes32 Passhash,
        bytes32 ownphno,
        bytes32 famiphno,
        string memory tripstart,
        string memory tripend
    ) public {
        Tourist newTourist = new Tourist(
            name,
            Passhash,
            ownphno,
            famiphno,
            tripstart,
            tripend
        );
        TouristAlladdress.push(address(newTourist));
        emit SaveTourist(
            address(newTourist),
            name,
            Passhash,
            ownphno,
            famiphno,
            tripstart,
            tripend
        );
    }
}

contract Tourist {
    string public name;
    bytes32 public Passhash;
    bytes32 public ownphno;
    bytes32 public famiphno;
    string public tripstart;
    string public tripend;

    constructor(
        string memory _name,
        bytes32 _Passhash,
        bytes32 _ownphno,
        bytes32 _famiphno,
        string memory _tripstart,
        string memory _tripend
    ) {
        name = _name;
        Passhash = _Passhash;
        ownphno = _ownphno;
        famiphno = _famiphno;
        tripstart = _tripstart;
        tripend = _tripend;
    }
}
