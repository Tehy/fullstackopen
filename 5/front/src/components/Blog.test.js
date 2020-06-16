import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";

describe("Blog tests", () => {
  let component;
  let likeButton;
  let viewButton;
  const mockHandler = jest.fn();
  beforeEach(() => {
    const user = { username: test };
    const blog = {
      title: "blog_title",
      author: "blog_author",
      likes: 100,
      url: "blog_url",
      user: {
        username: test,
      },
    };

    const showDelBtnIfOwner = () => <button>delete</button>;
    component = render(
      <Blog
        blog={blog}
        user={user}
        showDelBtnIfOwner={showDelBtnIfOwner}
        plusLike={mockHandler}
      />
    );
    likeButton = component.getByText("like");
    viewButton = component.getByText("view");
  });

  test("renders content", () => {
    expect(component.container).toHaveTextContent("blog_title");
    expect(component.container).toHaveTextContent("blog_author");
  });
  test("renders all Blog data after 'view' button is pressed ", () => {
    const togglable = component.container.querySelector("#togglable");
    expect(togglable).toHaveStyle("display: none");
    fireEvent.click(viewButton);
    expect(togglable).toHaveStyle("display: block");
  });
  test("clicking the 'like' button twice calls event handler twice", async () => {
    fireEvent.click(likeButton);
    fireEvent.click(likeButton);
    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
