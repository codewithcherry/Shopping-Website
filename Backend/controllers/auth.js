const User = require("../models/user");
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt_secret=process.env.JWT_SECRET;
const jwt=require('jsonwebtoken')

const {sendWelcomeEmail,sendResetPasswordLinkEmail}=require('../service/Emailer')

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

exports.forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  // console.log(email);

  try {
      // Find the user by email
      const user = await User.findOne({ useremail: email });
      if (!user) {
          return res.status(404).json({ type: "error", message: "User does not exist" });
      }

      // Generate reset token and hash it
      const resetToken = crypto.randomBytes(32).toString("hex");
      const resetTokenHash = crypto.createHash("sha256").update(resetToken).digest("hex");

      // Save hashed token and expiration in DB
      user.resetPasswordToken = resetTokenHash;
      user.resetPasswordTokenExpires = Date.now() + 15 * 60 * 1000; // 15 minutes
      await user.save();

      // Create reset link
      const resetLink = `http://localhost:5173/reset-password/${resetToken}`;

      // Send reset password email
      await sendResetPasswordLinkEmail(user.useremail, user.username, resetLink);

      // Respond to the client
      return res.status(200).json({ type: "success", message: `Password reset email sent successfully to ${user.useremail}` });
  } catch (err) {
      // console.error(err);
      return res.status(500).json({ type: "error", message: "Internal server error" });
  }
};

exports.updatePassword = async (req, res, next) => {
  const { newPassword, resetToken } = req.body;

  if (!resetToken) {
    return res.status(400).json({ type: 'error', message: 'Reset token is required' });
  }

  try {
    // Hash the provided reset token to compare with the one stored in the database
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    // Find the user by the hashed token and ensure it's not expired
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordTokenExpires: { $gt: Date.now() } // Check if the token is still valid
    });

    // If the user is not found or the token is expired
    if (!user) {
      return res.status(400).json({ type: 'error', message: 'Invalid or expired token' });
    }

    // Hash the new password before saving it to the database
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update the user's password and clear the reset token and expiration
    user.password = hashedPassword;
    user.resetPasswordToken = undefined; // Clear the reset token
    user.resetPasswordTokenExpires = undefined; // Clear the expiration time
    await user.save();

    // Send a success response
    return res.status(200).json({ type: 'success', message: 'Password updated successfully' });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ type: 'error', message: 'Failed to update password' });
  }
};