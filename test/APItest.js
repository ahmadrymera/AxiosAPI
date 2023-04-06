const axios = require("axios");
const expect = require("chai").expect;

const baseURL = "https://kasir-api.belajarqa.com";

let response, token, userId;

describe("Success Login", async () => {
  before(async () => {
    response = await axios.post(`${baseURL}/authentications`, {
      email: "toko@apaya.com",
      password: "12345678",
    });
    token = response.data.data.accessToken;
  });

  it("should have success status", async () => {
    expect(response.data.status).eq("success");
  });
});

describe("Success create a cashier user", async () => {
  before(async () => {
    response = await axios.post(
      `${baseURL}/users`,
      {
        name: "kasir-serbaguna",
        email: "kasir@serbaguna.com",
        password: "12345678",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  });

  it("should have success status", async () => {
    expect(response.data.status).eq("success");
  });

  it("should have success message", async () => {
    expect(response.data.message).eq("User berhasil ditambahkan");
  });

  it("should success to save userId", async () => {
    userId = response.data.data.userId;
  });

  it("user should have name kasir-serbaguna", async () => {
    expect(response.data.data.name).eq("kasir-serbaguna");
  });
});

describe("Success get a single cashier user", async () => {
  before(async () => {
    response = await axios.get(`${baseURL}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  });

  it("should have success status", async () => {
    expect(response.data.status).eq("success");
  });

  it(`should have userId: ${userId}`, async () => {
    expect(response.data.data.user.id).eq(userId);
  });
});

describe("Success updated the cashier user data", async () => {
  before(async () => {
    response = await axios.put(
      `${baseURL}/users/${userId}`,
      {
        name: "update-user",
        email: "user@updated.com",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  });

  it("should have success status", async () => {
    expect(response.data.status).eq("success");
  })

  it("should have success message", async () => {
    expect(response.data.message).eq("User berhasil diupdate");
  })

  it("cashier name should changed to update-user", async () => {
    expect(response.data.data.name).eq("update-user");
  })
});

describe("Success delete the cashier user data", async () => {
    before(async () => {
      response = await axios.delete(
        `${baseURL}/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    });
  
    it("should have success status", async () => {
      expect(response.data.status).eq("success");
    })
  
    it("should have success message", async () => {
      expect(response.data.message).eq("User berhasil dihapus");
    })
  });

