const User = require("../models/userModel");
const jwt = require("jsonwebtoken"); // Import the jwt library

// Create a User
async function createUser(req, res) {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Get all Users
async function getAllUserNamesAndEmails(req, res) {
  try {
    const users = await User.find();
    // Extract usernames from users array
    const usernames = users.map(user => user.username);
    const useremails = users.map(user => user.email);
    dict = {
      usernames: usernames,
      useremails: useremails
    }
    // Return the list of usernames as JSON
    res.json(dict);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


// // Create a User
// async function createUser(req, res) {
//   try {
//     const newUser = await User.create(req.body);
//     res.status(201).json({
//       message: "User created successfully",
//       user: newUser,
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }

// // Get all Users
// async function getAllUsers(req, res) {
//   try {
//     const users = await User.find();
//     res.json(users);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// }

// // Update a User by ID
// async function updateUser(req, res) {
//   try {
//     const { id } = req.params;
//     const updatedUser = await User.findByIdAndUpdate(id, req.body, {
//       new: true,
//     });

//     if (!updatedUser) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     res.json({
//       message: "User information updated successfully",
//       user: updatedUser,
//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// }

// // Delete a User by ID
// async function deleteUser(req, res) {
//   try {
//     const { id } = req.params;
//     await User.findByIdAndRemove(id);
//     res.json({ message: "User deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// }

// Login User
async function loginUser(req, res) {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: "User not found" });
    if (user.password != password)
      return res.status(401).json({ error: "Invalid credentails " });
    return res.status(200).json({
      message: "Logged in successfully",
      username: username,
      fullname: user.firstname,
      userid: user._id,
      token: GenerateToken(user),
    });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
}

function GenerateToken(user) {
  const payload = {
    role: user.role,
    id: user._id,
  };
  const token = jwt.sign(payload, "adsfasdfjkh$#asdfasdf.adsfxc");
  return token;
}

// Multiple middle wares
async function multipleMiddleWares(req, res) {
  console.log("API endpoint handler");
  res.json({ message: "API response" });
}

module.exports = {
  createUser,
  getAllUserNamesAndEmails,
  // updateUser,
  // deleteUser,
  loginUser,
  multipleMiddleWares,
};
