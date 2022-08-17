import supertest from "supertest";
const request = supertest("https://gorest.co.in/public-api/");
const faker = require('faker');
const TOKEN =
  "d1c72101ce90cf9265f13f2c0c4c27b3d51e1f8115135b16d3fa2543d445e4ac";

  export const createRandomUserWithFaker = async () => {
    const userData = {
        email: faker.internet.email(),
        name: faker.name.firstName(),
        gender: "female",
        status: "active",
      };
  
      const res = await request
        .post("users")
        .set("Authorization", `Bearer ${TOKEN}`)
        .send(userData);
        console.log(res.body, "------------->>>>>>>>>>>>>>>> create random user with faker");

        console.log(res.body.data.id, "------------->>>>>>>>>>>>>>>> DATA ID");

           return res.body.data.id;
    };

// export const createRandomUser = async () => {
//     const userData = {
//         email: `test${Math.floor(Math.random() * 9999)}@issso.ca`,
//         name: "Test Cuba",
//         gender: "female",
//         status: "active",
//       };
  
//       const res = await request
//         .post("users")
//         .set("Authorization", `Bearer ${TOKEN}`)
//         .send(userData);
//         console.log(res.body.data.id, "------------->>>>>>>>>>>>>>>>");

//            return res.body.data.id;
//     };

    // module.exports = {
    //     createRandomUser,
    // }