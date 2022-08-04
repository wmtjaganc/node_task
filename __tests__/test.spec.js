const request = require("supertest");
const express = require("express");
const router = require("../routes/index");
const app = new express();
app.use("/", router);

describe("Good Home Routes", function () {
  test("responds to /test", async () => {
    const res = await request(app).get("/test");
    expect(res.statusCode).toBe(200);
    expect(res._body.data.brand).toEqual("Rolex");
    expect(res._body.data.model).toEqual("Rolex Air-King");
    expect(res._body.data.referenceNumber).toEqual("5500/1002");
    expect(res._body.data.condition).toEqual(
      "Used: An item that has been previously worn. See the seller’s listing for full details and description of any imperfections. "
    );
    expect(res._body.data.price).toEqual("£2,950.00");
    expect(res._body.data.image).toEqual(
      "https://i.ebayimg.com/images/g/g04AAOSwFTZi0bzj/s-l400.jpg"
    );
  });

  test("responds to /health", async () => {
    const res = await request(app).get("/health");
    expect(res.statusCode).toBe(200);
    expect(res._body.message).toEqual("server running successfully");
  });
});
