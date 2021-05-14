describe('User can see login landing page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('Successfully', () => {
    before(() => {
      cy.intercept(
        'POST',
        'https://fake-newzzzz.herokuapp.com/api/auth/sign_in',
        {
          fixture: 'handleLogin.json',
        }
      );
    });

    it('is expected to show dashboard after login', () => {
      cy.get('[data-cy=login-form]').should('exist');
      cy.get('[data-cy=login-form]').within(() => {
        cy.get('[data-cy=login-username]').type('user@mail.com');
        cy.get('[data-cy=login-password]').type('password');
        cy.get('[data-cy=login-btn]').click();
      });
      cy.get('[data-cy=create-article-btn]').should('be.visible');
    });
  });

  describe('Unsuccessfully', () => {
    before(() => {
      cy.intercept(
        'POST',
        'https://fake-newzzzz.herokuapp.com/api/auth/sign_in',
        { statusCode: 401 }
      );
    });

    it('is expected to show error if login fails', () => {
      cy.get('[data-cy=login-form]').should('exist');
      cy.get('[data-cy=login-form]').within(() => {
        cy.get('[data-cy=login-username]').type('user@mail.com');
        cy.get('[data-cy=login-password]').type('password');
        cy.get('[data-cy=login-btn]').click();
      });
      cy.get('[data-cy=popup-message]').should(
        'contain',
        'You are not authorised to do this, contact your system adminstrator'
      );
    });
  });  
});
