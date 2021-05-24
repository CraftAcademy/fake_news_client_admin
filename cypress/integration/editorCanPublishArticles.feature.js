describe('editor can publish articles', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://fakest-newzz.herokuapp.com/api/articles', {
      fixture: 'listOfArticles.json',
    });
  });

  describe('Successfully through signing in', () => {
    before(() => {
      cy.intercept(
        'POST',
        'https://fakest-newzz.herokuapp.com/api/auth/sign_in',
        {
          fixture: 'handleEditorLogin.json',
        }
      );
      cy.visit('/');
      cy.get('[data-cy=login-form]').within(() => {
        cy.get('[data-cy=login-username]').type('mrEditor@fakenews.com');
        cy.get('[data-cy=login-password]').type('password');
        cy.get('[data-cy=login-btn]').click();
      });
    });

    it('is expected to show edit button in dashboard', () => {
      cy.get('[ data-cy=article]').within(() => {
        cy.get('[data-cy=publish-btn]').click();
      });
      cy.get('[data-cy=popup-message]').should('contain', 'The article has successfully been published')
    });
  });
});
