describe('User can see their articles', () => {
  beforeEach(() => {
    cy.intercept(
      'GET',
      'https://fake-newzzzz.herokuapp.com/api/auth/validate_token',
      {
        fixture: 'handleLogin.json',
      }
    );
    cy.visit('/dashboard');
  });

  describe('Successfully', () => {
    beforeEach(() => {
      cy.intercept('GET', 'https://fake-newzzzz.herokuapp.com/api/articles', {
        fixture: 'listOfArticles.json',
      });
    });

    it('is expected to show the list of articles', () => {
      cy.get('[data-cy=article]').should('have.length', 4);
    });

    it('is expected to show the first article', () => {
      cy.get('[data-cy=article]')
        .first()
        .within(() => {
          cy.get('[data-cy=title]').should(
            'contain',
            "Amateur Rocket-Maker Finally Launches Himself Off Earth - Now To Prove It's Flat"
          );
          cy.get('[data-cy=date]').should('contain', '2021-05-12, 18:14');
        });
    });

    it('is expected to show the name of the journaist', () => {
      cy.get('[data-cy=greeting]').should('contain', 'Mr. Fake');
    });
  });
});
