import express from "express";
import {register, login, jwtTokenGeneration} from "../controllers/authentication";
import { isAuthorized } from "../middleware";
//authentication route

export default (router: express.Router) =>{
    router.post("/auth/register",isAuthorized, register);
    router.post("/auth/login",isAuthorized, login);
    router.post("/auth/jwt", jwtTokenGeneration);
    return router;
};
