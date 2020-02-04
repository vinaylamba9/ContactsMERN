const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); //here we will fetch user from DB,but don't want to fetch password from DB
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server ERROR" });
  }
});

router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required.").exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = User.findOne({ email });

      if (!user) {
        res.send("Invalid Credentials");
      }

      const isMatch = bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.send("Invalid Credentials");
      }

      let payload = {
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
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ message: err.message });
    }
  }
);

module.exports = router;
