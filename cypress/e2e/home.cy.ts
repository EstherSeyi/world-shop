/// <reference types="cypress" />

import productsJson from "../fixtures/products.json";

const { _ } = Cypress;

const dummyProducts = productsJson.data.giftCardsRLD.content;

describe("Home page", () => {
  beforeEach(() => {
    cy.intercept("GET", "https://api.chimoney.io/v0.2/info/assets", {
      fixture: "products.json",
    }).as("getProducts");

    cy.visit("/");
  });

  it("renders all products on the home page", () => {
    cy.get('[data-cy="product-list"]').within(() => {
      _.each(dummyProducts, (product) => {
        const productTitle = product.name;

        cy.get(`[data-cy="product-${product.productId}"]`).contains(
          productTitle,
          { matchCase: false }
        );
      });
    });
  });

  it("renders a page title", () => {
    cy.get('[data-cy="page-title"]').contains("Gift cards", {
      matchCase: false,
    });
  });

  it("renders an empty cart", () => {
    cy.get('[data-cy="cart"]').within(() => {
      cy.get('[data-cy="cart-products-quantity"]').contains("0", {
        matchCase: false,
      });
    });
  });

  it("clicking a product card opens a page showing details of the product", () => {
    const product = dummyProducts[0];

    cy.get(`[data-cy="product-${product.productId}"]`)
      .click()
      .then(() => {
        cy.location().should((location) => {
          expect(location.pathname).to.include(product.productId);
        });
      });
  });
});

export {};
