import request from "supertest";
import {initApp} from "../server";
import mongoose from "mongoose";
import {Express} from "express";
import {UserWithTokens} from "../types/user.types";
import { userModel } from "../models/user.model";
import postModel from "../models/posts_model";

let app: Express;

const testUser: UserWithTokens = {
    email: "test@user.com",
    password: "testpassword",
}

beforeAll(async () => {
    console.log("beforeAll");
    app = await initApp();
    await postModel.deleteMany();
    await userModel.deleteMany();

    // await request(app).post("/auth/register").send(testUser);
    // const res = await request(app).post("/auth/login").send(testUser);
    // testUser.accessToken = res.body.accessToken;
    // testUser._id = res.body._id;
    // expect(testUser.accessToken).toBeDefined();
});

afterAll((done) => {
    console.log("afterAll");
    mongoose.connection.close();
    done();
});

const baseUrl = "/posts";

let newPostId = "";


const postsTests = [
    {
        "title": "Hello1",
        "sender": "Lior",
        "content": "Hello World..."
    },
    {
        "title": "Hello2",
        "sender": "Lior",
        "content": "Hello World..."
    },
    {
        "title": "Hello3",
        "sender": "Lior",
        "content": "Hello World..."
    }
]

describe("posts tests", () => {
    test("get all posts", async () => {
        const response = await request(app).get(baseUrl);
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(0);
    });

    test("create new post", async () => {
        const response = await request(app).post(baseUrl).send(postsTests[0]);;
        expect(response.statusCode).toBe(201);
        expect(response.body.title).toBe(postsTests[0].title);
        expect(response.body.sender).toBe(postsTests[0].sender);
        expect(response.body.content).toBe(postsTests[0].content);
        newPostId = response.body._id;
    });
      
    test("get post by id", async () => {
      const response = await request(app).get(baseUrl + "/" + newPostId);
      expect(response.statusCode).toBe(200);
      expect(response.body.title).toBe(postsTests[0].title);
      expect(response.body.sender).toBe(postsTests[0].sender);
      expect(response.body.content).toBe(postsTests[0].content);
    });

    test("delete post", async () => {
      const response = await request(app).delete(baseUrl + "/" + newPostId);
      expect(response.statusCode).toBe(200);
      const response2 = await request(app).get(baseUrl + "/" + newPostId);
      expect(response2.statusCode).toBe(404);
    });
});