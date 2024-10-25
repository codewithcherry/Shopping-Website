const User = require("../models/user");
const bcrypt = require('bcrypt');

exports.registerAccount = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ useremail: email });
    if (existingUser) {
      return res.status(200).json({ type: "info", message: "User with same email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);
    if (!hashedPassword) {
      return res.status(500).json({ type: "error", message: "Password hashing failed" });
    }

    // Create the new user object
    const newUser = new User({
      useremail: email,
      password: hashedPassword,
    });

    // Save the new user
    const result = await newUser.save();
    if (result) {
      return res.json({ type: "success", message: "Account created successfully" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ type: "error", message: "Account signup failed" });
  }
};
