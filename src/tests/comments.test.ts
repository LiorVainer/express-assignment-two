import request from "supertest";
import { initApp } from "../server";
import mongoose from "mongoose";
import { Express } from "express";
import { commentModel } from "../models/comments.model";
import { UserWithTokens } from "../types/user.types";
import { userModel } from "../models/user.model";
import commentsTests from "./comments_tests.json";

let app: Express;

const testUser: UserWithTokens = {
  email: "test@user.com",
  password: "testpassword",
};

beforeAll(async () => {
  console.log("beforeAll");
  app = await initApp();
  await commentModel.deleteMany();
  await userModel.deleteMany();

  await request(app).post("/auth/register").send(testUser);
  const res = await request(app).post("/auth/login").send(testUser);
  testUser.accessToken = res.body.accessToken;
  testUser._id = res.body._id;
  expect(testUser.accessToken).toBeDefined();
});

afterAll((done) => {
  console.log("afterAll");
  mongoose.connection.close();
  done();
});

const baseUrl = "/comments";

let newCommentId = "";

describe("comments tests", () => {
  test("get all comments", async () => {
    const response = await request(app).get(baseUrl);
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(0);
  });

  test("create new comment", async () => {
    const response = await request(app)
      .post(baseUrl)
      .send(commentsTests[0])
      .set({ authorization: "JWT " + testUser.accessToken });
    expect(response.statusCode).toBe(201);
    expect(response.body.userId).toBe(commentsTests[0].userId);
    expect(response.body.postId).toBe(commentsTests[0].postId);
    expect(response.body.content).toBe(commentsTests[0].content);
    newCommentId = response.body._id;
  });

  test("get comment by id", async () => {
    const response = await request(app).get(baseUrl + "/" + newCommentId);
    expect(response.statusCode).toBe(200);
    expect(response.body.userId).toBe(commentsTests[0].userId);
    expect(response.body.postId).toBe(commentsTests[0].postId);
    expect(response.body.content).toBe(commentsTests[0].content);
  });

  test("get comment by userId", async () => {
    const response = await request(app).get(
      baseUrl + "?userId=" + commentsTests[0].userId
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].postId).toBe(commentsTests[0].postId);
    expect(response.body[0].content).toBe(commentsTests[0].content);
  });

  test("delete comment", async () => {
    const response = await request(app)
      .delete(baseUrl + "/" + newCommentId)
      .set({ authorization: "JWT " + testUser.accessToken });
    expect(response.statusCode).toBe(200);
    const response2 = await request(app).get(baseUrl + "/" + newCommentId);
    expect(response2.statusCode).toBe(404);
  });
});
