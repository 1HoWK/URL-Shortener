const request = require("supertest");
const baseURL = "http://localhost:8000";

describe("POST endpoint", () => {
  const newLongUrl = {
    url: "https://www.makeuseof.com/express-apis-jest-test/",
  };
  const badLongUrl = {
    url: "123456",
  };
  const invalidKey = "00000000-0000-0000-0000-000000000000";
  let shortURL = "";

  // before going into other test cases
  beforeAll(async () => {
    // get a short URL using long URL
    const response = await request(baseURL).post("/shorten_url").send(newLongUrl);
    // retrieve short url
    shortURL = response.body.key;
  });

  it("tests receive good long URL and response a object with key and long_url ", async () => {
    const response = await request(baseURL).post("/shorten_url").send(newLongUrl);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("key");
    expect(response.body).toHaveProperty("long_url", "https://www.makeuseof.com/express-apis-jest-test/");
  });
 
  it("tests receive bad long URL and return a object with errorDescription ", async () => {
    const response = await request(baseURL).post("/shorten_url").send(badLongUrl);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      "errorDescription",
      "Error: Invalid URL"
    );
  });

  it("test existing key and redirect to the page", async () => {
    // short url from the test case inside beforeAll function
    const response = await request(baseURL)
      .get(`/shorten_url/${shortURL}`)
      .expect(302);
  });

  it("test invalid key and return 404 status", async () => {
    const response = await request(baseURL)
      .get(`/shorten_url/${invalidKey}`)
      .expect(404);
  });
});
