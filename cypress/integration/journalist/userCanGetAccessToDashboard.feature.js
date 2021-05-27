describe('User can get access to dashboard', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://fakest-newzz.herokuapp.com/api/articles', {
      fixture: 'listOfArticles.json',
    });
  });

  describe('Successfully through signing in', () => {
    before(() => {
      cy.intercept(
        'GET',
        'https://fakest-newzz.herokuapp.com/api/auth/validate_token',
        {
          statusCode: 401,
        }
      );
      cy.intercept(
        'POST',
        'https://fakest-newzz.herokuapp.com/api/auth/sign_in',
        {
          fixture: 'handleLogin.json',
        }
      );
      cy.visit('/');
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

  describe('Successfully through token validation', () => {
    beforeEach(() => {
      cy.intercept(
        'GET',
        'https://fakest-newzz.herokuapp.com/api/auth/validate_token',
        {
          fixture: 'handleLogin.json',
        }
      );
      cy.visit('/');
    });

    it('is expected to send user directly to dashboard', () => {
      cy.url().should('contain', 'http://localhost:3002/dashboard');
      cy.get('[data-cy=create-article-btn]').should('be.visible');
      cy.wait(500);
    });
  });

  describe('Unsuccessfully through faulty sign in', () => {
    before(() => {
      cy.intercept(
        'GET',
        'https://fakest-newzz.herokuapp.com/api/auth/validate_token',
        {
          statusCode: 401,
        }
      );
      cy.intercept(
        'POST',
        'https://fakest-newzz.herokuapp.com/api/auth/sign_in',
        {
          statusCode: 401,
        }
      );
      cy.visit('/');
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

  describe('Unsuccessfully through token validation', () => {
    before(() => {
      cy.intercept(
        'GET',
        'https://fakest-newzz.herokuapp.com/api/auth/validate_token',
        {
          statusCode: 401,
        }
      );
      cy.visit('/');
    });

    it('is expected to send user directly to dashboard', () => {
      cy.visit('/dashboard');
      cy.url().should('contain', 'http://localhost:3002/');
      cy.get('[data-cy=login-form]').should('be.visible');
    });
  });
});
