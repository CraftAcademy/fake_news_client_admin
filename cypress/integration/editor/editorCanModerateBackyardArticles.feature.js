describe('Editor can moderate backyard articles', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://fakest-newzz.herokuapp.com/api/articles', {
      fixture: 'listOfArticles.json',
    });
    cy.intercept('GET', 'https://fakest-newzz.herokuapp.com/api/backyards', {
      fixture: 'listOfBackyardArticles.json',
    });
    cy.visit('/');
    cy.window()
      .its('store')
      .invoke('dispatch', {
        type: 'LOG_IN',
        payload: { fullName: 'Mr. Editor', role: 'editor' },
      });
    cy.get('a').contains('Backyard Articles').click();
  });

  describe('by successfully archiving the article', () => {
    beforeEach(() => {
      cy.intercept(
        'PUT',
        'https://fakest-newzz.herokuapp.com/api/bakyards/**',
        {
          message: 'The backyard article has been successfully archived',
        }
      );
    });

    it('is expected to display a success message', () => {
      cy.get('[data-cy=action-btn]').first().click();
      cy.get('button').contains('Archive').click();
      cy.get('button').contains('Confirm').click();
      cy.get('[data-cy=popup-message]').should(
        'contain',
        'The backyard article has been successfully archived'
      );
    });
  });

  describe('by successfully publishing the article', () => {
    beforeEach(() => {
      cy.intercept(
        'PUT',
        'https://fakest-newzz.herokuapp.com/api/bakyards/**',
        {
          message: 'The backyard article has been successfully published',
        }
      );
    });

    it('is expected to display a success message', () => {
      cy.get('[data-cy=action-btn]').eq(1).click();
      cy.get('button').contains('Publish').click();
      cy.get('button').contains('Confirm').click();
      cy.get('[data-cy=popup-message]').should(
        'contain',
        'The backyard article has been successfully published'
      );
    });
  });
});
