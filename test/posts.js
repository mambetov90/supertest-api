import supertest from "supertest";
import { expect } from "chai";
import { setTimeout } from "timers/promises";
import { it } from "node:test";
const request = supertest("https://gorest.co.in/public-api/");

const TOKEN =
  "d1c72101ce90cf9265f13f2c0c4c27b3d51e1f8115135b16d3fa2543d445e4ac";

describe("User Posts", () => {
  let postId, userId;

  it("/posts", async () => {
    const userData = {
      email: `test${Math.floor(Math.random() * 9999)}@issso.ca`,
      name: "Test Cuba",
      gender: "female",
      status: "active",
    };

    return request
      .post("users")
      .set("Authorization", `Bearer ${TOKEN}`)
      .send(userData)
      .then(async (res) => {
        expect(res.body.data).to.deep.include(userData);
        userId = res.body.data.id;

        const data = {
          user_id: userId,
          title: "apit test",
          body: "first api test",
        };

        const postRes = await request
          .post("posts")
          .set("Authorization", `Bearer ${TOKEN}`)
          .send(data);
        console.log(postRes.body.data);
        expect(postRes.body.data).to.deep.include(data);

        postId = postRes.body.data.id;
      });
  });

  it("GET /posts/:id", async () => {
    const res = await request
      .get(`posts/${postId}`)
      .set("Authorization", `Bearer ${TOKEN}`)
      .expect(200);
  });

  describe.only('Negative tests', () => {
     
    it("/posts", async () => {
        const userData = {
            email: `test${Math.floor(Math.random() * 9999)}@issso.ca`,
            name: "Test Cuba",
            gender: "female",
            status: "active",
          };
      
          return request
            .post("users")
            .set("Authorization", `Bearer ${TOKEN}`)
            .send(userData)
            .then(async (res) => {
              expect(res.body.data).to.deep.include(userData);
              userId = res.body.data.id;
});
    });

      it('401 Authentication Failed', async () => {
          const data = {
              user_id: userId,
              title: "apit test",
              body: "first api test",
            };
    
           const postRes = await request
              .post("posts")
            //   .set("Authorization", `Bearer ${TOKEN}`)
              .send(data);
              console.log(postRes.body, " -------------------------");
              expect(postRes.body.code).to.eq(401);
              expect(postRes.body.data.message).to.eq('Authentication failed');
  
  
      });
});
});
