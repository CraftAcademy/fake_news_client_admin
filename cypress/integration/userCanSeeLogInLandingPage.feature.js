describe('User can see login landing page', () => {
  beforeEach(() => {
    cy.intercept('POST', 'https://fake-newzzzz.herokuapp.com/api/auth/sign_in', {
      fixture: 'handleLogin.json',
    });
    cy.visit('/');
  });

  describe('Successfully', () => {
    it('is expected to show login form', () => {
      cy.get('[data-cy=login-form]').should('exist');
      cy.get('[data-cy=login-form]').within(() => {
        cy.get('[data-cy=login-username]').type('user@mail.com');
        cy.get('[data-cy=login-password]').type('password');
        cy.get('[data-cy=login-btn]').click();
      });

      it('is expected to show main dashboard', () => {
        cy.get('[data-cy=create-article-btn]').should('be.visible');
      });
    });
  });
});
