import express from "express";
import authentication from "./authentication";
import users from "./users";

const router = express.Router(); // create a new router

export default ():express.Router =>{
    authentication(router) //authentication middleware
    users(router) //users middleware
    return router;
}