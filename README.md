# NextJs_Practice
** This is the NexJs project. **  
==========
<ins> 1. Nextjs giải quyết vấn đề gì ? </ins>
+ Render website ở server -> SEO
+ Tối ưu image,font,script, Routing ,Middleware , Server Action, SEO

======== Next Project Structure
+ .Next folder : chứa code khi build 
+ src/app : app router
+ page.tsx : the same with index.js
+ next.config.ts : configuration of next.js
+ postcss.config : 
+ tailwin.config.ts : Sửa content khi muốn thêm đường dẫn cho tailwind hiểu file muốn css 
+ Css: globals.css ; 
    .Thành phần cơ bản của HTML: h1, h2 , thẻ html 
        -> đưa vào @layer base . 
        => Tailwind sẽ biết độ ưu tiên để override lại . sắp xếp trong file global
    . Module: chỉ apply cho component đó thôi
    . SCSS : npm i sass
    . clsx : dùng cho class động 
+ Khi dùng Hooks thì phải 'use client' , event- listener : onClick, use window.cookie, window.location: api from brower
+ Routing : 
    . Link (a tag) : recommend
    . useRouter : work with CR
    . redirect (not work in event-handler) : work with both CR,SR 
+ Rendering: Hybrid , Network Boundary , default : all components will rendered html when nextjs build.
    . Client Component:  default (but user can't not react with DOM ) -> render again CC to sync with DOM, event ,
         state, effect: 2 times   rende r: build + 1 time at client ( React Server Component Payload)
        ==> SEO not good 
 
    . Server Component : Default when creating , cache, allow private data, streaming , SEO , Reduce Bundersize
+ LifeCycle of Next Js : 
==== The first time , you access the nextjs website : F5,
    1. Server + Client -> Render Html 
    2. Client see website right away but not react with it ( click , hover)
    3. Load JS bunder  ( contains React Server Component Payload) to re-render component at client . update DOM
    4. Finally, Adding events into client componentto react with users : Called Hydration
==== The second time : Navigate between pages : Example ; /Home -> /About
    1. Server does not return HTML , it will return RSC Payload , css, js 
    2 Client render HTML automatically .
+ Process.env : client : will be object empty 

====================================================================

# ** Install environment ** 

- Nodejs
- Yarn or Npm
- Visual studio code
- Cypress

# Cypress concept

    //Theory
    //get() - find elements on the page by locator globally
    //find() - find child elements by locator
    //contains() - find HTML text and by text and locator : it will match with the first item

## ** 1. Getting method **

NOTE: How to run cypress : 
    - npx cypress open : ( run with open mode)
    - npx cypress run : ( run with headless mode)

    a. Cy.get()

    //by Tag name
     ``` cy.get("input");  ```

    //by ID
     ``` cy.get("#inputEmail1");  ```

    //by Class value
    cy.get(".input-full-width");

    //by Attribute name
    cy.get("[fullwidth]");

    //by Attribute and value
    cy.get('[placeholder="Email"]');

    //by entire Class value
    cy.get('[class="input-full-width size-medium shape-rectangle"]');

    //by two attributes
    cy.get('[placeholder="Email"][fullwidth]');

    //by tag, attribute, id and class
    cy.get('input[placeholder="Email"]#inputEmail1.input-full-width');

    //by cypress test ID : Recommend
    cy.get('[data-cy="imputEmail1"]');

    b.Cy.contain()

    cy.contains("Sign in");
    cy.contains('[status="warning"]', "Sign in");
    cy.contains("nb-card", "Horizontal form").find("button");
    cy.contains("nb-card", "Horizontal form").contains("Sign in");
    cy.contains("nb-card", "Horizontal form").get("button"); //get all button on page

    //cypress chains and DOM
    cy.get("#inputEmail3")
      .parents("form")
      .find("button")
      .should("contain", "Sign in")
      .parents("form")
      .find("nb-checkbox")
      .click();

##  ** 2.Saving object command **
NOTE:
     CAN'T DO THING LIKE THIS
    // const usingTheGrid = cy.contains("nb-card", "Using the Grid");
    // usingTheGrid.find('[for="inputEmail1"]').should("contain", "Email");
    // usingTheGrid.find('[for="inputPassword2"]').should("contain", "Password");

    a. Cypress Alias : globally

    cy.contains("nb-card", "Using the Grid").as("usingTheGrid");
    cy.get("@usingTheGrid")
      .find('[for="inputEmail1"]')
      .should("contain", "Email")
    cy.get("@usingTheGrid")
      .find('[for="inputPassword2"]')
      .should("contain", "Password");

    b. Cypress then() methods ; internal

    cy.contains("nb-card", "Using the Grid").then((usingTheGridForm) => {
      cy.wrap(usingTheGridForm)
        .find('[for="inputEmail1"]')
        .should("contain", "Email");
    });

##  ** 3. Extracting text values **
a. JQuery

    cy.get('[for="exampleInputEmail1"]').then((label) => {
      console.log(label.text());
      cy.log(label.text());
      const labelText = label.text();
      expect(labelText).to.equal("Email address");
      cy.wrap(labelText).should("contain", "Email address");
    });

    b. Invoke : Call method on selected item. When you want to get text, property, value or call function on selected item.

    cy.get('[for="exampleInputEmail1"]')
      .invoke("text")
      .then((text) => {
        expect(text).to.equal("Email address");
      });
    cy.get('[for="exampleInputEmail1"]')
      .invoke("text")
      .as("labelText")
      .should("contain", "Email address");

    c. Get class : Example for status of checkbox: checked

    cy.get('[for="exampleInputEmail1"]')
      .invoke("attr", "class")
      .then((classValue) => {
        expect(classValue).to.equal("label");
      });

    d. Invoke property

    cy.get("#exampleInputEmail1").type("test@gmail.com");
    cy.get("#exampleInputEmail1")
      .invoke("prop", "value")
      .should("contain", "test@gmail.com");

##  ** 4. Checkboxes and Radio button **
    a. Radio
        cy.contains("nb-card", "Using the Grid")
            .find('[type="radio"]')
            .then((radioButtons) => {
            cy.wrap(radioButtons).eq(0).check({ force: true }).should("be.checked"); //force : should not use in project
            cy.wrap(radioButtons).eq(1).check({ force: true });
            cy.wrap(radioButtons).eq(0).should("not.be.checked");
            cy.wrap(radioButtons).eq(2).should("be.disabled");
            });
    b. Checkbox

        cy.get("nb-checkbox")
        .find('[type="checkbox"]')
        .then((checkboxes) => {
            cy.wrap(checkboxes).eq(0).click({ force: true });
        });

    // Get all
    cy.get('[type="checkbox"]').uncheck({ force: true });
    cy.get('[type="checkbox"]').eq(0).check({ force: true });

##  ** 5. Api Mocking and Fixture **

    a. Mocking api response 

        cy.intercept("GET", Cypress.env("apiUrl") + "/api/tags", {
        fixture: "tags.json",
        });

    b. Modify the fixture data

            cy.fixture("articles.json").then((file) => {
            const articleLink = file.articles[0].slug;
            file.articles[0].favoriteCount = 6;
            cy.intercept(
                "POST",
                Cypress.env("apiUrl") + `/api/articles/${articleLink}/favorite`,
                file
            );
            });

    c. Custom request

        cy.intercept("POST", "**/articles", (req) => {
            req.reply((res) => {
                expect(res.body.article.description).to.equal(
                "this is the description"
                );
                res.body.article.description = "this is the description 2";
            });
        }).as("postArticle");

##  ** 6. Customize Cypress Command **

    a. Add cypress command (support/command.ts)

        Cypress.Commands.add("loginViaUser", (user) => {
            cy.visit("/login");
            cy.get("[data-cy=email]").type(user.email);
            cy.get("[data-cy=password]").type(user.password);
            cy.get("[data-cy=login-btn]").click();
        });

    b. Using cypress command in code (pages or .ts files)

        accessHomePage(user) {
            cy.loginViaUser(user.email, user.password);
        }
