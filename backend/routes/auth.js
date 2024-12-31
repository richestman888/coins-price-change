import express from 'express'
import User from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Alert } from "react-bootstrap";

const router = express.Router()

router.post('/register', async(req, res) => {
    try {
        const {name, email, password} = req.body
        const user = await User.findOne({email})

        if(user) {
            return res.json({success: false, message: "User already exist"})
        }

        const hashPassword = await bcrypt.hash(password, 10)
        const newUser = new User({name, email, password: hashPassword})
        await newUser.save()
        return res.status(200).json({success: true, message: "Account created successfully"})
    } catch(error) {
        console.log(error.message)
        return res.status(500).json({success: false, message: "Error adding user"})
    }
})

router.post('/login', async(req, res) => {
    try {
        const {email, password} = req.body
        const user = await User.findOne({email})

        if (!user) {
            // <Alert variant="danger" onClose={() => setShow(false)} dismissible>
            //     <Alert.Heading>Error</Alert.Heading>
            //     <p>User does not exist</p>  
            // </Alert>
            return res.status(401).json({success: false, message: "User not existing"})
        }

        const checkpassword = await bcrypt.compare(password, user.password)

        if(!checkpassword){
            return res.status(401).json({success: false, message: "Wrong credentials"})
        }

        const token = jwt.sign({id: user._id}, "secretkeyofnoteapp123@#", {expiresIn: "1h"})
        return res
            .status(200)
            .json({success: true, token, user: {name: user.name}, message: "Login successfully"})
    } catch(error) {
        return res
            .status(500)
            .json({success: false, message: "Error login to server"})
    }
})

export default router