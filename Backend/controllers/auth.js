const User = require("../models/user");
const bcrypt = require('bcrypt');
const jwt_secret=process.env.JWT_SECRET;
const jwt=require('jsonwebtoken')

const {sendWelcomeEmail}=require('../service/Emailer')

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
      sendWelcomeEmail(newUser.useremail,'Customer','http://localhost:5173');
      return res.json({ type: "success", message: "Account created successfully" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ type: "error", message: "Account signup failed" });
  }
};


exports.loginToAccount = async (req, res, next) => {
  const { email, password } = req.body;
  // console.log(email, password);

  try {
    const user = await User.findOne({ useremail: email });
    if (!user) {
      return res.status(404).json({ type:"error", message: "User does not exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password); // Compare with the user's hashed password
    if (isMatch) {
      const payload={ userId: user._id, useremail: user.useremail,role:user.role,username:user.username,imageUrl:user.imageUrl}
      // Generate a JWT with the user info
    const token = jwt.sign(
      payload, // Payload (user info)
      jwt_secret, // Secret key
      { expiresIn: '1h' } // Token expiry time
    );

    // Send the token to the front end
      return res.status(200).json({type:"success", message: "Login successful",token:token ,user:payload});
    } else {
      return res.status(401).json({ type:"error",message: "Password does not match" });
    }
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).json({ type:"error",message: "Internal server error" });
  }
};

