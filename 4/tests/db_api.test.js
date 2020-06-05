//jest.useFakeTimers();
const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");

const user = { username: "mluukkai", password: "salainen" };

describe("init db test", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(helper.initialBlogs);
  });

  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
  test("blogs id's are named id", async () => {
    const blogsAtStart = await helper.blogsInDb();
    blogsAtStart.forEach((blog) => expect(blog.id).toBeDefined());
  });
});

describe("adding blogs to db", () => {
  test("blog can be added, db increases by one", async () => {
    const login = await api.post("/api/login").send(user);
    const token = login.body.token;

    const newBlog = {
      title: "First class tests",
      author: "Robert C. Martin",
      url:
        "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
    };

    await api
      .post("/api/blogs")
      .set("Authorization", "Bearer " + token)
      .send(newBlog)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
    const titles = blogsAtEnd.map((n) => n.title);
    expect(titles).toContain("First class tests");
  });
  test("blog added without 'likes' value, 'likes' value defaults to 0 ", async () => {
    const login = await api.post("/api/login").send(user);
    const token = login.body.token;

    const newBlog = {
      title: "Typical blog title",
      author: "Veikko Veika",
      url:
        "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    };

    await api
      .post("/api/blogs")
      .set("Authorization", "Bearer " + token)
      .send(newBlog)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();

    expect((blogsAtEnd[blogsAtEnd.length - 1].likes = 0));
  });

  test("adding blog fails without user login", async () => {
    const newBlog = {
      title: "Typical blog title",
      author: "Veikko Veika",
      url:
        "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    };

    await api.post("/api/blogs").send(newBlog).expect(401);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
