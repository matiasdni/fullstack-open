const helper = require("../utils/list_helper");
const supertest = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const Blogs = require("../models/blog");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { usersInDb } = require("../utils/list_helper");
const api = supertest(app);

const initialBlogs = [
  {
    id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
];

beforeEach(async () => {
  await Blogs.deleteMany({});
  await User.deleteMany({});

  const passwordHash = await bcrypt.hash("sekret", 10);
  const initialUser = new User({ username: "root", passwordHash });

  await initialUser.save();

  const user = {
    username: "root",
    password: "sekret",
  };

  const loginResponse = await api.post("/api/login").send(user);
  const token = loginResponse.body.token;

  for (let i = 0; i < initialBlogs.length; i++) {
    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(initialBlogs.at(i))
      .expect(201)
      .expect("Content-Type", /application\/json/);
  }
});

describe("get blogs from database", () => {
  test("all blogs returned", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(initialBlogs.length);
  });

  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
  test("id is defined", async () => {
    const response = await api.get("/api/blogs");
    const ids = response.body.map((r) => r.id);
    expect(ids).toBeDefined();
  });
});

describe("get a specific blog", () => {
  test("a specific blog is within the returned blogs", async () => {
    const response = await api.get("/api/blogs");
    const titles = response.body.map((r) => r.title);
    expect(titles).toContain("Canonical string reduction");
  });
});

describe("add a new blog", () => {
  test("a new blog can be added", async () => {
    const newBlog = {
      title: "Test blog",
      author: "Test author",
      url: "http://www.test.com",
      likes: 0,
    };

    const user = {
      username: "root",
      password: "sekret",
    };

    const loginResponse = await api.post("/api/login").send(user);
    const token = loginResponse.body.token;

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/blogs");

    const titles = response.body.map((r) => r.title);
    expect(response.body).toHaveLength(initialBlogs.length + 1);
    expect(titles).toContain("Test blog");
  });

  test("a new blog without likes can be added", async () => {
    const newBlog = {
      title: "Test blog",
      author: "Test author",
      url: "http://www.test.com",
    };

    const user = {
      username: "root",
      password: "sekret",
    };

    const loginResponse = await api.post("/api/login").send(user);
    const token = loginResponse.body.token;

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/blogs");

    const titles = response.body.map((r) => r.title);
    expect(response.body).toHaveLength(initialBlogs.length + 1);
    expect(titles).toContain("Test blog");
    expect(response.body.at(-1).likes).toBe(0);
  });

  test("blog without title or url cant be added", async () => {
    const newBlog = {};

    const user = {
      username: "root",
      password: "sekret",
    };

    const loginResponse = await api.post("/api/login").send(user);
    const token = loginResponse.body.token;

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(400);

    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(initialBlogs.length);
  });
});

describe("delete blog", () => {
  test("blog can be deleted", async () => {
    const getBlogs = await api.get("/api/blogs");
    const blogs = getBlogs.body;
    const user = {
      username: "root",
      password: "sekret",
    };

    const loginResponse = await api.post("/api/login").send(user);
    const token = loginResponse.body.token;
    await api
      .delete(`/api/blogs/${blogs.at(0).id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(204);
    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(initialBlogs.length - 1);
  });
});

describe("update blog", () => {
  test("blog can be updated", async () => {
    const getBlogs = await api.get("/api/blogs");
    const blogs = getBlogs.body;
    const updatedBlog = {
      title: "updated blog",
      url: "updated url",
      likes: "1337",
    };
    await api
      .put(`/api/blogs/${blogs.at(0).id}`)
      .send(updatedBlog)
      .expect(200);

    const response = await api.get("/api/blogs");
    const titles = response.body.map((r) => r.title);
    expect(titles).toContain("updated blog");
  });
});

test("dummy returns one", () => {
  const result = helper.dummy(initialBlogs);
  expect(result).toBe(1);
});

describe("total likes", () => {
  const listWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0,
    },
  ];

  test("when list has only one blog equals the likes of that", () => {
    const result = helper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });
});

describe("favorite blog", () => {
  test("when list has only one blog equals the likes of that", () => {
    const result = helper.favoriteBlog(initialBlogs);
    expect(result).toEqual({
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0,
    });
  });
});

describe("when there is initially one user at db", () => {
  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "salainen",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });
});

describe("user validation", () => {
  test("creation fails with proper status code and message if username already taken", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "root",
      name: "Superuser",
      password: "salainen",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("username must be unique");

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test("creation fails with proper status code and message if username is not at least 3 characters long", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "ok",
      name: "testUser",
      password: "testPassword",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);
    expect(result.body.error).toContain(
      "username must be at least 3 characters long"
    );
    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test("creation fails with proper status code and message if password is not at least 3 characters long", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "testUser",
      name: "testUser",
      password: "ok",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);
    expect(result.body.error).toContain(
      "password must be at least 3 characters long"
    );
    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
