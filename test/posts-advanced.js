import { expect } from "chai";
import request from "../config/common.js";
const faker = require("faker");
require('dotenv').config();
const { createRandomUser } = require("../helpers/user_helper.js");
const { createRandomUserWithFaker } = require("../helpers/user_helper.js");
const TOKEN = process.env.USER_TOKEN;

let postId;
let userId;

describe.only("User Posts", () => {
  before(async () => {
    // userId = await createRandomUser();
    userId = await createRandomUserWithFaker();
  });
  it.only("/posts", async () => {
    const data = {
      user_id: userId,
      title: faker.lorem.word(),
      body: faker.lorem.words(),
    };

    const postRes = await request
      .post("posts")
      .set("Authorization", `Bearer ${TOKEN}`)
      .send(data);
    console.log(data, " before post ID");

    expect(postRes.body.data.title).to.eq(data.title);
    postId = postRes.body.data.id;
    console.log('POST ID', postId);

  });

  it.only("GET /posts/:id", async () => {
    await request
      .get(`posts/${postId}`)
      .set("Authorization", `Bearer ${TOKEN}`)
      .expect(200);
    console.log(postId, " POST ID FROM GET REQUEST");
  });
});

describe("Negative tests", () => {
  before(async () => {
    userId = await createRandomUser();
  });

  it("401 Authentication Failed", async () => {
    const data = {
      user_id: userId,
      title: "apit test",
      body: "first api test",
    };

    const postRes = await request.post("posts").send(data);
    console.log(postRes.body, " -------------------------");
    expect(postRes.body.code).to.eq(401);
    expect(postRes.body.data.message).to.eq("Authentication failed");
  });

  it("422 Authentication Failed", async () => {
    const data = {
      user_id: userId,
      title: "apit test",
    };

    const postRes = await request
      .post("posts")
      .set("Authorization", `Bearer ${TOKEN}`)
      .send(data);
    console.log(postRes.body.data, " --------------++++++++");
    expect(postRes.body.code).to.eq(422);
    expect(postRes.body.data[0].field).to.eq("body");
    expect(postRes.body.data[0].message).to.eq("can't be blank");
  });
});
