import supertest from "supertest";
import { expect } from "chai";
const request = supertest("https://gorest.co.in/public-api/");

const TOKEN =
  "d1c72101ce90cf9265f13f2c0c4c27b3d51e1f8115135b16d3fa2543d445e4ac";

xdescribe("users", () => {
  it("Get /users", (done) => {
    request.get(`users?access-token=${TOKEN}`).end((err, res) => {
      expect(res.body.code).to.equal(200);
      expect(res.body.data).to.not.be.empty;
      done();
    });
  });

  it("Get /users with query params", () => {
    const url = `users?access-token=${TOKEN}&page=5&gender=female&status=active`;
    request.get(url).end((err, res) => {
      res.body.data.forEach((data) => {
        expect(res.body.meta.pagination.page).to.equal(5);
        expect(data.gender).to.eq("female");
        expect(data.status).to.equal("active");
      });
    });
  });

  it("POST /users", () => {
    const data = {
      name: "Test Name",
      email: `test${Math.floor(Math.random() * 7777)}@issso.ca`,
      gender: "female",
      status: "active",
    };

    request
      .post("users")
      .set("Authorization", `Bearer ${TOKEN}`)
      .send(data)
      .end((err, res) => {
        console.log(res.body);
        // expect(res.body.data.email).to.equal(data.email);
        // expect(res.body.data.status).to.equal(data.status);
        expect(res.body.data).to.deep.include(data);//verify that all data are returned
      });
  });

  it("PUT /users/:id", () => {
    const data = {
      status: "active",
      name: `Rob - ${Math.floor(Math.random() * 7777)}`,
    };

    request
      .put("users/4102")
      .set("Authorization", `Bearer ${TOKEN}`)
      .send(data)
      .end((err, res) => {
        console.log(res.body);
        expect(res.body.data).to.deep.include(data);//verify that all data are returned
      });
  });
  
  it("DELETE /users/:id", () => {
    const data = {
      status: "active",
      name: `Rob - ${Math.floor(Math.random() * 7777)}`,
    };

    request
      .delete("users/11")
      .set("Authorization", `Bearer ${TOKEN}`)
      .send(data)
      .end((err, res) => {
        expect(res.body.data).to.equal(null);
      });
  });
});
