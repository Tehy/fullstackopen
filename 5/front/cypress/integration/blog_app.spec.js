const { get } = require("mongoose");

describe("Blog ", function () {
  describe("Blog app", function () {
    beforeEach(function () {
      cy.request("POST", "http://localhost:3001/api/testing/reset");
      cy.request("POST", "http://localhost:3001/api/users/", {
        user: "m_luukkai",
        username: "mluukkai",
        password: "salainen",
      });
      cy.visit("http://localhost:3000");
    });
    it("Login form is shown", function () {
      cy.contains("login").click();
    });
    describe("Login", function () {
      it("succeeds with correct credentials", function () {
        cy.contains("login").click();
        cy.get("#username").type("mluukkai");
        cy.get("#password").type("salainen");
        cy.contains("Login").click();
        cy.contains("logged in").click();
      });

      it("fails with wrong credentials", function () {
        cy.contains("login").click();
        cy.get("#username").type("mluukkai");
        cy.get("#password").type("salaine");
        cy.contains("Login").click();
        //cy.get("#notification").attr(color, [red]);
        cy.contains("Wrong username").click();
      });
    });
    describe.only("When logged in", function () {
      beforeEach(function () {
        cy.contains("login").click();
        cy.get("#username").type("mluukkai");
        cy.get("#password").type("salainen");
        cy.contains("Login").click();
        cy.contains("mluukkai logged in").click();
      });

      it("A blog can be created", function () {
        cy.contains("Create new blog").click();
        cy.get("#title").type("test_title");
        cy.get("#author").type("test_author");
        cy.get("#url").type("test_url");
        cy.contains("Create Blog").click();
        cy.contains("test_title");
        cy.contains("test_author");
      });
      it("A blog can be liked", function () {
        cy.contains("Create new blog").click();
        cy.get("#title").type("test_title");
        cy.get("#author").type("test_author");
        cy.get("#url").type("test_url");
        cy.contains("Create Blog").click();
        cy.contains("test_title");
        cy.contains("test_author");
        cy.contains("view").click();
        cy.contains("like").click();
        cy.contains("1");
      });
      it("A blog can be deleted", function () {
        cy.contains("Create new blog").click();
        cy.get("#title").type("test_title");
        cy.get("#author").type("test_author");
        cy.get("#url").type("test_url");
        cy.contains("Create Blog").click();
        cy.contains("test_title");
        cy.contains("test_author");
        cy.contains("view").click();
        cy.contains("remove").click();
      });
      it.only("Blog are arranged by likes", function () {
        cy.contains("Create new blog").click();
        cy.get("#title").type("test_title");
        cy.get("#author").type("test_author");
        cy.get("#url").type("test_url");
        cy.contains("Create Blog").click();
        cy.contains("test_title");
        cy.contains("test_author");
        cy.contains("Create new blog").click();
        cy.get("#title").clear().type("test_title2");
        cy.get("#author").clear().type("test_author2");
        cy.get("#url").clear().type("test_url2");
        cy.contains("Create Blog").click();

        cy.wait(300);

        cy.get(".blog").eq(1).contains("view").click();

        cy.get(".blog").eq(1).contains("like").click();
        cy.wait(300);
        cy.get(".blog").eq(0).contains("view").click();
        cy.get(".blog").eq(0).contains("Likes: 1");
      });
    });
  });
});
