describe('User can see their articles', () => {
  beforeEach(() => {
    cy.intercept(
      'GET',
      'https://fakest-newzz.herokuapp.com/api/auth/validate_token',
      {
        fixture: 'handleLogin.json',
      }
    );
  });

  describe('Successfully', () => {
    beforeEach(() => {
      cy.intercept('GET', 'https://fakest-newzz.herokuapp.com/api/articles', {
        fixture: 'listOfArticles.json',
      });
      cy.visit('/dashboard');
    });

    it('is expected to show the list of articles', () => {
      cy.get('[data-cy=article]').should('have.length', 7);
    });

    it('is expected to show the first article', () => {
      cy.get('[data-cy=article]')
        .first()
        .within(() => {
          cy.get('[data-cy=title]').should(
            'contain',
            'Moderna Chief Medical Officer Confirms mRNA Injection For COVID-19 Can Change Your Genetic Code.'
          );
          cy.get('[data-cy=category]').should('contain', 'Hollywood');
          cy.get('[data-cy=date]').should('contain', '2021-05-19, 15:10');
          cy.get('[data-cy=author]').should('contain', 'Bob Kramer');
          cy.get('[data-cy=rating]').should('be.visible');
        });
    });

    it('is expected to show the name of the journaist', () => {
      cy.get('[data-cy=greeting]').should('contain', 'WELCOME BACK MR. FAKE');
    });
  });

  describe('Unsuccessfully', () => {
    describe('as there is no articles to show', () => {
      beforeEach(() => {
        cy.intercept('GET', 'https://fakest-newzz.herokuapp.com/api/articles', {
          articles: [],
        });
        cy.visit('/dashboard');
      });

      it('is expected to show the message if there are no articles', () => {
        cy.get('[data-cy=no-articles-message]').should(
          'contain',
          "You don't have any articles yet"
        );
      });
    });

    describe('because the the service is down', () => {
      beforeEach(() => {
        cy.intercept('GET', 'https://fakest-newzz.herokuapp.com/api/articles', {
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
