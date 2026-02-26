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
    const fileName = "fjord";
    const width = 200;
    const height = 200;
    const response = await request.get(
      `/api/image?fileName=${fileName}&width=${width}&height=${height}`,
    );
    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toContain("image/jpeg");
  });
});
