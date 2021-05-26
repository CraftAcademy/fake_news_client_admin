describe('editor can publish articles', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://fakest-newzz.herokuapp.com/api/articles', {
      fixture: 'listOfArticles.json',
    });
  });

  describe('Successfully as an editor', () => {
    beforeEach(() => {
      cy.intercept('PUT', 'https://fakest-newzz.herokuapp.com/api/articles/7', {
        message: 'The article has been successfully published',
      });
      cy.visit('/');
      cy.window()
        .its('store')
        .invoke('dispatch', {
          type: 'LOG_IN',
          payload: { fullName: 'Mr. Editor', role: 'editor' },
        });
    });

    it('is expected to show action button in dashboard', () => {
      cy.get('[data-cy=action-btn]').first().click();
      cy.get('#publish-btn').click();
      cy.get('#confirm-btn').click();
      cy.get('[data-cy=popup-message]').should(
        'contain',
        'The article has been successfully published'
      );
    });
  });

  describe('Unsuccessfully because article is already published', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.window()
        .its('store')
        .invoke('dispatch', {
          type: 'LOG_IN',
          payload: { fullName: 'Mr. Editor', role: 'editor' },
        });
    });

    it('is expected to not be able to click the button', () => {
      cy.get('[data-cy=action-btn]').eq(1).click();
      cy.get('#publish-btn').should('be.disabled');
      cy.get('#publish-btn').click({ force: true });
      cy.get('#confirm-btn').should('not.exist');
    });
  });

  describe('Unsuccessfully as a journalist', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.window()
        .its('store')
        .invoke('dispatch', {
          type: 'LOG_IN',
          payload: { fullName: 'Mr. Fake', role: 'journalist' },
        });
    });

    it('is expected to not be able to click the button', () => {
      cy.get('[data-cy=action-btn]').should('not.exist');
    });
  });
});
