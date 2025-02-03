import express from 'express';
import {getAllUsers, deleteUsers} from '../controllers/users';
import { isAuthenticated, isOwner } from '../middleware';

export default (router: express.Router)=>{
    router.get("/users", isAuthenticated, getAllUsers);
    router.delete("/deleteusers", isAuthenticated, isOwner, deleteUsers);
    return router;
}