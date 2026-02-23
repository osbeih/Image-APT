import app from "../index";
import supertest from "supertest";

const request = supertest(app);

describe("Test endpoint response", () => {
  it("gets the api endpoint", async () => {
    const response = await request.get("/api");
    expect(response.status).toBe(200);
  });
});

describe("Test Image endpoint", () => {
  it("gets the Image endpoint", async () => {
    const response = await request.get("/api/image");
    expect(response.status).toBe(200);
  });
});
