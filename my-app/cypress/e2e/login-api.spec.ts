/// <reference types="cypress" />

describe("Login Api", () => {
  beforeEach("Login to application", () => {
    // Mocking api response
    cy.intercept("GET", Cypress.env("apiUrl") + "/api/tags", {
      fixture: "tags.json",
    });
    cy.loginToApplication();

    // Intercepting Pattern : cy.intercept(routeMatcher, staticResponse)
    // cy.intercept(
    //   { method: "Get", path: "/tags" },
    //   {
    //     fixture: "tags.json",
    //   }
    // );
  });

  it("first test", () => {
    cy.log("Logged in");
  });
  it("verify correct request and response", () => {
    // should put intercept here , cypress will wait until it gets the response
    cy.intercept("POST", Cypress.env("apiUrl") + "/api/articles/").as(
      "postArticle"
    );

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
  it("verify global feed likes count", () => {
    cy.intercept("GET", Cypress.env("apiUrl") + "/api/articles/feed*", {
      articles: [],
      articlesCount: 0,
    });
    cy.intercept("GET", Cypress.env("apiUrl") + "/api/articles*", {
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
        Cypress.env("apiUrl") + `/api/articles/${articleLink}/favorite`,
        file
      );
    });

    cy.get("app-favorite-button button").eq(0).click().should("contain", "6");
  });
  it("intercepting and modifying the request and response", () => {
    // custom request
    // cy.intercept("POST", "**/articles", (req) => {
    //   req.body.article.description = "this is the description 2";
    // }).as("postArticle");

    cy.intercept("POST", "**/articles", (req) => {
      req.reply((res) => {
        expect(res.body.article.description).to.equal(
          "this is the description"
        );
        res.body.article.description = "this is the description 2";
      });
    }).as("postArticle");

    cy.contains("New Article").click();
    cy.get('[formcontrolname="title"]').type("this is the title 9");
    cy.get('[formcontrolname="description"]').type("this is the description");
    cy.get('[formcontrolname="body"]').type("this is the body");
    cy.contains("Publish Article").click();

    cy.wait("@postArticle");
    cy.get("@postArticle").then((xhr) => {
      console.log(xhr);
      expect(xhr.response.statusCode).to.equal(201);
      expect(xhr.response.body.article.title).to.equal("this is the title 9");
      expect(xhr.response.body.article.description).to.equal(
        "this is the description 2"
      );
    });
  });
  it.only(
    "delete a new article in a global feed",
    { retries: { openMode: 0 } },
    () => {
      const dynamicId = Math.random().toString(36);
      const bodyRequest = {
        article: {
          tagList: [],
          title: "Request from API" + dynamicId,
          description: "Request from API desc",
          body: "Request from API body",
        },
      };
      cy.get("@token").then((token) => {
        cy.request({
          url: Cypress.env("apiUrl") + "/api/articles",
          method: "POST",
          headers: {
            Authorization: `Token ${token}`,
          },
          body: bodyRequest,
        }).then((res) => {
          expect(res.status).to.equal(201);
        });

        cy.contains("Global Feed").click();
        cy.get(".preview-link").first().click();
        cy.get(".article-actions").contains("Delete Article").click();
        //
        cy.request({
          url: Cypress.env("apiUrl") + "/api/articles?limit=10&offset=0",
          method: "GET",
          headers: {
            Authorization: `Token ${token}`,
          },
        })
          .its("body")
          .then((body) => {
            expect(body.articles[0].title).not.to.equal(
              "Request from API" + dynamicId
            );
          });
      });
    }
  );
});
