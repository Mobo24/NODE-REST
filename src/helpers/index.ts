import crypto from 'crypto';
require('dotenv').config();

const SECRET = process.env.CRYPTO_SECRET;

export const random = () => {
    return crypto.randomBytes(128).toString('base64');
}
export const auth = (salt:string, password:string) =>{
    return crypto.createHmac("sha256", [salt, password].join('/')).update(SECRET).digest('hex');

}