import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import { mockedAdmin, mockedAdminLogin } from "../../mocks";

describe("/sales", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });

    await request(app).post("/user").send(mockedAdmin);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /sales - should be able to create new values", async () => {
    const admingLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);
    const token = `Bearer ${admingLoginResponse.body.token}`;

    const response = await request(app)
      .post("/sales")
      .attach("file", "src/__tests__/mocks/sales.txt")
      .set("Authorization", token);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("totalizer");
    expect(response.body.sales[0]).toHaveProperty("type");
    expect(response.body.sales[0]).toHaveProperty("date");
    expect(response.body.sales[0]).toHaveProperty("product");
    expect(response.body.sales[0]).toHaveProperty("value");
    expect(response.body.sales[0]).toHaveProperty("seller");
  });

  test("POST /sales - should not be able to create new values without authentication", async () => {
    const admingLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);
    const token = `Bearer ${admingLoginResponse.body.token}`;

    const response = await request(app)
      .post("/sales")
      .attach("file", "src/__tests__/mocks/sales.txt");

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("GET /sales - must be able to list sales", async () => {
    const admingLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);
    const token = `Bearer ${admingLoginResponse.body.token}`;

    const response = await request(app)
      .get("/sales")
      .set("Authorization", token);

    expect(response.body).toHaveProperty("totalizer");
    expect(response.body.sales).toHaveLength(20);
    expect(response.status).toBe(200);
  });

  test("GET /sales - should not be able to list sales without authentication", async () => {
    const admingLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);
    const token = `Bearer ${admingLoginResponse.body.token}`;

    const response = await request(app).get("/sales");

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });
});
