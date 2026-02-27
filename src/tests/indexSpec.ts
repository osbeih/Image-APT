import app from "../index";
import supertest from "supertest";
import processImage from "../utilities/processImage";
import fs from "fs";

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

describe("test process image", () => {
  it("resize the image", async () => {
    const outputPath = await processImage("fjord", 200, 200);
    expect(fs.existsSync(outputPath)).toBeTrue();
  });
});
