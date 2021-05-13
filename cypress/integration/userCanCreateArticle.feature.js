describe('User can create article', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.intercept(
      'POST',
      'https://fake-newzzzz.herokuapp.com/api/auth/sign_in',
      {
        fixture: 'handleLogin.json',
      }
    );
    cy.get('[data-cy=login-form]').within(() => {
      cy.get('[data-cy=login-username]').type('user@mail.com');
      cy.get('[data-cy=login-password]').type('password');
      cy.get('[data-cy=login-btn]').click();
    });
  });

  describe('successfully', () => {
    before(() => {
      cy.intercept('POST', 'https://fake-newzzzz.herokuapp.com/api/articles', {
        message: 'Your article has successfully been created',
      });
    });

    it('can fill the article creation form and submit', () => {
      cy.get('[data-cy=create-article-btn]').click();
      cy.get('[data-cy=article-creation-modal]').should('be.visible');
      cy.get('[data-cy=article-creation-form]').within(() => {
        cy.get('[data-cy=title]').type('Title');
        cy.get('[data-cy=teaser]').type('CIA is spying on you');
        cy.get('[data-cy=body]').type('No for real! Get a tinfoil hat quick!');
        cy.get('[data-cy=categories]').click();
        cy.get('.item').contains('Flat Earth').click();
        cy.get('[data-cy=submit-btn]').click();
      });
      cy.get('[data-cy=popup-message]').should(
        'contain',
        'Your article has successfully been created'
      );
      cy.wait(1000);
    });
  });

  describe('unsuccessfully', () => {
    before(() => {
      cy.intercept('POST', 'https://fake-newzzzz.herokuapp.com/api/articles', {
        statusCode: 500,
      });
    });

    it('can fill the article creation form and submit', () => {
      cy.get('[data-cy=create-article-btn]').click();
      cy.get('[data-cy=article-creation-modal]').should('be.visible');
      cy.get('[data-cy=article-creation-form]').within(() => {
        cy.get('[data-cy=title]').type('Title');
        cy.get('[data-cy=teaser]').type('CIA is spying on you');
        cy.get('[data-cy=body]').type('No for real! Get a tinfoil hat quick!');
        cy.get('[data-cy=categories]').click();
        cy.get('.item').contains('Flat Earth').click();
        cy.get('[data-cy=submit-btn]').click();
      });
      cy.get('[data-cy=popup-message]').should(
        'contain',
        'Something went wrong on our server, try again later'
      );
    });
  });
});
