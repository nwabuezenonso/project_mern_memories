import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserModal from "../models/user.js";

const secret = 'test';

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // old user variable now has access to all the data in the object
    const oldUser = await UserModal.findOne({ email });

    //  if there is no user, display error
    if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });

    // check if the password is correct
    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    // if there is no pasword, display error
    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

    // create token with data stored in token and secret and expires
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" });

    // send response as result
    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

// function for sign in up
export const signup = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    // check if the user exist
    const oldUser = await UserModal.findOne({ email });

    if (oldUser) return res.status(400).json({ message: "User already exists" });

    // hash the password 
    const hashedPassword = await bcrypt.hash(password, 12);

    // create the new data
    const result = await UserModal.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });

    // pass in the credentials like email and id
    const token = jwt.sign( { email: result.email, id: result._id }, secret, { expiresIn: "1h" } );

    // send response as result
    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    
    console.log(error);
  }
};
