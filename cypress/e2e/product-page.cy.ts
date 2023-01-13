/// <reference types="cypress" />

import productsJson from "../fixtures/products.json";

const dummyProducts = productsJson.data.giftCardsRLD.content;

const product = dummyProducts[0];

describe("Product page", () => {
  beforeEach(() => {
    cy.intercept("GET", "https://api.chimoney.io/v0.2/info/assets", {
      fixture: "products.json",
    }).as("getProducts");

    cy.visit("/");

    cy.get(`[data-cy="product-${product.productId}"]`).click();

    cy.wait(1000);
  });

  it("renders product content", () => {
    cy.get(`[data-cy="product-page"]`).within(() => {
      cy.get('[data-cy="back-to-shop-link"]').should("be.visible");
      cy.get(`[data-cy="product-image"]`)
        .should("be.visible")
        .and(($img) => {
          //@ts-expect-error
          expect($img[0].naturalWidth).to.be.greaterThan(0);
        });
      cy.contains(product.name);
      cy.contains(product.description);
      cy.contains("select amount", { matchCase: false });
      cy.get('[data-cy="add-to-cart-btn"]').should("be.visible");
    });
  });

  it("should add product to cart", () => {
    cy.get('[data-cy="add-to-cart-btn"]')
      .click()
      .then(() => {
        cy.get('[data-cy="cart-products-quantity"]').contains("1", {
          matchCase: false,
        });
        // checks if toast is displayed
        cy.contains("go to cart", { matchCase: false });
      });
  });
});

export {};
