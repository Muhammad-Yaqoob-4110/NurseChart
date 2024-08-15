const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const validateToken = require("../utils/auth/auth_middleware");
const requireRoles = require("../utils/auth/roles_middleware");

// create a product
router.post("/users", userController.createUser);

// // create a product
// router.post("/users", userController.createUser);

// // get all users
// router.get("/users", validateToken, userController.getAllUsers);

// // update a user by id
// router.put("/users/:id", userController.updateUser);

// // delete a user by id
// router.delete("/users/:id", userController.deleteUser);

// // Login User
// router.post("/users/login", userController.loginUser);


// router.get(
//   "/users/endpoint",
//   validateToken,
//   requireRoles(["Admin", "user"]),
//   userController.multipleMiddleWares
// );

module.exports = router;
