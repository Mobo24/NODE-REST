import app from "./index";
import {describe, expect, test} from '@jest/globals';
import request from 'supertest';
import mongoose from "mongoose";

//scaffolding
let  RESPONSE_TOKEN = '';
const TEST_MONGO_URI = process.env.MONGO_URL;

beforeAll(async () => {
    await mongoose.connect(TEST_MONGO_URI);
    mongoose.connection.on("error", (error: Error) => console.log(error));
    await new Promise(resolve => mongoose.connection.once('open', resolve));
});

afterAll( async () => {
    await mongoose.connection.close();
});

//check mongo connection
describe('MongoDB connection', () => {
    it('should have an active connection', () => {
      // The connection state 1 means connected
      expect(mongoose.connection.readyState).toBe(1);
    });
  });


// testing authentication
describe("POST trying to acess my api without authentication", () =>{
    describe("trying to acess without authentication", () => {
        test("It should respond with a 401 status code", async () => {
            const response = await request(app)
            .post("/api/v1/auth/register")
            .send({
                "email": "Jamez@gmail.com",
                "username": "jamez",
                "authentication":{
                    "password": "jamez24"
                }
            });
            expect(response.statusCode).toBe(401);
        });
       
    })

    describe("Happy path to create a user", () => {
        test("trying to acess without authentication", async () => {
            const response = await request(app)
            .post("/api/v1/auth/login")
            .send({
                "email": "Jamez@gmail.com",
                "username": "jamez",
                "authentication":{
                    "password": "jamez24"
                }
            });
            expect(response.statusCode).toBe(401);
        }); 
    })
})

describe("POST getting authenticated via jwt", () =>{
    describe("getting authenticaated via jwt", () => {
        test("It should respond with a 200 status code", async () => {
            const response = await request(app)
            .post("/api/v1/auth/jwt")
            .send({
                "email": "princemoronfolu@gmail.com",
                "username": "mobo24"
            })
            RESPONSE_TOKEN = response.text;
            expect(response.statusCode).toBe(200);
        });           
})
})

//authenticating 
describe("POST Register a user", () =>{
    describe("Trying to register a new user", () => {
        test("It should respond with a 200 status code", async () => {
            const response = await request(app)
            .post("/api/v1/auth/register")
            .set('Authorization', `Bearer ${RESPONSE_TOKEN}`)
            .send({
                "email": "Jamez@gmail.com",
                "username": "jamez",
                "authentication":{
                    "password": "jamez24"
                }
            });
            expect(response.statusCode).toBe(200);
        });
    })
})

describe("POST Login a user", () =>{
    describe("Trying to login a user", () => {
        test("It should respond with a 200 status code", async () => {
            const response = await request(app)
            .post("/api/v1/auth/login")
            .set('Authorization', `Bearer ${RESPONSE_TOKEN}`)
            .send({
                "email": "Jamez@gmail.com",
                "username": "jamez",
                "authentication":{
                    "password": "jamez24"
                }
            });
            expect(response.statusCode).toBe(200);
        });
    })
})
