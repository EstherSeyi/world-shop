/// <reference types="cypress" />

import productsJson from "../fixtures/products.json";

const { _ } = Cypress;

const dummyProducts = productsJson.data.giftCardsRLD.content;

const firstProduct = dummyProducts[0];
const secondProduct = dummyProducts[7];

describe("Cart page", () => {
  // visit home page
  // add two products to cart
  // navigate to cart page
  // fetch cart from localstorage

  let storage: any[];

  beforeEach(() => {
    cy.intercept("GET", "https://api.chimoney.io/v0.2/info/assets", {
      fixture: "products.json",
    }).as("getProducts");

    cy.visit("/");

    cy.get(`[data-cy="product-${firstProduct.productId}"]`).click().wait(1000);

    cy.get('[data-cy="add-to-cart-btn"]')
      .click()
      .then(() => {
        cy.get('[data-cy="back-to-shop-link"]').click();
      });

    cy.get(`[data-cy="product-${secondProduct.productId}"]`).click().wait(1000);

    cy.get('[data-cy="add-to-cart-btn"]')
      .click()
      .then(() => {
        cy.get('[data-cy="cart"]')
          .click()
          .wait(1000)
          .then(() => {
            cy.location().then((location) => {
              const origin = location.origin;

              cy.getAllLocalStorage().then((localStorage) => {
                const cart = localStorage[origin].cart;
                storage = JSON.parse(cart as string).items;
              });
            });
          });
      });
  });

  it("should display two products on the cart page", () => {
    cy.get('[data-cy="back-to-shop-link"]').should("be.visible");
    cy.contains("shopping cart", { matchCase: false });
    cy.get('[data-cy="clear-cart"]').should("be.visible");

    cy.log(storage[0]);

    _.each(storage, (item, index) => {
      const product = dummyProducts.find(
        (product) => product.productId === item.id
      );
      cy.contains(product!.name);
      cy.get("img")
        .should("be.visible")
        .and(($img) => {
          expect($img[0].naturalWidth).to.be.greaterThan(0);
        });
    });
  });

  it("should validate total amount and quantity in cart", () => {
    const total = storage.reduce(
      (acc, item) => {
        acc["amount"] += item.amount;
        acc["quantity"] += item.quantity;
        return acc;
      },
      { amount: 0, quantity: 0 }
    );

    cy.log(total);

    cy.get('[data-cy="cart-amount"]').then(($elem) => {
      const text = $elem.text();
      const amount = text.split(".")[0].slice(1);

      expect(Number(amount)).to.equal(total.amount);
    });

    cy.get('[data-cy="cart-quantity"]').then(($elem) => {
      const text = $elem.text();
      const [quantity] = text.match(/\d+/g) as string[];

      expect(Number(quantity)).to.equal(total.quantity);
    });
  });

  it("should delete a product from the cart", () => {
    cy.get(`[data-cy="item-${secondProduct.productId}-delete"]`)
      .click()
      .then(() => {
        cy.get(`[data-cy="item-${secondProduct.productId}"]`).should(
          "not.exist"
        );
      });
  });

  it("should delete all items from the cart", () => {
    cy.get('[data-cy="clear-cart"]')
      .click()
      .then(() => {
        cy.get('[data-cy="clear-cart"]').should("not.exist");
      });
  });
});

export {};
