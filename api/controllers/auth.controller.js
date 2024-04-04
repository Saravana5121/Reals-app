import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashesPassword = await bcrypt.hash(password, 10);
    console.log(hashesPassword);
    //Create New User:
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashesPassword,
      },
    });
    console.log(newUser);
    res.status(201).json({ message: "User created successfully!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to create user!" });
  }
};
export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    //Check user is existing or not
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      res.status(401).json({ message: "Invalid user!" });
    }

    //check the password is correct or not
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid password!" });
    }
    //send token to user the user
    const age = 1000 * 60 * 60 * 24 * 7;
    res
      .cookie("test2", "myValue2", {
        httpOnly: true,
        maxAge: age,
      })
      .status(200)
      .json({ message: "Login successful!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "User login failed!" });
  }
};
export const logout = (req, res) => {};
