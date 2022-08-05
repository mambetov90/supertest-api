import supertest from "supertest";
import { expect } from "chai";
import { it } from "node:test";
const { createRandomUser } = require('../helpers/user_helper.js');
const request = supertest("https://gorest.co.in/public-api/");
let postId;
let userId;
const TOKEN =
  "d1c72101ce90cf9265f13f2c0c4c27b3d51e1f8115135b16d3fa2543d445e4ac";


xdescribe("User Posts", () => {

  xit("/posts", async () => {
           const data = {
          user_id: userId,
          title: "apit test",
          body: "first api test",
        };

       const postRes = await request
          .post("posts")
          .set("Authorization", `Bearer ${TOKEN}`)
          .send(data);
          expect(postRes.body.data).to.deep.include(data);
        postId = postRes.body.data.id;
  });

  xit("GET /posts/:id", async () => {
    await request
      .get(`posts/${postId}`)
      .set("Authorization", `Bearer ${TOKEN}`)
      .expect(200);
      console.log(postId);
  });
});

describe.only('Negative tests', () => {
    
  before(async () => {
    userId = await createRandomUser();
   });
   
    it('401 Authentication Failed', async () => {
        const data = {
            user_id: userId,
            title: "apit test",
            body: "first api test",
          };
  
         const postRes = await request
            .post("posts")
            .set("Authorization", `Bearer ${TOKEN}`)
            .send(data);
            console.log(postRes.body, " -------------------------");
            expect(postRes.body.code).to.eq(401);
            expect(postRes.body.data.message).to.eq('Authentication failed');


    })
  })
