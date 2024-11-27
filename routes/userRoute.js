const express= require("express")
const router= express.Router()
const controller= require("../controller/index")
//add user
router.post("/add", controller.userController.Add);

    //Get record of all the users
router.get("/get", controller.userController.get);
  



module.exports = router;