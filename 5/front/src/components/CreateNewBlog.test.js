import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import CreateNewBlog from "./CreateNewBlog";

describe("CreateNewBlog tests", () => {
  let component;
  let createBlogButton;
  let newBlog;
  beforeEach(() => {
    newBlog = {
      title: "new title",
      author: "new author",
      url: "new url",
    };

    const newBlogHandler = (blog) => {
      fireEvent.change(title, { target: { value: blog.title } });
      fireEvent.change(author, { target: { value: blog.author } });
      fireEvent.change(url, { target: { value: blog.url } });
    };

    component = render(
      <CreateNewBlog
        createBlog={() => {
          newBlogHandler(newBlog);
        }}
      />
    );
    createBlogButton = component.getByText("Create Blog");
    const title = component.container.querySelector("#title");
    const author = component.container.querySelector("#author");
    const url = component.container.querySelector("#url");
  });

  test("CreateNewBlog form gets correct values", () => {
    fireEvent.click(createBlogButton);
    expect(title.value).toBe("new title");
    expect(author.value).toBe("new author");
    expect(url.value).toBe("new url");
  });
});
