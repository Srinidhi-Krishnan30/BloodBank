const express = require("exporess");
const {addEntry,getallUsers,getUserById,
    changeUser,deleteUser,getPaginatedEntries,searchUser} = require("../functions/index");
    
const router = express.Router();
router.post('/bloodbank', addEntry);
router.get('/bloodbank', getallUsers);
router.get('/bloodbank/:id', getUserById);
router.put('/bloodbank/:id', changeUser);
router.delete('/bloodbank/:id', deleteUser);
router.get('/bloodbank', getPaginatedEntries);
router.get('/bloodbank/search', searchUser);

module.exports = router;

