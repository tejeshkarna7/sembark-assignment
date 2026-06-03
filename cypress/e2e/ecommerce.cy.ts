describe('E-Commerce App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  describe('Home Page', () => {
    it('should load the home page with products', () => {
      cy.get('h1').should('contain', 'Products');
      cy.get('article').should('have.length.greaterThan', 0);
    });

    it('should display category filter', () => {
      cy.get('h2').should('contain', 'Filter by Category');
      cy.get('input[type="checkbox"]').should('have.length.greaterThan', 0);
    });

    it('should navigate to product detail on product click', () => {
      cy.get('article').first().click();
      cy.url().should('include', '/product/');
      cy.url().should('include', '/details');
    });
  });

  describe('Product Detail Page', () => {
    beforeEach(() => {
      cy.get('article').first().click();
    });

    it('should display product details', () => {
      cy.get('h1').should('exist');
      cy.contains('Price:').should('exist');
      cy.contains('Description').should('exist');
    });

    it('should have add to cart button', () => {
      cy.contains('button', 'Add to My Cart').should('exist');
    });

    it('should allow adding product to cart', () => {
      cy.contains('button', 'Add to My Cart').click();
      cy.contains('Added to cart successfully').should('be.visible');
    });

    it('should have back button', () => {
      cy.contains('button', 'Back to Home').should('exist').click();
      cy.url().should('equal', 'http://localhost:3000/');
    });
  });

  describe('Cart Page', () => {
    it('should show empty cart message when no items', () => {
      cy.visit('http://localhost:3000/cart');
      cy.contains('Your cart is empty').should('be.visible');
    });

    it('should display cart items after adding', () => {
      cy.get('article').first().click();
      cy.contains('button', 'Add to My Cart').click();
      cy.visit('http://localhost:3000/cart');
      cy.get('table tbody tr').should('have.length', 1);
    });

    it('should allow removing items from cart', () => {
      cy.get('article').first().click();
      cy.contains('button', 'Add to My Cart').click();
      cy.visit('http://localhost:3000/cart');
      cy.contains('button', 'Remove').click();
      cy.contains('Your cart is empty').should('be.visible');
    });
  });

  describe('Header Navigation', () => {
    it('should display cart count in header', () => {
      cy.get('article').first().click();
      cy.contains('button', 'Add to My Cart').click();
      cy.get('a').contains(/Cart.*\(\d+\)/).should('be.visible');
    });

    it('should navigate to home on logo click', () => {
      cy.get('article').first().click();
      cy.get('a').contains('Sembark Shop').click();
      cy.url().should('equal', 'http://localhost:3000/');
    });

    it('should navigate to cart on cart link click', () => {
      cy.get('a').contains('Cart').click();
      cy.url().should('include', '/cart');
    });
  });

  describe('Category Filtering', () => {
    it('should filter products by category', () => {
      cy.get('input[type="checkbox"]').first().click();
      cy.get('article').should('have.length.greaterThan', 0);
    });

    it('should maintain filter on URL', () => {
      cy.get('input[type="checkbox"]').first().click();
      cy.url().should('include', 'categories=');
    });

    it('should persist filter on page refresh', () => {
      cy.get('input[type="checkbox"]').first().click();
      cy.url().then((url) => {
        cy.reload();
        cy.url().should('equal', url);
        cy.get('input[type="checkbox"]').first().should('be.checked');
      });
    });
  });

  describe('Responsiveness', () => {
    it('should be responsive on mobile', () => {
      cy.viewport('iphone-x');
      cy.get('h1').should('be.visible');
      cy.get('article').should('have.length.greaterThan', 0);
    });

    it('should be responsive on tablet', () => {
      cy.viewport('ipad-2');
      cy.get('h1').should('be.visible');
      cy.get('article').should('have.length.greaterThan', 0);
    });
  });
});
