describe('Backyard article dashboard can display articles', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://fakest-newzz.herokuapp.com/api/articles', {
      fixture: 'listOfArticles.json',
    });
    cy.visit('/');
  });
  describe('Successfully as an editor', () => {
    beforeEach(() => {
      cy.intercept('GET', 'https://fakest-newzz.herokuapp.com/api/backyards', {
        fixture: 'listOfBackyardArticles.json',
      });
      cy.intercept(
        'GET',
        'https://fakest-newzz.herokuapp.com/api/backyards/**',
        {
          fixture: 'singleBackyardArticle.json',
        }
      );
      cy.window()
        .its('store')
        .invoke('dispatch', {
          type: 'LOG_IN',
          payload: { fullName: 'Mr. Editor', role: 'editor' },
        });
      cy.get('a').contains('Backyard Articles').click();
    });

    it('is expected to display a list of 6 backyard articles', () => {
      cy.get('[data-cy=backyard-article-row]').should('have.length', 6);
    });

    it('is expected to display details of each article', () => {
      cy.get('[data-cy=backyard-article-row]')
        .first()
        .within(() => {
          cy.get('[data-cy=title]').should('contain', 'Something');
          cy.get('[data-cy=theme]').should('contain', 'My cat is spying on me');
          cy.get('[data-cy=written-by]').should('contain', 'Bob Kramer');
          cy.get('[data-cy=date]').should('contain', '2021-05-19, 15:10');
          cy.get('[data-cy=country]').should('contain', 'Denmark');
        });
    });

    it('is expected to be able to see content of each article', () => {
      cy.get('[data-cy=view-btn]').first().click();
      cy.get('[data-cy=backyard-preview]').within(() => {
        cy.get('[data-cy=title]').should('contain', 'Something awesome');
        cy.get('[data-cy=written_by]').should(
          'contain',
          'Written by: Bob Kramer'
        );
        cy.get('[data-cy=country]').should('contain', 'From: Denmark');
        cy.get('[data-cy=theme]').should(
          'contain',
          'Theme: My cat is spying on me'
        );
        cy.get('[data-cy=date]').should('contain', 'Date: 2021-05-13, 20:03');
        cy.get('[data-cy=content-body]').should(
          'include.text',
          'Science gets a lot of respect these days. Unfortunately, it’s also getting a lot of competition from misinformation.'
        );
      });
    });
  });

  describe('Unsuccessfully with no articles', () => {
    beforeEach(() => {
      cy.intercept('GET', 'https://fakest-newzz.herokuapp.com/api/backyards', {
        articles: [],
      });
      cy.window()
        .its('store')
        .invoke('dispatch', {
          type: 'LOG_IN',
          payload: { fullName: 'Mr. Editor', role: 'editor' },
        });
      cy.get('a').contains('Backyard Articles').click();
    });

    it('is expected to display a message', () => {
      cy.get('[data-cy=no-articles-message]').should(
        'contain',
        'There are no backyard articles yet'
      );
    });
  });

  describe('Unsuccessfully as a journalist', () => {
    beforeEach(() => {
      cy.intercept('GET', 'https://fakest-newzz.herokuapp.com/api/backyards', {
        statusCode: 401,
      });
      cy.intercept(
        'GET',
        'https://fakest-newzz.herokuapp.com/api/auth/validate_token',
        {
          fixture: 'handleLogin.json',
        }
      );
      cy.window()
        .its('store')
        .invoke('dispatch', {
          type: 'LOG_IN',
          payload: { fullName: 'Mr. Journalist', role: 'journalist' },
        });
    });

    it('is expected not to see any menu button', () => {
      cy.get('a').contains('Backyard Articles').should('not.exist');
    });

    it('is expected to be redirected', () => {
      cy.visit('/overview');
      cy.url().should('contain', '/dashboard');
    });
  });
});
