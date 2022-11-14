import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import { mockedAdmin, mockedAdminLogin } from "../../mocks";

describe("/login", () => {
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

  test("POST /login - should be able to login with the user", async () => {
    const response = await request(app).post("/login").send(mockedAdminLogin);

    expect(response.body).toHaveProperty("token");
    expect(response.status).toBe(200);
  });

  test("POST /login should not be able to login with an incorrect email", async () => {
    const response = await request(app).post("/login").send({
      email: "wrong@email.com",
      password: "wrong",
    });
    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message");
  });

  test("POST /users should not be able to login with an incorrect password", async () => {
    const response = await request(app).post("/login").send({
      email: "higor@email.com",
      password: "wrongPassword",
    });
    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message");
  });
});
