describe('User can see their articles', () => {
  beforeEach(() => {
    cy.intercept(
      'GET',
      'http://localhost:3000/api/auth/sign_in/auth/validate_token',
      {
        fixture: 'handleLogin.json',
      }
    );
  });

  describe('Successfully', () => {
    beforeEach(() => {
      cy.intercept('GET', 'http://localhost:3000/api/auth/sign_in/articles', {
        fixture: 'listOfArticles.json',
      });
      cy.visit('/dashboard');
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
          cy.get('[data-cy=date]').should(
            'contain',
            'Created at: 2021-05-12, 18:14'
          );
        });
    });

    it('is expected to show the name of the journaist', () => {
      cy.get('[data-cy=greeting]').should('contain', 'WELCOME BACK MR. FAKE');
    });
  });

  describe('Unsuccessfully', () => {
    describe('as there is no articles to show', () => {
      beforeEach(() => {
        cy.intercept('GET', 'http://localhost:3000/api/auth/sign_in/articles', {
          statusCode: 204,
        });
        cy.visit('/dashboard');
      });

      it.only('is expected to show the message if there are no articles', () => {
        cy.get('[data-cy=no-articles-message]').should(
          'contain',
          "You don't have any articles yet"
        );
      });
    });

    describe('because the the service is down', () => {
      beforeEach(() => {
        cy.intercept('GET', 'http://localhost:3000/api/auth/sign_in/articles', {
          statusCode: 500,
        });
        cy.visit('/dashboard');
      });

      it('is expected to show error message', () => {
        cy.get('[data-cy=popup-message]').should(
          'contain',
          'Something went wrong on our server, try again later'
        );
      });
    });
  });
});
