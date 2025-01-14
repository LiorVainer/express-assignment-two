import request from "supertest";
import {initApp} from "../server";
import mongoose from "mongoose";
import {Express} from "express";
import commentsModel from "../models/comments_model";

let app: Express;

beforeAll(async () => {
    console.log("beforeAll");
    app = await initApp();
    await commentsModel.deleteMany();
});

afterAll((done) => {
    console.log("afterAll");
    mongoose.connection.close();
    done();
});

const baseUrl = "/comments";

const commentsTests = [
    {
        "sender": "Eliav",
        "postId": "adadadada",
        "content": "This is a comment"
    },
    {
        "sender": "Eliav2",
        "postId": "adadadada",
        "content": "This is a comment 2"
    },
    {
        "sender": "Eliav",
        "postId": "adadadada",
        "content": "This is a comment 3"
    }
]

let commentId = "";

describe("comments Tests", () => {
    test("get all comments", async () => {
        const response = await request(app).get("/comments");
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(0);
      });
    
      test("create Comment", async () => {
        const response = await request(app).post("/comments").send(commentsTests[0]);
        expect(response.statusCode).toBe(201);
        // expect(response.body.comment).toBe(commentsTests[0].content);
        // expect(response.body.postId).toBe(commentsTests[0].postId);
        // expect(response.body.owner).toBe(commentsTests[0].sender);
        commentId = response.body._id;
      });
    
      test("get comment by sender", async () => {
        const response = await request(app).get("/comments?sender=" + commentsTests[0].sender);
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(1);
        // expect(response.body[0].comment).toBe(testComments[0].comment);
        // expect(response.body[0].postId).toBe(testComments[0].postId);
        // expect(response.body[0].owner).toBe(testComments[0].owner);
      });
    
      test("Comments get post by id", async () => {
        const response = await request(app).get("/comments/" + commentId);
        expect(response.statusCode).toBe(200);
        // expect(response.body.comment).toBe(testComments[0].comment);
        // expect(response.body.postId).toBe(testComments[0].postId);
        // expect(response.body.owner).toBe(testComments[0].owner);
      });    

});