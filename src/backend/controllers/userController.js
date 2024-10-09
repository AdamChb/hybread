const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET

const User = require("../models/userModel");

// Register User
const registerUser = (req, res) => {
    const { username, email, password } = req.body;

    //Check if the user already exist
    User.findUserByEmail(email, (error, existingUser) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ message: "Server Error" });
        }

        if (existingUser) {
            return res.status(400).json({ message: "User already exist" });
        }

        // Hash password
        bcrypt.hash(password, 10, (error, hashedPassword) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ message: "Server Error" });
            }

            // Create a new user
            User.createUser(
                { username, email, password: hashedPassword },
                (createErr, newUser) => {
                    if (createErr) {
                        console.error(createErr);
                        return res.status(500).json({ message: "Server Error" });
                    }

                    return res.status(201).json({
                        message: "User registered successfully",
                        user: { 
                            id: newUser.ID_Reader, 
                            pseudo: newUser.Pseudo,
                            email: newUser.Email,
                        }
                    });
                }
            );
        });
    });
};

// Login User
const loginUser = (req, res) => {
    const { email, password } = req.body;
  
    // Find the user by username
    User.findUserByEmail(email, (error, user) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
      }
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Compare the password with the hashed password
      bcrypt.compare(password, user.Password, (err, isMatch) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: "Server error" });
        }
  
        if (!isMatch) {
          return res.status(401).json({ message: "Invalid password" });
        }
  
        // Generate a JWT token
        const token = jwt.sign({ id: user.id }, JWT_SECRET, {
          expiresIn: "1h",
        });
  
        // Send the token and user info in the response
        return res.json({
          token,
          user: { id: user.id, username: user.username },
        });
      });
    });
  };

// Get User Profile
const getUserProfile = (req, res) => {
    const userId = req.user.id; // Get user id from the JWT payload
  
    User.findUserById(userId, (error, user) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
      }
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      return res.json({ id: user.id, username: user.username });
    });
  };
    

module.exports = { registerUser, loginUser, getUserProfile }