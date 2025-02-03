import mongoose from "mongoose";

export interface user{
    username?: string;
    email?: string;
    authentication?:{
        salt?: string;
        password?: string;
        sessionToken?: string;
    }
    createdAt?: Date;
    updatedAt?: Date;
}

const userSchema = new mongoose.Schema<user>({
    username: { type: String, required: true },
    email: { type: String, required: true },
    authentication: {
      password: { type: String, required: true, select: true },
      salt: { type: String, select: false },
      sessionToken: { type: String, select: false },
    },
    createdAt: { type: Date, required: true, default: Date.now },
    updatedAt: { type: Date },
});


export const User = mongoose.model<user>("User", userSchema);
//actions
export const getUsers = () => {
    return User.find();
}

export const findUser = (id: string) => {
    return User.findOne({id});
}
export const findUserByUserName = (username: string) => {
    return User.findOne({username});
}
export const getUserSessionToken = (userSessionToken: string) => {
    return User.findOne({ "authentication.sessionToken": userSessionToken });
};
export const getuserbyID = (id:string) =>{
    return User.findById(id);
}
export const getUserByEmail = (email:string) =>{
    return User.findOne({email});
}
export const createUser = (record: Record<string, any >) =>{
    return new User(record).save().then((user) => user.toObject());
}

export const deleteByUserID = (id:string) =>{
    return User.deleteOne({_id: id});
}

export const updateOnebyUserID = (id:string, record:Record<string,any>) =>{
    return User.findByIdAndUpdate ({_id: id, _record:record});
}