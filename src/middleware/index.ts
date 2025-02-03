import express from 'express';
import{get, merge} from 'lodash';
import { getUserSessionToken } from '../db/user';
import jwt from 'jsonwebtoken';

export const isAuthenticated = async(req: express.Request, res: express.Response, next: express.NextFunction ) =>{
    try{
        const SessionToken = req.cookies["sessionToken"];
        console.log(SessionToken);
        if(!SessionToken){
            return res.status(401).send("Unauthorized no session token");
        }
        const user = await getUserSessionToken(SessionToken);
        if(!user){
            return res.status(401).send("Unauthorized no matching user");
        }
        merge(req, {identity: user})
        return next();
    }
    catch(error){
        console.log(error);

    }

}

export const isOwner = async(req: express.Request, res: express.Response, next: express.NextFunction ) => {
    try{
        const {id} = req.params;
        const identity = get(req, 'identity._id') as string;
        if((!identity) || (identity.toString() !== id)){
            return res.status(403).send("Unauthorized");
        }
        return next();
    }
    catch(error){
        console.log(error);
    }
}
export const isAuthorized = async(req: express.Request, res: express.Response, next: express.NextFunction ) =>{
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        const verified = jwt.verify(token, jwtSecretKey);
        if (verified) {
            return next();
        } else {
            return res.status(401).send("Unauthorized");
        }
    } catch (error) {
        return res.status(401).send("Unauthorized");
    }
    

}