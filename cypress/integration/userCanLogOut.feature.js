describe('User can log out', () => {
  beforeEach(() => {
    cy.intercept(
      'POST',
      'https://fakest-newzz.herokuapp.com/api/auth/sign_in',
      {
        fixture: 'handleLogin.json',
      }
    );
    cy.intercept('GET', 'https://fakest-newzz.herokuapp.com/api/articles', {
      fixture: 'listOfArticles.json',
    });
    cy.intercept(
      'DELETE',
      'https://fakest-newzz.herokuapp.com/api/auth/sign_out',
      {
        statusCode: 200,
      }
    );
    cy.visit('/');
    cy.get('[data-cy=login-form]').within(() => {
      cy.get('[data-cy=login-username]').type('user@mail.com');
      cy.get('[data-cy=login-password]').type('password');
      cy.get('[data-cy=login-btn]').click();
    });
  });
  describe('user succsessfully log out', () => {
    it('is expected to get redirected back to main page', () => {
      cy.get('[data-cy=logout-button]').click();
      cy.get('[data-cy=login-btn]').should('be.visible');
      cy.get('[data-cy=popup-message]').should(
        'contain',
        'You have been logged out'
      );
      cy.get('[data-cy=logout-button]').should('not.exist');
    });
  });
});
