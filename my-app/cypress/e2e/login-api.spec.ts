/// <reference types="cypress" />

describe("Login Api", () => {
  beforeEach("Login to application", () => {
    // Mocking api response
    cy.intercept("GET", "https://conduit-api.bondaracademy.com/api/tags", {
      fixture: "tags.json",
    });
    cy.loginToApplication();
  });

  it("first test", () => {
    cy.log("Logged in");
  });
  it("verify correct request and response", () => {
    // should put intercept here , cypress will wait until it gets the response
    cy.intercept(
      "POST",
      "https://conduit-api.bondaracademy.com/api/articles/"
    ).as("postArticle");

    cy.contains("New Article").click();
    cy.get('[formcontrolname="title"]').type("this is the title 2");
    cy.get('[formcontrolname="description"]').type("this is the description");
    cy.get('[formcontrolname="body"]').type("this is the body");
    cy.contains("Publish Article").click();

    cy.wait("@postArticle");
    cy.get("@postArticle").then((xhr) => {
      console.log(xhr);
      expect(xhr.response.statusCode).to.equal(201);
      expect(xhr.response.body.article.title).to.equal("this is the title 2");
    });
  });

  //Mocking api
  it("verify popular tags are displayed", () => {
    cy.log("Logged in");
    cy.get(".tag-list").should("contain", "Cypress");
  });
  it.only("verify global feed likes count", () => {
    cy.intercept(
      "GET",
      "https://conduit-api.bondaracademy.com/api/articles/feed*",
      { articles: [], articlesCount: 0 }
    );
    cy.intercept("GET", "https://conduit-api.bondaracademy.com/api/articles*", {
      fixture: "articles.json",
    });

    cy.contains("Global Feed").click();
    cy.get("app-favorite-button button").then((heartList) => {
      expect(heartList[0]).to.contain("5");
      expect(heartList[1]).to.contain("3");
    });

    // Modify the fixture data
    cy.fixture("articles.json").then((file) => {
      const articleLink = file.articles[0].slug;
      file.articles[0].favoriteCount = 6;
      cy.intercept(
        "POST",
        `https://conduit-api.bondaracademy.com/api/articles/${articleLink}/favorite`,
        file
      );
    });

    cy.get("app-favorite-button button").eq(0).click().should("contain", "6");
  });
});
