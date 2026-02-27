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
  it("should return 404 invalid endpoint", async () => {
    const response = await request.get("/apis");
    expect(response.status).toBe(404);
  });
});

describe("Test Image endpoint", () => {
  const fileName = "fjord";
  const width = 200;
  const height = 200;
  it("gets the Image endpoint", async () => {
    const response = await request.get(
      `/api/image?fileName=${fileName}&width=${width}&height=${height}`,
    );
    if (!fileName || (!width && !height)) {
      expect(response.status).toBe(404);
    }
    expect(response.status).toBe(200);
  });
  it("invalid end point", async () => {
    const response = await request.get(
      `/api/img?fileName=${fileName}&width=${width}&height=${height}`,
    );
    expect(response.status).toBe(404);
  });
});

describe("test process image", () => {
  it("resize the image", async () => {
    const outputPath = await processImage("fjord", 200, 200);
    expect(fs.existsSync(outputPath)).toBeTrue();
  });
  it("should return error: file not exist", async () => {
    await expectAsync(processImage("notexist", 200, 200)).toBeRejected();
  });
  it("should return error: width or height invalid", async () => {
    await expectAsync(processImage("notexist", 200, -200)).toBeRejected();
  });
});
