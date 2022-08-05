import supertest from "supertest";
import { expect } from "chai";
import { setTimeout } from "timers/promises";
const request = supertest("https://gorest.co.in/public-api/");

const TOKEN =
  "d1c72101ce90cf9265f13f2c0c4c27b3d51e1f8115135b16d3fa2543d445e4ac";

describe("Users", () => {
  let userId;

  describe("POST", () => {
    it("/users", (done) => {
      const data = {
        email: `test${Math.floor(Math.random() * 9999)}@issso.ca`,
        name: "Test Cuba",
        gender: "female",
        status: "active",
      };

      request
        .post("users")
        .set("Authorization", `Bearer ${TOKEN}`)
        .send(data)
        .end((err, res) => {
          expect(res.body.data.email).to.equal(data.email);
          expect(res.body.data.status).to.equal(data.status);
          expect(res.body.data).to.deep.include(data);
          userId = res.body.data.id;
          console.log(userId);
          console.log("1");
          done();
        });
    });
  });

  describe("PUT", () => {
    it("/users/:id", () => {
      const data = {
        status: "inactive",
      };

      request
        .put(`users/${userId}`)
        .set("Authorization", `Bearer ${TOKEN}`)
        .send(data)
        .end((err, res) => {
          setTimeout(() => {
            console.log("2");
            expect(res.body.data.status).to.equal(data.status);
          }, 3000);
        });
    });
  });

  describe("GET", () => {
    it("/users", () => {
      request.get(`users?access-token=${TOKEN}`).end((err, res) => {
        expect(res.body.data).to.not.be.empty;
      });
    });

    it("/users/:id", () => {
      request.get(`users/${userId}?access-token=${TOKEN}`).end((err, res) => {
        console.log(res.body.data.id);
        expect(res.body.data.id).to.be.equal(userId);
      });
    });

    it("/users with query params", () => {
      const url = `users?access-token=${TOKEN}&page=5&gender=female&status=active`;
      request.get(url).end((err, res) => {
        res.body.data.forEach((data) => {
          expect(res.body.meta.pagination.page).to.equal(5);
          expect(data.gender).to.eq("female");
          expect(data.status).to.equal("active");
        });
      });
    });
  });

  describe("DELETE", () => {
    it("/users/:id", () => {
      request
        .delete(`users/${userId}`)
        .set("Authorization", `Bearer ${TOKEN}`)
        .end((err, res) => {
          expect(res.body.data).to.be.eq(null);
        });
    });
  });
});
