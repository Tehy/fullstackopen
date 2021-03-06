const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs.map((blog) => blog.toJSON()));
});

blogsRouter.get("/:id", async (request, response, next) => {
  const blog = await Blog.findById(request.params.id);
  if (blog) {
    response.json(blog.toJSON());
  } else {
    response.status(404).end();
  }
});

blogsRouter.post("/", async (request, response, next) => {
  const body = request.body;

  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: "token missing or invalid" });
    }
    const user = await User.findById(decodedToken.id);

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user.id,
    });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    response.json(savedBlog.toJSON());
  } catch (error) {
    next(error);
  }
});

blogsRouter.delete("/:id", async (request, response, next) => {
  const blog = await Blog.findById(request.params.id);
  /* console.log("blog", blog);
  console.log("blog.user", blog.user);
  console.log("typeof blog.user", typeof blog.user);
  console.log("request.token", request.token); */
  try {
    if (blog !== null) {
      const decodedToken = jwt.verify(request.token, process.env.SECRET);
      if (!request.token || !decodedToken.id) {
        return response.status(401).json({ error: "token missing or invalid" });
      }
      blog.user.toString() === decodedToken.id.toString()
        ? (await Blog.findByIdAndRemove(blog.id), response.status(204).end())
        : response
            .status(401)
            .json({ error: "user not the owner of the blog" });
    } else {
      response.status(404).json({ error: "blog with given id not found" });
      throw new Error("invalid blog id ", request.params.id);
    }
  } catch (error) {
    next(error);
  }
});

blogsRouter.put("/:id", async (request, response, next) => {
  const body = request.body;

  const updatedBblog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  try {
    const blog = await Blog.findByIdAndUpdate(request.params.id, updatedBblog);
    response.json(blog);
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;
