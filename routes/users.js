const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");

router.post(
  "/",
  [
    check("name", "Please add name")
      .not()
      .isEmpty(),
    check("email", "Please put a valid email").isEmail(),
    check(
      "password",
      "Please enter a valid password with 6 or more characters"
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }

      user = new User({
        name,
        email,
        password
      });

      const salt = await bcrypt.genSalt(5);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        userId: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get("secretKey"),
        {
          expiresIn: 3600
        },
        (err, token) => {
          if (err) throw err;
          res.send({ token });
        }
      );

      res.send("User saved.");
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ message: err.message });
    }
  }
);

module.exports = router;
