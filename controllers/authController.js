const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/ userModel"); // Corrected the file path

// Register User
const registerUser = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save the user
    await newUser.save();

    // Respond with success message
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Login User
const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      console.log("Login attempt with email:", email); // Log the email used for login
  
      // Check if the user exists
      const user = await User.findOne({ email });
      if (!user) {
        console.log("User not found for email:", email); // Log if user is not found
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      // Check if the password matches
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        console.log("Password mismatch for email:", email); // Log if password does not match
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      // Generate JWT
      const token = jwt.sign(
        { id: user._id,}, // Payload containing user ID and role
        'somesupersecretsecret', // Ensure you have JWT_SECRET in your environment variables
        { expiresIn: "1h" } // Token expiration
      );
  
      console.log("JWT generated for user:", user._id); // Log the generated JWT for the user
  
      // Respond with the token and user info
      res.json({
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
      });
    } catch (error) {
      console.error("Login error:", error); // Log any error that occurs
      res.status(500).json({ message: "Server error" });
    }
  };

module.exports = { registerUser, loginUser };
