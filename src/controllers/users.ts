import express from 'express';
import { getUsers, deleteByUserID } from '../db/user';


export const getAllUsers = async(req: express.Request, resp: express.Response) =>{
    try{
        const users = await getUsers();
        return resp.status(200).json(users);
    }
    catch(error){
        console.log(error);
        resp.status(400).send("Invalid request body");
    }

}
export const deleteUsers = async (req: express.Request, resp: express.Response) => {
    try{
        const {id} = req.params;
        const deletedUser = await deleteByUserID(id);
        return resp.status(200).json(deletedUser);
    }
    catch(error){
        console.log(error);
        resp.status(500).send("Internal Server Error");
    }
}