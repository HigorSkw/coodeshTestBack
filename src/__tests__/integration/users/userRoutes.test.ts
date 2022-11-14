import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import {
  mockedAdmin,
  mockedAdminLogin,
  mockedUser,
  mockedUserLogin,
} from "../../mocks";

describe("/user", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /users -  must be able to create a user", async () => {
    const response = await request(app).post("/user").send(mockedUser);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("is_adm");
    expect(response.body).not.toHaveProperty("password");

    expect(response.body.email).toEqual(mockedUser.email);
    expect(response.body.name).toEqual(mockedUser.name);
    expect(response.status).toBe(201);
  });

  test("POST /users -  should not be able to create a user that already exists", async () => {
    const response = await request(app).post("/user").send(mockedUser);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });

  test("GET /users -  must be able to list users if is adm", async () => {
    await request(app).post("/user").send(mockedAdmin);
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);
    const response = await request(app)
      .get("/user")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    expect(response.body).toHaveLength(2);
    expect(response.status).toBe(200);
  });

  test("GET /users -  must be able to list users if is not admin", async () => {
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);
    const response = await request(app)
      .get("/user")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    expect(response.body.email).toEqual(mockedUser.email);
    expect(response.body.name).toEqual(mockedUser.name);
    expect(response.status).toBe(200);
  });

  test("GET /users -  should not be able to list users without authentication", async () => {
    const response = await request(app).get("/user");

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("PATCH /users/:id -  should not to be able to update user with invalid id", async () => {
    const updateValues = {
      name: "New name",
      email: "new@email.com",
    };
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);
    const response = await request(app)
      .patch("/user/708dbdcb-8e99-4225-9512-5971f1422ef8")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send(updateValues);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });

  test("PATCH /user/:id -  should be able to update user", async () => {
    const newValues = { name: "Carlin", email: "carlin@mail.com" };

    const admingLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);
    const token = `Bearer ${admingLoginResponse.body.token}`;

    const userTobeUpdateRequest = await request(app)
      .get("/user")
      .set("Authorization", token);
    const userTobeUpdateId = userTobeUpdateRequest.body[0].id;

    const response = await request(app)
      .patch(`/user/${userTobeUpdateId}`)
      .set("Authorization", token)
      .send(newValues);

    const userUpdated = await request(app)
      .get("/user")
      .set("Authorization", token);

    expect(response.status).toBe(200);
    expect(userUpdated.body[0].name).toEqual("Carlin");
    expect(userUpdated.body[0]).not.toHaveProperty("password");
  });

  test("DELETE -  should not be able to delete user with invalid id", async () => {
    await request(app).post("/user").send(mockedAdmin);

    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);

    const response = await request(app)
      .delete(`/user/13970660-5dbe-423a-9a9d-5c23b37943cf`)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
  });

  test("DELETE /user/:id -  should not be able to delete user without authentication", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);
    const UserTobeDeleted = await request(app)
      .get("/user")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    const response = await request(app).delete(
      `/user/${UserTobeDeleted.body[0].id}`
    );

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("DELETE /user/:id -  must be able to delete user", async () => {
    const admingLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);
    const token = `Bearer ${admingLoginResponse.body.token}`;

    const userTobeUpdateRequest = await request(app)
      .get("/user")
      .set("Authorization", token);
    const userTobeUpdateId = userTobeUpdateRequest.body[0].id;

    const response = await request(app)
      .delete(`/user/${userTobeUpdateId}`)
      .set("Authorization", token);

    expect(response.status).toBe(204);
  });
});
