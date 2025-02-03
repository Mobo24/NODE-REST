import express from "express";
import { z } from "zod";
import {getUserByEmail, createUser, findUserByUserName} from "../db/user";
import { random, auth } from "../helpers/index";
import jwt from "jsonwebtoken";

const userSchema = z.object({
    username: z.string(),
    email: z.string().email(),
    authentication: z.object({
      password: z.string(),
    }).optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
  });

type jwtSigner = {
    time: string;
    username: string;
    email: string;
}

export const register = async(req: express.Request, res: express.Response) =>{
    try{
        const {username, email, authentication: { password }} = userSchema.parse(req.body);
        
        if(!username || !email || !password){
            
            res.status(400).send("Invalid request body");
            return;
        }
        const existingUser = await getUserByEmail(email);
        if(existingUser){
            res.status(400).send("User already exists");
            return;
        }
        const salt = random();
        const created = await createUser({ email:email, username, authentication:{salt, password:auth(salt, password)} });
        return res.status(200).json(created).end();
    }
    catch(error){
        res.status(400).send(error);

    }
}

export const login = async(req: express.Request, res:express.Response) => {
    try{
        const {username, email, authentication: { password }} = userSchema.parse(req.body);
        if(!username || !email || !password){  
            res.status(400).send("Invalid request body");
            return;
        }
        const user = await getUserByEmail(email).select('+authentication.salt +authentication.password');
        const validateHash = auth(user.authentication.salt, password); 
        if (validateHash != user.authentication.password){
            return res.status(403).send("Invalid username or password");
        }
        const salt = random();
        user.authentication.sessionToken = auth(salt, user._id.toString());
        await user.save();
        res.cookie("sessionToken", user.authentication.sessionToken, {domain:'localhost', path:'/'});
        return res.status(400).send("Succesfully logged in");
    }
    catch(error){
        res.status(400).send(error);
    }

}

export const jwtTokenGeneration = async(req: express.Request, res:express.Response) => {
    const {username, email} = userSchema.parse(req.body);
    if(!username || !email){  
        res.status(400).send("Invalid request body");
        return;
    }
    const userEmail = await getUserByEmail(email).select('-authentication.salt -authentication.password');
    const userByUsername = await findUserByUserName(username).select('-authentication.salt -authentication.password');;
    if (!(userEmail.equals(userByUsername))){
        res.status(400).send("Invalid username or email");
        return;
    }
    let jwtdata: jwtSigner= {
        time:Date(),
        username: username,
        email: email
    }
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    const token = jwt.sign(jwtdata, jwtSecretKey);
    res.send(token);
}