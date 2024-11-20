const schema = require("../models/bloodBankEntry");
const bankEntries = [];
let idx = 1;


// Function to add a new user
const addEntry = (req,res) => {
    const{donorName, age, bloodType, contactInfo, quantity, collectionDate, expirationDate, status} = req.body;
    if(!donorName || !age || !bloodType || !contactInfo || !quantity || !collectionDate || !expirationDate || !status){
        res.status(400).json({error: "None of the fields must be empty"});
    }
    const newEntry = new schema.BloodBankEntry(
        id = idx++,donorName,age,bloodType,contactInfo,quantity,collectionDate,expirationDate,status
    );
    bankEntries.push(newEntry);
    res.status(201).json({message: "User added sucessfully"});
};

//function to retrieve all user information - GET Method
const getallUsers = (req,res) => {
    res.json(bankEntries);
};

//function to get user by id - GET Method
const getUserById = (req,res) => {
    const {id} = req.params;
    const entry = bankEntries.find((e) => e.id == parseInt(id));
    if(!entry){res.status(404).json({error: "User not found"});}
    res.json({entry});
};

//function to alter an entry - PUT Method
const changeUser = (req,res) => {
    const {id} = req.params;
    const entry = bankEntries.find((e) => e.id == id);
    if(!entry){res.status(404).json({error: "User not found"});}

    const{donorName, age, bloodType, contactInfo, quantity, collectionDate, expirationDate, status} = req.body;
    if(donorName) entry.donorName = donorName;
    if (age) entry.age = age;
    if(bloodType) entry.bloodType = bloodType;
    if(contactInfo) entry.contactInfo = contactInfo;
    if(quantity) entry.qty = quantity;
    if(collectionDate) entry.collectionDate = collectionDate;
    if(expirationDate) entry.expirationDate = expirationDate;
    if(status) entry.status = status;
};

//function to delete a user - DELETE Method
const deleteUser = (req,res) => {
    const {id} = req.params;
    const idx = bankEntries.findIndex((e) => e.id == id);
    if(idx === -1){res.status(404).json({error: "User not found"});}

    bankEntries.splice(idx,1);
    res.status(204).json({message: "User Removed"});
};
// Implementing pagination
const getPaginatedEntries = (req, res) => {
    const { page = 1, size = 10 } = req.query;
    const startIndex = (page - 1) * size;
    const endIndex = startIndex + parseInt(size);
    const paginatedEntries = bankEntries.slice(startIndex, endIndex);
    res.json(paginatedEntries);
};


//function to implement searching algorithm
const searchUser = (req,res) =>{
    const{bloodType, status, donorName } = req.body;
    let filteredEntries = bankEntries;

    if (bloodType) {
        filteredEntries = filteredEntries.filter((e) => e.bloodType === bloodType);
    }
    if (status) {
        filteredEntries = filteredEntries.filter((e) => e.status === status);
    }
    if (donorName) {
        filteredEntries = filteredEntries.filter((e) => e.donorName.toLowerCase().includes(donorName.toLowerCase()));
    }

    res.json(filteredEntries);
};

module.exports = {
    addEntry,getallUsers,getUserById,changeUser,deleteUser,getPaginatedEntries,searchUser
};




