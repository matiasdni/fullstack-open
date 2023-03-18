describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const testUser = {
      username: "testUser",
      name: "testUser",
      password: "testUser",
    };
    cy.request("POST", "http://localhost:3003/api/users", testUser);
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("Log in to application");
    cy.contains("username");
    cy.contains("password");
    cy.contains("login");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("testUser");
      cy.get("#password").type("testUser");
      cy.get("#loginButton").click();
      cy.contains("testUser logged in");
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("testUser");
      cy.get("#password").type("testUsers");
      cy.get("#loginButton").click();
      cy.contains("wrong username or password");
      cy.get("#notification").invoke("css", "color").should("equal", "red");

      cy.contains("Log in to application");
      cy.contains("username");
      cy.contains("password");
      cy.contains("login");
    });
  });

  describe("when logged in", function () {
    beforeEach(function () {
      cy.get("#username").type("testUser");
      cy.get("#password").type("testUser");
      cy.get("#loginButton").click();
    });

    it("new blog can be created", function () {
      cy.contains("create new blog").click();
      cy.get("#title").type("cypress test blog");
      cy.get("#author").type("Test User");
      cy.get("#url").type("www.cypresstestblog.com");
      cy.get("#createButton").click();

      cy.contains("cypress test blog");
      cy.contains("Test User");
    });

    it("blog can be liked", function () {
      // create new blog
      cy.contains("create new blog").click();
      cy.get("#title").type("cypress test blog");
      cy.get("#author").type("Test User");
      cy.get("#url").type("www.cypresstestblog.com");
      cy.get("#createButton").click();
      // open blog details and like it
      cy.contains("view").click();
      cy.contains("likes 0");
      cy.contains("like").click();
      cy.contains("likes 1");
    });

    it("blog can be removed", function () {
      // create new blog
      cy.contains("create new blog").click();
      cy.get("#title").type("another test blog");
      cy.get("#author").type("Test User");
      cy.get("#url").type("www.cypresstesaaatblog.com");
      cy.get("#createButton").click();
      // open blog details and remove it
      cy.contains("view").click();
      cy.contains("remove").click();
      cy.contains("another test blog by Test User removed");
    });
  });

  describe("blogs", function () {
    beforeEach(function () {
      cy.request("POST", "http://localhost:3003/api/login", {
        username: "testUser",
        password: "testUser",
      }).then((response) => {
        localStorage.setItem("loggedUser", JSON.stringify(response.body));
        cy.visit("http://localhost:3000");
      });

      const blog1 = {
        title: "The title with the second most likes",
        author: "testUser",
        url: "testUser.com",
        likes: 5,
      };

      const blog2 = {
        title: "The title with the most likes",
        author: "testUser",
        url: "testUser.com",
        likes: 50,
      };

      cy.createBlog(blog1);
      cy.createBlog(blog2);
    });

    it("blog are sorted by likes", function () {
      cy.get(".blog").eq(0).should("contain", "The title with the most likes");
      cy.get(".blog")
        .eq(1)
        .should("contain", "The title with the second most likes");
    });
  });
});
