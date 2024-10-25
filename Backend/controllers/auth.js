const User = require("../models/user");
const bcrypt = require('bcrypt');

exports.registerAccount = async (req, res, next) => {
  const { email, password } = req.body; // Destructuring for cleaner access
  User.findOne({ useremail: email })
    .then(user => {
      if (user) {
        return res.status(200).json({ type: "info", message: "User with same emailid exists" });
      }
      return bcrypt.hash(password, 12);
    })
    .then(hashedPassword => {
      if (!hashedPassword) return; // Check if the password hash succeeded

      const newUser = new User({
        useremail: email,
        password: hashedPassword
      });

      return newUser.save();
    })
    .then(result => {
      if (result) {
        return res.json({ type: "success", message: "Account created successfully" });
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ type: "error", message: "Account signup failed" });
    });
};
