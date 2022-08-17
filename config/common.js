import qa from '../config/qa';
import supertest from "supertest";
const request = supertest(qa.baseUrl);

    // module.exports = {
    //     request,
    // }
export default request;
